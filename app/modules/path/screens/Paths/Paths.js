import React from 'react';
import {ScrollView, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";
import {fetchPaths} from "../../actions";
import PathItem from "../../components/PathItem/PathItem";

class PathsScreen extends React.Component {
    state = {
        isReady: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Paths"
        }
    };

    componentWillMount() {
        this.props.dispatch(fetchPaths()).then(() => {
            this.setState({isReady: true});
        });
    }

    goToPath = (path) => {
        this.props.navigation.navigate("Path", {path});
    };

    render() {
        const {isReady} = this.state;
        const {paths, character, levelConfig, pathProgress} = this.props;

        if (!isReady) return null;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    {
                        paths.map((path, index) => {
                            return (
                                <PathItem
                                    key={path.uid}
                                    onPress={this.goToPath}
                                    path={path}
                                    pathProgress={pathProgress}/>
                            );
                        })
                    }
                </ScrollView>
                <CharacterPanel character={character} levelConfig={levelConfig}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        levelConfig: state.levelConfigReducer.levelConfig,
        paths: state.pathsReducer.paths,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid]
    };
}

export default connect(mapStateToProps)(PathsScreen);