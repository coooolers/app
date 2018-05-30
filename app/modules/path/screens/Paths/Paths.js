import React from 'react';
import {ScrollView, View, TouchableOpacity, Image, ImageBackground, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";

class PathsScreen extends React.Component {
    state = {
        paths: [
            {
                name: "Beginner Bodyweight",
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/images%2Fwokouts%2Fwoman-bicycle-kick.jpg?alt=media&token=a1383899-2873-4bf6-b726-039f970daa7d"
            }
        ]
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Paths"
        }
    };

    goToPath = (path) => {
        this.props.navigation.push("Path", {path});
    };

    render() {
        const {paths} = this.state;
        const {character, levelConfig} = this.props;

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
        levelConfig: state.levelConfigReducer.levelConfig
    };
}

export default connect(mapStateToProps)(PathsScreen);