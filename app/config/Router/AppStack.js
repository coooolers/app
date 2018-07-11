import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import {color, tabIconStyle} from "../../styles/theme";
import FontAwesome, {Icons} from "react-native-fontawesome";

import PathStepAudioScreen from "../../modules/path/screens/PathStepAudio";
import OnboardingRouter from "../../modules/onboarding/router";
import PathStepWorkoutScreen from "../../modules/path/screens/PathStepWorkout";
import ExerciseInfo from "../../modules/exercises/screens/ExerciseInfo";
import ProfileNavigationScreen from "../../modules/profile/screens/ProfileNavigation";
import MainInitScreen from "./MainInitScreen";
import ProfileAccountScreen from "../../modules/profile/screens/Account";
import PathScreen from "../../modules/path/screens/Path";
import PathsScreen from "../../modules/path/screens/Paths";
import PathStepAudioRewardScreen from "../../modules/path/screens/PathStepAudioReward";
import HomeScreen from "../../modules/home/screens/Home";
import PathStepWorkoutRoutineScreen from "../../modules/path/screens/PathStepWorkoutRoutine";
import ProfileNotificationsScreen from "../../modules/profile/screens/Notifications";
import PathStepWorkoutRewardScreen from "../../modules/path/screens/PathStepWorkoutReward";

export default createStackNavigator({
        Initial: {screen: MainInitScreen},
        Onboarding: OnboardingRouter,
        Main: createBottomTabNavigator({
            Home: createStackNavigator({
                Home: {screen: HomeScreen}
            }, {
                initialRouteName: 'Home',
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Home',
                })
            }),
            Paths: createStackNavigator({
                Paths: {screen: PathsScreen},
                PathStepAudio: {screen: PathStepAudioScreen},
                PathStepWorkout: {screen: PathStepWorkoutScreen},
                PathStepWorkoutRoutine: {screen: PathStepWorkoutRoutineScreen},
                PathStepAudioReward: {screen: PathStepAudioRewardScreen},
                PathStepWorkoutReward: {screen: PathStepWorkoutRewardScreen},
                ExerciseInfo: {screen: ExerciseInfo},
                Path: {screen: PathScreen},
            }, {
                initialRouteName: 'Paths',
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Paths',
                })
            }),
            Profile: createStackNavigator({
                ProfileNavigation: {screen: ProfileNavigationScreen},
                ProfileAccount: {screen: ProfileAccountScreen},
                ProfileNotifications: {screen: ProfileNotificationsScreen}
            }, {
                initialRouteName: 'ProfileNavigation',
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: 'Profile',
                })
            }),
        }, {
            navigationOptions: ({navigation}) => ({
                // TODO: convert to component
                tabBarIcon: ({focused, tintColor}) => {
                    const {routeName} = navigation.state;
                    let icon;

                    if (routeName === 'Home') {
                        icon = Icons.home;
                    } else if (routeName === 'Paths') {
                        icon = Icons.graduationCap;
                    } else if (routeName === 'Profile') {
                        icon = Icons.userCircleO;
                    }

                    return <FontAwesome style={[tabIconStyle, {color: tintColor}]}>{icon}</FontAwesome>;
                }
            }),
            tabBarOptions: {
                style: {
                    backgroundColor: color.white,
                },
                activeTintColor: color.brandPrimary,
                inactiveTintColor:
                color.grey
            },
            animationEnabled: true,
            swipeEnabled: false,
            initialRouteName: 'Home',
        })
    },
    {
        initialRouteName: 'Initial',
        headerMode: 'none'
    }
);