import React from "react";
import {StackNavigator} from 'react-navigation';
import CreateCharacterScreen from "../../modules/onboarding/screens/OnboardingCreateCharacter";
import HowItWorksScreen from "../../modules/onboarding/screens/OnboardingHowItWorks";


export default StackNavigator({
    OnboardingCreateCharacter: {screen: CreateCharacterScreen},
    OnboardingHowItWorks: {screen: HowItWorksScreen}
}, {
    initialRouteName: 'OnboardingCreateCharacter'
});