import React from 'react';
import {Text} from 'react-native-elements';
import {View, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';
import FontAwesome, {Icons} from "react-native-fontawesome";

import styles from "./styles";
import {updateCharacter} from "../../../characters/actions";
import {Character} from "../../../characters/models";
import Reporting from "../../../reporting";
import LevelConfig from "../../../levelConfig/utils/LevelConfig";

class WorkoutReward extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: null,
            headerRight: null
        }
    };

    constructor(props) {
        super(props);

        const {workout} = props.navigation.state.params;

        this.state = {
            workout,
            isReady: false,
            character: {}
        };
    }

    componentWillMount() {
        const {user, character} = this.props;
        const {workout} = this.props.navigation.state.params;

        Reporting.track("workout__end", {
            name: workout.name,
            grade: workout.grade,
            gradePercent: workout.gradePercent,
        });

        const characterWithNewXp = Character.addXp(character, workout.xpEarned);

        this.props.dispatch(updateCharacter(characterWithNewXp));

        setTimeout(() => {
            this.setState({character: characterWithNewXp});
        }, 1500);
    }

    render() {
        const {workout, character} = this.state;

        if (!this.state.isReady) {
            return null;
        }

        const xpProgress = Character.percentOfLevelComplete(character);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>Workout Complete!</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{workout.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{marginRight: 30}}>
                            <FontAwesome style={styles.rewardIcon}>{Icons.star}</FontAwesome>
                            <Text style={styles.rewardText}>{workout.grade}</Text>
                        </View>
                        <View style={{marginLeft: 30}}>
                            <FontAwesome style={styles.rewardIcon}>{Icons.trophy}</FontAwesome>
                            <Text style={styles.rewardText}>{workout.xpEarnedLabel}</Text>
                        </View>
                    </View>

                    <Image source={{uri: character.imageUrl}} style={styles.image}/>
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
                            <Text style={styles.level}>{character.level}</Text>
                            <Text>{character.xp} / {LevelConfig.getForLevel(character.level).xpNeeded}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character
    }
}

export default connect(mapStateToProps)(WorkoutReward);