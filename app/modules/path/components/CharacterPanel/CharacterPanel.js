import React from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import * as Progress from 'react-native-progress';
import MountainImage from "../../../../assets/images/mountains.png";
import styles from "./styles";
import {Character} from "../../../characters/models";

export default class CharacterPanel extends React.Component {
    render() {
        const {character, levelConfig} = this.props;
        const xpProgress = Character.percentOfLevelComplete(character, levelConfig);

        return (
            <View style={styles.container}>
                <ImageBackground source={MountainImage} style={styles.background}>
                    <Image style={styles.image} source={{uri: character.imageUrl}}/>
                    <View style={styles.xpContainer}>
                        <Text>{character.name} ({character.level})</Text>
                        <Progress.Bar
                            progress={xpProgress}
                            width={null}
                            height={12}
                            borderRadius={0}
                            borderColor={"#000000"}
                            borderWidth={1}
                            unfilledColor={"#ffffff"}
                            color={"#674ea7"}
                        />
                        <View style={styles.xpTextContainer}>
                            <Text style={{fontSize: 10}}>{character.xp} / {levelConfig[character.level].xpNeeded}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}