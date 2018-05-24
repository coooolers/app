import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

import Logo from '../../../../assets/images/white-logo-icon-transparent.png';

import styles from "./styles";
import Button from "../../../../components/Button";
import {signOut} from "../../../auth/actions";

class OnboardingWelcome extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    goToNext = () => {
        this.props.navigation.push('OnboardingProfile');
    };

    render() {
        const {screenConfig} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image source={Logo} style={styles.image}/>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>{screenConfig.title}</Text>
                        <Text>{screenConfig.description}</Text>
                    </View>
                    <Button
                        title={screenConfig.buttonText}
                        icon={screenConfig.buttonIcon}
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
        user: state.authReducer.user,
        screenConfig: state.screensReducer.screens.OnboardingWelcome
    }
}

export default connect(mapStateToProps)(OnboardingWelcome);