import React, {Component} from 'react';
import FontAwesome, {Icons} from "react-native-fontawesome";
import {TouchableWithoutFeedback, View, Text} from "react-native";
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
            <TouchableWithoutFeedback onPress={() => onPress(path)}>
                <View style={styles.container}>
                    <Text style={styles.name}>{path.name}</Text>
                    <Text style={styles.description}>{path.description}</Text>
                    <View style={styles.hrule}/>
                    <View style={styles.progressTop}>
                        <Text style={styles.progressLabel}>Progress</Text>
                        {this.renderPathProgress()}
                    </View>
                    <View style={styles.progressBottom}>
                        <RewardList rewardConfig={getRewardsForPath(path)} hasEarned={false} size={16}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

