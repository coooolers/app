import React from 'react';
import {ScrollView, View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";
import {fetchPaths} from "../../actions";

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
        this.props.navigation.push("Path", {path});
    };

    render() {
        const {isReady} = this.state;
        const {paths, character, levelConfig} = this.props;

        if (!isReady) return null;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    {
                        paths.map((path, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => this.goToPath(path)}>
                                        <Text>{path.name}</Text>
                                    </TouchableOpacity>
                                </View>
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