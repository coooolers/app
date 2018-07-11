import {
    createStackNavigator,
} from 'react-navigation';

// Auth Stack
import RegisterScreen from "../../modules/auth/screens/Register";
import ForgotPasswordScreen from "../../modules/auth/screens/ForgotPassword";
import LoginScreen from "../../modules/auth/screens/Login";
import WelcomeScreen from "../../modules/auth/screens/Welcome";

export default createStackNavigator({
    Welcome: {screen: WelcomeScreen},
    Register: {screen: RegisterScreen},
    Login: {screen: LoginScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
}, {
    initialRouteName: 'Welcome',
});