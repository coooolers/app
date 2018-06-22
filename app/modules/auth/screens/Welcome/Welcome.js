import React from 'react';
import {View, Image} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import FBSDK from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import Logo from "../../../../assets/images/logo-icon-red-small.png";
import {signInWithFacebook, signInWithGoogle} from "../../actions";
import styles from "./styles";
import BackgroundImage from "../../../../components/BackgroundImage";

class Welcome extends React.Component {
    state = {};

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    componentWillMount() {
        if (this.props.isLoggedIn) {
            const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({routeName: 'Main'})],
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    onSignInWithFacebook = () => {
        FBSDK.LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(result => {
                if (!result.isCancelled) {
                    FBSDK.AccessToken.getCurrentAccessToken().then(token => {
                        this.props.dispatch(signInWithFacebook(token)).catch(this.onLoginError);
                    }).catch(this.onLoginError);
                }
            }, this.onLoginError);
    };

    onSignInWithGoogle = async () => {
        try {
            // Add any configuration settings here:
            await GoogleSignin.configure({
                iosClientId: '891410242074-cdl78f5q3s23t8v2ivjrh3t6mj7vu1lc.apps.googleusercontent.com'
            });

            const data = await GoogleSignin.signIn();

            this.props.dispatch(signInWithGoogle(data));
        } catch (e) {
            this.onLoginError(e);
        }
    };

    onLoginError = (error) => {
        alert('Login fail with error: ' + error);
    };

    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <Image style={styles.image} source={Logo}/>
                <SocialIcon
                    raised
                    button
                    type='facebook'
                    title='CONTINUE WITH FACEBOOK'
                    iconSize={30}
                    style={[styles.containerView, styles.socialButton]}
                    fontStyle={styles.buttonText}
                    onPress={this.onSignInWithFacebook}/>
                <SocialIcon
                    raised
                    button
                    type='google-plus-official'
                    title='CONTINUE WITH GOOGLE'
                    iconSize={30}
                    style={[styles.containerView, styles.socialButton, {marginTop: 10}]}
                    fontStyle={styles.buttonText}
                    onPress={this.onSignInWithGoogle}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Welcome);