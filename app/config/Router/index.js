import React from 'react';
import {connect} from 'react-redux';

//Splash Component
import Splash from '../../components/Splash/Splash';
import AuthRouter from './AuthRouter';
import MainRouter from './MainRouter';

//Import Store, actions
import store from '../../redux/store';
import {checkLoginStatus} from "../../modules/auth/actions";
import {fetchScreens} from "../../modules/screens/actions";
import {fetchLevelConfig} from "../../modules/levelConfig/actions";

class Router extends React.Component {
    state = {
        isReady: false,
        isLoggedIn: false
    };

    componentDidMount() {
        Promise.all([
            store.dispatch(checkLoginStatus()),
            store.dispatch(fetchScreens()),
            store.dispatch(fetchLevelConfig())
        ]).then(() => {
            this.setState({isReady: true});
        });
    }

    render() {
        if (this.state.isReady) {
            if (this.props.isLoggedIn) {
                return <MainRouter/>;
            } else {
                return <AuthRouter/>;
            }
        } else {
            return <Splash/>;
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