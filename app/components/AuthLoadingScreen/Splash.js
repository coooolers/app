import React, {Component} from 'react';
import {View, Animated, ActivityIndicator} from 'react-native';
import LogoIcon from "../../assets/images/logo-icon-red-small.png";
import styles from './styles';
import BackgroundImage from "../BackgroundImage";
import {connect} from 'react-redux';
import store from '../../redux/store';
import {checkLoginStatus} from "../../modules/auth/actions";
import {fetchScreens} from "../../modules/screens/actions";
import {fetchLevelConfig} from "../../modules/levelConfig/actions";
import {fetchExercises} from "../../modules/exercises/actions";
import {fetchMyCharacter} from "../../modules/characters/actions";
import {fetchUserPathProgress} from "../../modules/userPathProgress/actions";
import firebase from 'react-native-firebase';
import URL from "url-parse";
import {goToMainTabRoute} from "../Util";

class AuthLoadingScreen extends Component {
    state = {
        animateY: new Animated.Value(0)
    };

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    componentWillMount() {
        this.unsubscribeOnLink = firebase.links().onLink(this._handleDynamicLink);
    }

    componentWillUnmount() {
        this.unsubscribeOnLink && this.unsubscribeOnLink();
    }

    _handleDynamicLink = (url) => {
        console.log(url);
        if (url && this.props.user) {
            const parsedUrl = new URL(url);
            switch (parsedUrl.pathname) {
                case '/profile/notifications':
                    goToMainTabRoute(this.props.navigation, 'Profile');
                    this.props.navigation.navigate('ProfileNotifications');
                    break;
            }
        }
    };

    // TODO: clean this up a bit
    _bootstrapAsync = async () => {
        return Promise.all([
            store.dispatch(checkLoginStatus()),
            store.dispatch(fetchScreens()),
            store.dispatch(fetchLevelConfig()),
            store.dispatch(fetchExercises()),
            firebase.links().getInitialLink(),
        ]).then(response => {
            const user = response[0];
            const dynamicLink = response[4];
            let userDataPromises = [];


            if (user && user.hasCompletedOnboarding) {
                userDataPromises.push(this.props.dispatch(fetchMyCharacter(this.props.user)));
                userDataPromises.push(this.props.dispatch(fetchUserPathProgress(this.props.user)));
            }

            Promise.all(userDataPromises).then(() => {
                if (user && dynamicLink) {
                    console.log("GOING TO", dynamicLink);
                    return this._handleDynamicLink(dynamicLink);
                } else if (user) {
                    console.log("GOING TO APP???");
                    return this.goToApp();
                } else {
                    console.log("GOING TO AUTH???");
                    return this.goToAuth();
                }
            });
        });
    };

    goToApp = async () => {
        if (this.props.user.hasCompletedOnboarding) {
            await this.props.dispatch(fetchMyCharacter(this.props.user));
            await this.props.dispatch(fetchUserPathProgress(this.props.user));
        }

        this.props.navigation.navigate('App');
    };

    goToAuth = async () => {
        this.props.navigation.navigate('Auth');
    };

    componentDidMount() {
        this.animateIcon(10);
    }

    animateIcon = (toValue) => {
        const duration = 500;
        Animated.timing(this.state.animateY, {toValue, duration}).start();

        setTimeout(() => {
            this.animateIcon(-toValue);
        }, duration)

    };

    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <Animated.Image style={[styles.image, {
                    transform: [{
                        translateY: this.state.animateY
                    }]
                }]} source={LogoIcon}/>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(AuthLoadingScreen);