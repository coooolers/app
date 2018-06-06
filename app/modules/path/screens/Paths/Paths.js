import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";
import {fetchPaths} from "../../actions";
import PathItem from "../../components/PathItem/PathItem";
import BackgroundImage from "../../../../components/BackgroundImage/BackgroundImage";

class PathsScreen extends React.Component {
    state = {
        isReady: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: null,
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
        const {paths, character, pathProgress} = this.props;

        if (!isReady) return null;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"green"}/>
                <ScrollView style={styles.content}>
                    {
                        paths.order.map((pathUid) => {
                            const path = paths.byId[pathUid];
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
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid]
    };
}

export default connect(mapStateToProps)(PathsScreen);