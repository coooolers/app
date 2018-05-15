import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

import Logo from '../../../../assets/images/white-logo-icon-transparent.png';

import styles from "./styles";
import Button from "../../../../components/Button";

class OnboardingWelcome extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    state = {};

    goToNext = () => {
        this.props.navigation.push('OnboardingProfile');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image source={Logo} style={styles.image}/>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>Welcome to Pursoo</Text>
                        <Text>
                            Congratulations on taking the first step towards a better, healthier life. Tap the button
                            below to create your profile and tell us a bit about yourself.
                        </Text>
                    </View>
                    <Button
                        title={"Create Profile"}
                        icon={'user-circle-o'}
                        containerViewStyle={{
                            marginTop: 20,
                            marginLeft: 0,
                            marginRight: 0,
                        }}
                        onPress={this.goToNext}
                    />
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

export default connect(mapStateToProps)(OnboardingWelcome);