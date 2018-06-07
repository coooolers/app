import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import RewardList from "../../../../components/RewardList/RewardList";
import {getRewardsForStep} from "../../../../components/Util";
import PropTypes from "prop-types";

export default class PathStepPanel extends React.Component {
    static propTypes = {
        step: PropTypes.object.isRequired,
        path: PropTypes.object.isRequired,
        hasCompleted: PropTypes.bool.isRequired,
        icon: PropTypes.any.isRequired
    };

    render() {
        const {step, path, hasCompleted, icon} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <FontAwesome style={styles.icon}>{icon}</FontAwesome>
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>{step.name}</Text>
                    <Text style={styles.subTitle}>
                        <FontAwesome>{Icons.graduationCap}</FontAwesome> {path.name}
                    </Text>
                </View>
                <View style={styles.body}>
                    {this.props.children}
                </View>
                <View style={styles.footer}>
                    <Text style={{fontWeight: 'bold'}}>REWARDS:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <RewardList rewardConfig={getRewardsForStep(step)} hasEarned={hasCompleted}/>
                    </View>
                </View>
            </View>
        );
    }
}