import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../../path/components/CharacterPanel/CharacterPanel";
import {fetchPaths} from "../../../path/actions";
import {
    getPathInProgress,
    goToMainTabRoute,
    goToPathStep,
    isPathComplete,
    isPathIncomplete
} from "../../../../components/Util";
import PathScrollView from "../../../path/components/PathScrollView";
import RecentPathPanel from "../../components/RecentPathPanel/RecentPathPanel";
import ScreenInfoDrawer from "../../../../components/ScreenInfoDrawer";
import {color} from "../../../../styles/theme";

class HomeScreen extends React.Component {
    state = {
        isReady: false,
    };

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    componentWillMount() {
        this.props.dispatch(fetchPaths()).then(() => {
            this.setState({isReady: true});
        });
    }

    onPathStepPress = (path, step) => {
        goToPathStep(this.props.navigation, {step, path});
    };

    goToPaths = () => {
        goToMainTabRoute(this.props.navigation, "Paths");
    };

    getLatestPath = () => {
        const {paths, pathProgress} = this.props;
        const pathList = paths.allIds.map(id => paths.byId[id]);
        const inCompletePaths = pathList.filter(p => isPathIncomplete(p, pathProgress));
        const allPathsComplete = pathList.every(p => isPathComplete(p, pathProgress));
        const isWelcomeIncomplete = inCompletePaths.find(p => p.uid === "welcome");


        if (allPathsComplete) {
            return null;
        } else if (isWelcomeIncomplete) {
            return paths.byId["welcome"];
        } else {
            const pathsWithoutWelcome = pathList.filter(p => p.uid !== "welcome");
            return getPathInProgress(pathsWithoutWelcome, pathProgress);
        }
    };

    onRecentPathBeginPress = (path, step) => {
        goToPathStep(this.props.navigation, {step, path});
    };

    renderRecentPathPanel = () => {
        const {pathProgress} = this.props;
        const latestPath = this.getLatestPath();

        if (latestPath) {
            return (
                <RecentPathPanel path={latestPath} pathProgress={pathProgress}
                                 onBeginPress={this.onRecentPathBeginPress}/>
            );
        } else {
            // TODO: add something here for users who really rocked the shit!
            return (
                <View style={{
                    width: '100%',
                    height: 200,
                    marginBottom: 20,
                    backgroundColor: color.brandPrimary
                }}/>
            )
        }
    };

    render() {
        if (!this.state.isReady) return null;

        const {character, paths, pathProgress, screenConfig} = this.props;

        return (
            <View style={styles.container}>
                <ScreenInfoDrawer uid={"home"}
                                  title={screenConfig.infoDrawerTitle}
                                  text={screenConfig.infoDrawerText}/>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {this.renderRecentPathPanel()}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>MY PATHS</Text>
                        <PathScrollView paths={paths.allIds.map(id => paths.byId[id])}
                                        pathProgress={pathProgress}
                                        onPathPress={this.onPathStepPress}
                                        onNewPathPress={this.goToPaths}/>
                    </View>
                </ScrollView>
                <CharacterPanel character={character}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        paths: state.pathsReducer,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {},
        screenConfig: state.screensReducer.screens.Home
    }
}

export default connect(mapStateToProps)(HomeScreen);