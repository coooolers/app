import React, {Component} from 'react';
import FontAwesome, {Icons} from "react-native-fontawesome";
import {TouchableOpacity, View, Text} from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import {getRewardsForPath} from "../../../../components/Util";
import RewardList from "../../../../components/RewardList";

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
        } else if (path.difficulty === 2) {
            return "Intermediate";
        } else if (path.difficulty === 3) {
            return "Advanced";
        }
    };

    renderPathProgress = () => {
        const {path, pathProgress} = this.props;
        const numSteps = path["stepsOrder"].length;
        const numStepsCompleted = pathProgress[path.uid] ? Object.keys(pathProgress[path.uid]).length : 0;

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
                        <RewardList rewardConfig={getRewardsForPath(path)} hasEarned={false} size={16}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

