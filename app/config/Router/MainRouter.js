import React from "react";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {color, tabIconStyle} from "../../styles/theme";
import {fetchMyCharacter} from "../../modules/characters/actions";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";

// Paths
import PathsScreen from "../../modules/path/screens/Paths";
import PathStepWorkoutRoutineScreen from "../../modules/path/screens/PathStepWorkoutRoutine";
import PathStepAudioRewardScreen from "../../modules/path/screens/PathStepAudioReward";
import PathStepWorkoutScreen from "../../modules/path/screens/PathStepWorkout";
import ExerciseInfo from "../../modules/exercises/screens/ExerciseInfo";
import PathStepAudioScreen from "../../modules/path/screens/PathStepAudio";
import PathScreen from "../../modules/path/screens/Path";
import PathStepWorkoutRewardScreen from "../../modules/path/screens/PathStepWorkoutReward";

//Character Scenes
import HomeScreen from '../../modules/home/screens/Home';
import CharacterEditScreen from "../../modules/characters/screens/CharacterEdit";

// Profile Screens
import ProfileNavigationScreen from "../../modules/profile/screens/ProfileNavigation";
import ProfileAccountScreen from "../../modules/profile/screens/Account";
import ProfileNotificationsScreen from "../../modules/profile/screens/Notifications";

import {fetchUserPathProgress} from "../../modules/userPathProgress/actions";
import OnboardingRouter from "../../modules/onboarding/router";
import MainInitScreen from "./MainInitScreen";

const getTabBarIcon = (icon) => {
    return ({tintColor}) => {
        return (
            <FontAwesome style={[tabIconStyle, {color: tintColor}]}>{icon}</FontAwesome>
        );
    };
};

const onTabBarPress = (navigation) => {
    return ({previousScene, scene, jumpToIndex}) => {
        if (scene.focused) {
            navigation.popToTop();
        } else {
            // more than one route deep. rest the stack
            if (scene.route.routes.length > 1) {
                for (let i = 0; i < scene.route.routes.length - 1; i += 1) {
                    const backAction = NavigationActions.back();

                    navigation.dispatch(backAction)
                }
            } else {
                jumpToIndex(scene.index);
            }
        }
    }
};

const MainRouterStack = StackNavigator({
    Initial: {screen: MainInitScreen},

    Onboarding: OnboardingRouter,

    CharacterEdit: StackNavigator({
        CharacterEdit: {screen: CharacterEditScreen}
    }, {
        initialRouteName: 'CharacterEdit'
    }),

    Main: TabNavigator({
        Home: StackNavigator({
            Home: {screen: HomeScreen}
        }, {
            initialRouteName: 'Home',
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Home',
                tabBarIcon: getTabBarIcon(Icons.home),
                tabBarOnPress: onTabBarPress(navigation)
            })
        }),
        Paths: StackNavigator({
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
                tabBarIcon: getTabBarIcon(Icons.graduationCap),
                tabBarOnPress: onTabBarPress(navigation)
            })
        }),
        Profile: StackNavigator({
            ProfileNavigation: {screen: ProfileNavigationScreen},
            ProfileAccount: {screen: ProfileAccountScreen},
            ProfileNotifications: {screen: ProfileNotificationsScreen}
        }, {
            initialRouteName: 'ProfileNavigation',
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Profile',
                tabBarIcon: getTabBarIcon(Icons.userCircleO),
                tabBarOnPress: onTabBarPress(navigation)
            })
        }),
    }, {
        tabBarOptions: {
            style: {
                backgroundColor: color.white,
            },
            activeTintColor: color.brandPrimary,
            inactiveTintColor: color.grey
        },
        animationEnabled: true,
        swipeEnabled: false,
        initialRouteName: 'Home',
    })
}, {
    initialRouteName: 'Initial',
    headerMode: 'none'
});

class MainRouter extends React.Component {
    state = {
        isReady: false
    };

    componentWillMount() {
        if (this.props.user.hasCompletedOnboarding) {
            Promise.all([
                this.props.dispatch(fetchMyCharacter(this.props.user)),
                this.props.dispatch(fetchUserPathProgress(this.props.user))
            ]).then(() => {
                this.setState({isReady: true});
            });
        } else {
            this.setState({isReady: true});
        }
    }

    render() {
        if (!this.state.isReady) return null;

        return <MainRouterStack/>;
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(MainRouter);