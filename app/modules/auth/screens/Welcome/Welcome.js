import React from 'react';
import {View, Image, Alert, Text, TouchableWithoutFeedback} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {connect} from 'react-redux';
import FBSDK from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import Logo from "../../../../assets/images/logo-icon-red-small.png";
import {signInWithFacebook, signInWithGoogle} from "../../actions";
import styles from "./styles";
import BackgroundImage from "../../../../components/BackgroundImage";
import Button from "../../../../components/Button/Button";
import {color} from "../../../../styles/theme";
import {GOOGLE_SIGN_IN_CANCELLED_ERROR_CODE} from "../../constants";

class Welcome extends React.Component {
    state = {};

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
            title: "Pursoo"
        }
    };

    onSignInWithFacebook = async () => {
        try {
            const result = await FBSDK.LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (!result.isCancelled) {
                const token = await FBSDK.AccessToken.getCurrentAccessToken();
                await this.props.dispatch(signInWithFacebook(token));
                this.props.navigation.navigate('AuthLoading');
            }
        } catch (e) {
            this.onLoginError(e);
        }
    };

    onSignInWithGoogle = async () => {
        try {
            // Add any configuration settings here:
            await GoogleSignin.configure({
                iosClientId: '891410242074-cdl78f5q3s23t8v2ivjrh3t6mj7vu1lc.apps.googleusercontent.com'
            });

            const data = await GoogleSignin.signIn();
            await this.props.dispatch(signInWithGoogle(data));
            this.props.navigation.navigate('AuthLoading');
        } catch (e) {
            if (e.code === GOOGLE_SIGN_IN_CANCELLED_ERROR_CODE) return;
            this.onLoginError(e);
        }
    };

    onSignInWithEmail = () => {
        this.props.navigation.navigate("Login")
    };

    onLoginError = (error) => {
        Alert.alert('Login Error', error.message);
    };

    onSignUpPress = () => {
        this.props.navigation.navigate("Register");
    };

    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <Image style={styles.image} source={Logo}/>
                <SocialIcon
                    raised
                    button
                    type='facebook'
                    title='LOG IN WITH FACEBOOK'
                    iconSize={30}
                    style={[styles.containerView, styles.socialButton]}
                    fontStyle={styles.buttonText}
                    onPress={this.onSignInWithFacebook}/>
                <SocialIcon
                    raised
                    button
                    type='google-plus-official'
                    title='LOG IN WITH GOOGLE'
                    iconSize={30}
                    style={[styles.containerView, styles.socialButton, {marginTop: 10}]}
                    fontStyle={styles.buttonText}
                    onPress={this.onSignInWithGoogle}/>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine}/>
                    <Text style={styles.separatorText}>OR</Text>
                    <View style={styles.separatorLine}/>
                </View>
                <Button
                    icon={{
                        name: "email",
                        size: 30,
                        color: color.brandDark
                    }}
                    buttonStyle={{
                        backgroundColor: color.light_grey
                    }}
                    textStyle={{
                        color: color.brandDark
                    }}
                    onPress={this.onSignInWithEmail}
                    iconSize={30}
                    title={"LOG IN WITH EMAIL"}
                />
                <TouchableWithoutFeedback onPress={this.onSignUpPress}>
                    <View>
                        <Text style={styles.forgotPasswordText}>Don't have an account? Sign Up.</Text>
                    </View>
                </TouchableWithoutFeedback>
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