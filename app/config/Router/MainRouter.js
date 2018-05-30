import React from "react";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {color, tabIconStyle} from "../../styles/theme";
import {StyleSheet} from "react-native";
import {fetchMyCharacter} from "../../modules/characters/actions";
import {connect} from "react-redux";

// Onboarding
import OnboardingWelcome from "../../modules/onboarding/screens/OnboardingWelcome";
import OnboardingProfile from "../../modules/onboarding/screens/OnboardingProfile";
import OnboardingCreateCharacter from "../../modules/onboarding/screens/OnboardingCreateCharacter";
import OnboardingHowItWorks from "../../modules/onboarding/screens/OnboardingHowItWorks";

//Character Scenes
import HomeScreen from '../../modules/home/screens/Home';
import CharacterEditScreen from "../../modules/characters/screens/CharacterEdit";

// Profile
import ProfileScreen from "../../modules/profile/screens/Profile";

// Paths
import PathsScreen from "../../modules/path/screens/Paths";
import PathScreen from "../../modules/path/screens/Path";
import PathStepAudioScreen from "../../modules/path/screens/PathStepAudio";

import MainInitScreen from "./MainInitScreen";

function getTabIconStyle(tintColor) {
    return StyleSheet.flatten([tabIconStyle, {color: tintColor}]);
}

const MainRouterStack = StackNavigator({
    Initial: {
        screen: MainInitScreen
    },
    Onboarding: StackNavigator({
        OnboardingWelcome: {screen: OnboardingWelcome},
        OnboardingProfile: {screen: OnboardingProfile},
        OnboardingCreateCharacter: {screen: OnboardingCreateCharacter},
        OnboardingHowItWorks: {screen: OnboardingHowItWorks}
    }, {
        initialRouteName: 'OnboardingWelcome',
    }),
    Main: TabNavigator({
        Home: StackNavigator({
            Home: {screen: HomeScreen,},
            CharacterEdit: {screen: CharacterEditScreen}
        }, {
            initialRouteName: 'Home',
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.home}</FontAwesome>
            })
        }),
        Paths: StackNavigator({
            Paths: {screen: PathsScreen},
            Path: {screen: PathScreen},
            PathStepAudio: {screen: PathStepAudioScreen}
        }, {
            initialRouteName: 'Paths',
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.graduationCap}</FontAwesome>
            })
        }),
        Profile: StackNavigator({
            Profile: {screen: ProfileScreen}
        }, {
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.userCircleO}</FontAwesome>
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
        navigationOptions: ({navigation}) => ({
            tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
                // don't leave views hanging around in memory
                navigation.popToTop();
                jumpToIndex(scene.index);
            }
        }),
        animationEnabled: true,
        swipeEnabled: false,
        initialRouteName: 'Paths',
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
        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({isReady: true});
        });
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