import React from "react";
import {connect} from "react-redux";
import {goToMainTabRoute} from "../../components/Util";

class InitialScreen extends React.Component {
    constructor(props) {
        super(props);
        const {user} = props;

        if (user.hasCompletedOnboarding) {
            // TODO: user can swipe screen away and become stuck
            props.navigation.navigate('Main');
        } else {
            props.navigation.navigate('Onboarding');
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(InitialScreen);