import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';
import styles from "./styles";
import {REWARD_TYPES, STEP_TYPES} from "../../constants";
import RewardIcon from "../RewardIcon/RewardIcon";
import {color} from "../../../../styles/theme";
import {getRewardsForStep} from "../../../../components/Util";

export default class PathStepItem extends React.Component {
    static propTypes = {
        showTopStatusBorder: PropTypes.bool.isRequired,
        showBottomStatusBorder: PropTypes.bool.isRequired,
        step: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        isLocked: PropTypes.bool.isRequired
    };

    renderStepTypeIcon = (step) => {
        if (step.type === STEP_TYPES.AUDIO) {
            return <FontAwesome style={styles.icon}>{Icons.headphones}</FontAwesome>;
        } else if (step.type === STEP_TYPES.WORKOUT) {
            return <FontAwesome style={styles.icon}>{Icons.clockO}</FontAwesome>;
        }
    };

    renderStatusIcon = () => {
        const {isCompleted, isLocked} = this.props;

        if (isCompleted) {
            return <FontAwesome style={
                StyleSheet.flatten([styles.statusIcon, {color: color.white}])
            }>{Icons.check}</FontAwesome>
        } else if (isLocked) {
            return <FontAwesome style={styles.statusIcon}>{Icons.lock}</FontAwesome>;
        } else {
            return null;
        }
    };

    renderStatus = () => {
        const {step, showTopStatusBorder, showBottomStatusBorder, isCompleted} = this.props;
        const statusTopStyles = showTopStatusBorder ? styles.statusTop : null;
        const statusBottomStyles = showBottomStatusBorder ? styles.statusBottom : null;
        const statusIndicatorStyles = isCompleted ?
            StyleSheet.flatten([styles.statusIndicator, {backgroundColor: color.brandSuccess}]) :
            styles.statusIndicator;

        return (
            <View style={styles.status}>
                <View style={statusTopStyles}/>
                <View style={styles.statusMiddle}>
                    <View style={statusIndicatorStyles}>{this.renderStatusIcon()}</View>
                    <View style={styles.statusLineRight}/>
                </View>
                <View style={statusBottomStyles}/>
            </View>
        );
    };

    renderRewards = () => {
        const rewardsByKey = getRewardsForStep(this.props.step);
        const defaultProps = {
            hasEarned: this.props.isCompleted,
            containerStyles: {
                marginRight: 10
            }
        };
        let content = [];

        if (rewardsByKey[REWARD_TYPES.WORKOUT]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.WORKOUT}
                    type={REWARD_TYPES.WORKOUT}
                    value={rewardsByKey[REWARD_TYPES.WORKOUT]}
                    {...defaultProps}
                />
            );
        }

        if (rewardsByKey[REWARD_TYPES.EXERCISE]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.EXERCISE}
                    type={REWARD_TYPES.EXERCISE}
                    value={rewardsByKey[REWARD_TYPES.EXERCISE]}
                    {...defaultProps}
                />
            );
        }

        if (rewardsByKey[REWARD_TYPES.TERM]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.TERM}
                    type={REWARD_TYPES.TERM}
                    value={rewardsByKey[REWARD_TYPES.TERM]}
                    {...defaultProps}
                />
            );
        }

        if (rewardsByKey[REWARD_TYPES.XP]) {
            content.push(
                <RewardIcon
                    key={REWARD_TYPES.XP}
                    type={REWARD_TYPES.XP}
                    value={rewardsByKey[REWARD_TYPES.XP]}
                    {...defaultProps}
                />
            );
        }

        return content.map(c => c);
    };

    render = () => {
        const {step, isCompleted, isLocked} = this.props;
        let contentWrapperStyles = null;

        if (isCompleted) {
            contentWrapperStyles = StyleSheet.flatten([styles.contentContainer, {borderTopColor: color.brandSuccess}]);
        } else if (isLocked) {
            contentWrapperStyles = StyleSheet.flatten([styles.contentContainer, {borderTopColor: color.brandDark}]);
        } else {
            contentWrapperStyles = StyleSheet.flatten([styles.contentContainer, {borderTopColor: color.brandPrimary}]);
        }


        return (
            <View key={step.uuid} style={styles.container}>
                {this.renderStatus()}
                <TouchableOpacity style={contentWrapperStyles}
                                  onPress={() => this.props.onSelect(step)}>
                    <View style={styles.contentHeader}>
                        {this.renderStepTypeIcon(step)}
                        <Text style={styles.name}>{step.name}</Text>
                    </View>
                    <View style={styles.contentBody}>
                        <Text style={styles.description}>{step.description}</Text>
                    </View>
                    <View style={styles.contentFooter}>
                        {this.renderRewards()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}