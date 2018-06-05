import React from 'react';
import {Text, ScrollView, View, ImageBackground, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Moment from 'moment';

import styles from "./styles";
import MountainsBackground from '../../../../assets/images/mountains.png';
import {Character} from "../../../characters/models";
import XpLabel from "../../../../components/XpLabel";
import LevelConfig from "../../../levelConfig/utils/LevelConfig";

Moment.locale("en");

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
        if (!this.state.isReady) {
            return null;
        }

        const {character} = this.props;
        const xpProgress = Character.percentOfLevelComplete(character);

        return (
            <ImageBackground source={MountainsBackground} style={styles.imageBackground}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Image source={{uri: character.imageUrl}} style={styles.characterImage}/>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {character.name}
                    </Text>
                    <Text style={styles.level}>Level {character.level}</Text>
                    <View style={styles.xpContainer}>
                        <Progress.Bar
                            progress={xpProgress}
                            width={null}
                            height={20}
                            borderRadius={0}
                            borderColor={"#000000"}
                            borderWidth={2}
                            unfilledColor={"#ffffff"}
                            color={"#674ea7"}
                        />
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