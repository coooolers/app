import React from "react";
import {StackNavigator} from 'react-navigation';
import WelcomeScreen from "../../modules/onboarding/screens/OnboardingWelcome";
import CreateCharacterScreen from "../../modules/onboarding/screens/OnboardingCreateCharacter";
import HowItWorksScreen from "../../modules/onboarding/screens/OnboardingHowItWorks";


export default StackNavigator({
    OnboardingWelcome: {screen: WelcomeScreen},
    OnboardingCreateCharacter: {screen: CreateCharacterScreen},
    OnboardingHowItWorks: {screen: HowItWorksScreen}
}, {
    initialRouteName: 'OnboardingWelcome'
});