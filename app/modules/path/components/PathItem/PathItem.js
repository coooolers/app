import React, {Component} from 'react';
import FontAwesome, {Icons} from "react-native-fontawesome";
import {TouchableOpacity, View, Text} from "react-native";
import styles from "./styles";
import {REWARD_TYPES} from "../../constants";
import PropTypes from "prop-types";
import RewardIcon from "../RewardIcon/RewardIcon";
import _ from 'lodash';
import {getRewardsForPath} from "../../../../components/Util";

export default class PathItem extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        path: PropTypes.object.isRequired,
        pathProgress: PropTypes.object.isRequired
    };

    renderDifficulty = () => {
        const {path} = this.props;

        if (path.difficulty === 1) {
            return "Beginner";
        } else if (path.difficulty === 1) {
            return "Intermediate";
        } else if (path.difficulty === 1) {
            return "Advanced";
        }
    };

    renderRewards = () => {
        const rewardsByKey = getRewardsForPath(this.props.path);
        const defaultProps = {hasEarned: false, size: 16, containerStyles: {marginLeft: 10}};
        let content = [];


        if (rewardsByKey[REWARD_TYPES.XP]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.XP}
                    type={REWARD_TYPES.XP}
                    value={_(rewardsByKey[REWARD_TYPES.XP]).sumBy("value")}
                    {...defaultProps}
                />
            );
        }

        if (rewardsByKey[REWARD_TYPES.TERM]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.TERM}
                    type={REWARD_TYPES.TERM}
                    value={_(rewardsByKey[REWARD_TYPES.TERM]).sumBy("value")}
                    {...defaultProps}
                />
            );
        }

        if (rewardsByKey[REWARD_TYPES.EXERCISE]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.EXERCISE}
                    type={REWARD_TYPES.EXERCISE}
                    value={_(rewardsByKey[REWARD_TYPES.EXERCISE]).sumBy("value")}
                    {...defaultProps}
                />
            );
        }

        if (rewardsByKey[REWARD_TYPES.WORKOUT]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.WORKOUT}
                    type={REWARD_TYPES.WORKOUT}
                    value={_(rewardsByKey[REWARD_TYPES.WORKOUT]).sumBy("value")}
                    {...defaultProps}
                />
            );
        }

        return content.map(c => c);
    };

    renderPathProgress = () => {
        const {path, pathProgress} = this.props;
        const numSteps = path["stepsOrder"].length;
        const numStepsCompleted = Object.keys(pathProgress[path.uid]).length;

        return (
            <View style={{flexDirection: 'row'}}>
                <FontAwesome style={{marginRight: 5, fontSize: 16}}>
                    {Icons.graduationCap}
                </FontAwesome> <Text>{numStepsCompleted} / {numSteps}</Text>
            </View>
        );
    };

    render() {
        const {path, onPress} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onPress(path)}>
                    <Text style={styles.name}>{path.name}</Text>
                    <Text style={styles.difficulty}>{this.renderDifficulty()}</Text>
                    <Text style={styles.description}>{path.description}</Text>
                    <View style={styles.hrule}/>
                    <View style={styles.progressTop}>
                        <Text style={styles.progressLabel}>Progress</Text>
                        {this.renderPathProgress()}
                    </View>
                    <View style={styles.progressBottom}>
                        {this.renderRewards()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

