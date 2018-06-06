import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import MountainsBackground from '../../../../assets/images/mountains.png';
import LevelConfig from "../../../levelConfig/utils/LevelConfig";
import XpBar from "../../../../components/XpBar/XpBar";

class Home extends React.Component {
    state = {
        isReady: false,
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('CharacterEdit')}
                    title="Edit"
                />
            )
        }
    };

    componentWillMount() {
        this.setState({isReady: true});
    }

    render() {
        const {character} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <ImageBackground source={MountainsBackground} style={styles.imageBackground}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Image source={{uri: character.imageUrl}} style={styles.characterImage}/>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {character.name}
                    </Text>
                    <Text style={styles.level}>Level {character.level}</Text>
                    <View style={styles.xpContainer}>
                        <XpBar character={character} height={20} borderWidth={2}/>
                        <View style={styles.xpTextContainer}>
                            <Text>Experience</Text>
                            <Text>{character.xp} / {LevelConfig.getForLevel(character.level).xpNeeded}</Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character
    }
}

export default connect(mapStateToProps)(Home);