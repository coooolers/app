import React from "react";
import {connect} from "react-redux";
import {goToMainTabRoute} from "../../components/Util";
import URL from 'url-parse';

class InitialScreen extends React.Component {
    constructor(props) {
        super(props);
        const {user} = this.props;

        if (props.deepLinkUrl) {
            this._handleDynamicLink(props.deepLinkUrl);
        } else if (user.hasCompletedOnboarding) {
            // TODO: user can swipe screen away and become stuck
            goToMainTabRoute(props.navigation, "Home");
        } else {
            props.navigation.navigate('Onboarding');
        }
    }

    _handleDynamicLink = (url) => {
        if (url) {
            const parsedUrl = new URL(url);
            switch (parsedUrl.pathname) {
                case '/profile/notifications':
                    goToMainTabRoute(this.props.navigation, "Profile");
                    this.props.navigation.push('ProfileNotifications');
                    break;
            }
        }
    };

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