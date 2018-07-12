import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
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
                    <MaterialCommunityIcon name={icon} style={styles.icon}/>
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>{step.name}</Text>
                    <Text style={styles.subTitle}>
                        <MaterialCommunityIcon name="school" size={16}/> {path.name}
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