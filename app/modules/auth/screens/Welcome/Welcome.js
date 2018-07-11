import React from 'react';
import {View, Image, Alert} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {connect} from 'react-redux';
import FBSDK from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import Logo from "../../../../assets/images/logo-icon-red-small.png";
import {signInWithFacebook, signInWithGoogle} from "../../actions";
import styles from "./styles";
import BackgroundImage from "../../../../components/BackgroundImage";

class Welcome extends React.Component {
    state = {};

    static navigationOptions = ({navigation}) => {
        return {
            header: null
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
            this.onLoginError(e);
        }
    };

    onLoginError = (error) => {
        Alert.alert('Login Error', error.message);
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
                    title='CONTINUE WITH FACEBOOK'
                    iconSize={30}
                    style={[styles.containerView, styles.socialButton]}
                    fontStyle={styles.buttonText}
                    onPress={this.onSignInWithFacebook}/>
                <SocialIcon
                    raised
                    button
                    type='google-plus-official'
                    title='CONTINUE WITH GOOGLE'
                    iconSize={30}
                    style={[styles.containerView, styles.socialButton, {marginTop: 10}]}
                    fontStyle={styles.buttonText}
                    onPress={this.onSignInWithGoogle}/>
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