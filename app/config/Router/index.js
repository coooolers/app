import {createSwitchNavigator} from 'react-navigation';

import AuthLoadingScreen from "../../components/AuthLoadingScreen";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);