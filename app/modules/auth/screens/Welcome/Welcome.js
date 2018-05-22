import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

import Logo from "../../../../assets/images/white_logo_transparent.png";
import {actions as auth} from "../../index";

const {signInWithFacebook} = auth;

import styles from "./styles";
import FBLoginButton from "../../../../components/FBLoginButton/FBLoginButton";

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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={Logo}/>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <FBLoginButton />

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>Or</Text>
                        </View>

                        <Button
                            raised
                            borderRadius={4}
                            title={'SIGN UP WITH E-MAIL'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={() => this.props.navigation.navigate('Register')}/>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>Already have an account?</Text>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.signInText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, {signInWithFacebook})(Welcome);