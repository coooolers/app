import React from 'react';
import {Text, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../../path/components/CharacterPanel/CharacterPanel";
import {fetchPaths} from "../../../path/actions";
import {getPathInProgress, goToMainTabRoute, goToPathStep, isPathIncomplete} from "../../../../components/Util";
import PathScrollView from "../../../path/components/PathScrollView";
import RecentPathPanel from "../../components/RecentPathPanel/RecentPathPanel";

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
        goToPathStep(this.props.navigation, {
            step,
            path,
            onEarnedRewards: () => {
            }
        });
    };

    goToPaths = () => {
        goToMainTabRoute(this.props.navigation, "Paths");
    };

    getLatestPath = () => {
        const {paths, pathProgress} = this.props;
        const pathList = paths.allIds.map(id => paths.byId[id]);
        const pathKeysInProgress = Object.keys(pathProgress);
        const inCompletePaths = pathList.filter(p => isPathIncomplete(p, pathProgress));
        const isWelcomeIncomplete = inCompletePaths.find(p => p.uid === "welcome");
        const onlyStartedWelcomePath = pathKeysInProgress.length === 1 && pathKeysInProgress[0] === "welcome";

        if (isWelcomeIncomplete) {
            return paths.byId["welcome"];
        } else if (onlyStartedWelcomePath) {
            return inCompletePaths.length ? inCompletePaths[0] : null;
        } else if (!onlyStartedWelcomePath) {
            const pathsWithoutWelcome = pathList.filter(p => p.uid !== "welcome");
            return getPathInProgress(pathsWithoutWelcome, pathProgress);
        } else {
            return null;
        }
    };

    onRecentPathBeginPress = (path, step) => {
        goToPathStep(this.props.navigation, {
            step,
            path,
            onEarnedRewards: () => {
            }
        });
    };

    render() {
        if (!this.state.isReady) return null;
        const {character, paths, pathProgress} = this.props;
        const latestPath = this.getLatestPath();

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <RecentPathPanel path={latestPath} pathProgress={pathProgress}
                                     onBeginPress={this.onRecentPathBeginPress}/>
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
    }
}

export default connect(mapStateToProps)(HomeScreen);