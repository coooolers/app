import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

import styles from "./styles";

class OnboardingHowItWorks extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Step 3 of 3"
        }
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