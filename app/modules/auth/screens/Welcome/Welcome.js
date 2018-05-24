import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Button, Divider, SocialIcon} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import FBSDK from 'react-native-fbsdk';
import Logo from "../../../../assets/images/white_logo_transparent.png";
import {signInWithFacebook, signOut} from "../../actions";

import styles from "./styles";

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

    onSignInWithFacebook = () => {
        FBSDK.LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(result => {
                if (!result.isCancelled) {
                    FBSDK.AccessToken.getCurrentAccessToken().then(token => {
                        this.props.dispatch(signInWithFacebook(token)).catch(this.onLoginError);
                    }).catch(this.onLoginError);
                }
            }, this.onLoginError);
    };

    onLoginError = (error) => {
        alert('Login fail with error: ' + error);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={Logo}/>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <SocialIcon
                            raised
                            button
                            type='facebook'
                            title='SIGN UP WITH FACEBOOK'
                            iconSize={19}
                            style={[styles.containerView, styles.socialButton]}
                            fontStyle={styles.buttonText}
                            onPress={this.onSignInWithFacebook}/>

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

export default connect(mapStateToProps)(Welcome);