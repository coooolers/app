import React from "react";
import {connect} from "react-redux";

class InitialScreen extends React.Component {
    constructor(props) {
        super(props);
        const {user} = props;

        if (user.hasCompletedOnboarding) {
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