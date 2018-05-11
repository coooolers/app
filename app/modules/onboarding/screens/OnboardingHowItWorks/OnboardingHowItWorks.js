import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

import styles from "./styles";

const error = {
    general: "",
    name: ""
};

class OnboardingHowItWorks extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Create Your Character"
        }
    };

    state = {
        error,
        isFetching: false,
        character: {}
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>How It Works</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(OnboardingHowItWorks);