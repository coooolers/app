import React from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {checkLoginStatus} from "../../modules/auth/actions";
import {fetchScreens} from "../../modules/screens/actions";
import {fetchLevelConfig} from "../../modules/levelConfig/actions";
import {fetchExercises} from "../../modules/exercises/actions";
import SplashScreen from '../../components/Splash';
import UnauthenticatedRouter from './UnauthenticatedRouter';
import MainRouter from './MainRouter';
import Notifications from "../../modules/notifications";
import {updateUser} from "../../modules/profile/actions";

class Router extends React.Component {
    state = {
        isReady: false,
        isLoggedIn: false
    };

    componentDidMount() {
        Promise.all([
            store.dispatch(checkLoginStatus()),
            store.dispatch(fetchScreens()),
            store.dispatch(fetchLevelConfig()),
            store.dispatch(fetchExercises())
        ]).then(() => {
            const {user} = this.props;

            Notifications.hasPermission().then((isEnabled) => {
                if (isEnabled) {
                    Notifications.send();
                    Notifications.getToken().then((token) => {
                        user.pushToken = token;
                        console.log(token);
                        store.dispatch(updateUser(user));
                    });
                } else {
                    Notifications.requestPermission().then(() => {
                        console.log('Success!!!');
                    });
                }
            });

            this.setState({isReady: true});
        });
    }

    render() {
        if (this.state.isReady) {
            if (this.props.isLoggedIn) {
                return <MainRouter/>;
            } else {
                return <UnauthenticatedRouter/>;
            }
        } else {
            return <SplashScreen/>;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(Router);