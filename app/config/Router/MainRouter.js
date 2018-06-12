import React from "react";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {color, tabIconStyle} from "../../styles/theme";
import {StyleSheet} from "react-native";
import {fetchMyCharacter} from "../../modules/characters/actions";
import {connect} from "react-redux";

// Paths
import PathsScreen from "../../modules/path/screens/Paths";
import PathRouter from "./PathsRouter";

//Character Scenes
import HomeScreen from '../../modules/home/screens/Home';
import CharacterEditScreen from "../../modules/characters/screens/CharacterEdit";

// Profile
import ProfileScreen from "../../modules/profile/screens/Profile";

import {fetchUserPathProgress} from "../../modules/userPathProgress/actions";
import OnboardingRouter from "./OnboardingRouter";
import MainInitScreen from "./MainInitScreen";

function getTabIconStyle(tintColor) {
    return StyleSheet.flatten([tabIconStyle, {color: tintColor}]);
}


const MainRouterStack = StackNavigator({
    Initial: {screen: MainInitScreen},
    Path: PathRouter,
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
                tabBarIcon: ({tintColor}) => <FontAwesome
                    style={getTabIconStyle(tintColor)}>{Icons.home}</FontAwesome>
            })
        }),
        Paths: StackNavigator({
            Paths: {screen: PathsScreen}
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