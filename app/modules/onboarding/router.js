import React from "react";
import {StackNavigator} from 'react-navigation';
import CreateCharacterScreen from "../../modules/onboarding/screens/OnboardingCreateCharacter";
import HowItWorksScreen from "../../modules/onboarding/screens/OnboardingHowItWorks";
import NotificationsScreen from "../../modules/onboarding/screens/OnboardingNotifications";


export default StackNavigator({
    OnboardingCreateCharacter: {screen: CreateCharacterScreen},
    OnboardingHowItWorks: {screen: HowItWorksScreen},
    OnboardingNotifications: {screen: NotificationsScreen}
}, {
    initialRouteName: 'OnboardingCreateCharacter'
});