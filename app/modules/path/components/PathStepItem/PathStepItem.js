import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import styles from "./styles";
import {STEP_TYPES} from "../../constants";
import {color} from "../../../../styles/theme";
import {getRewardsForStep} from "../../../../components/Util";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RewardList from "../../../../components/RewardList/RewardList";

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
            return <MaterialCommunityIcon name="headphones" style={styles.icon}/>;
        } else if (step.type === STEP_TYPES.WORKOUT) {
            return <MaterialCommunityIcon name="dumbbell" style={styles.icon}/>;
        } else if (step.type === STEP_TYPES.WALK) {
            return <MaterialCommunityIcon name="walk" style={styles.icon}/>;
        }
    };

    renderStatusIcon = () => {
        const {isCompleted, isLocked} = this.props;

        if (isCompleted) {
            return <MaterialCommunityIcon name={"check"} style={[styles.statusIcon, {color: color.brandSuccess}]}/>;
        } else if (isLocked) {
            return <MaterialCommunityIcon name="lock" style={[styles.statusIcon, {color: color.brandDark}]}/>;
        } else {
            return <MaterialCommunityIcon name="hand-pointing-right" style={[styles.statusIcon, {color: color.brandPrimary}]}/>;
        }
    };

    renderStatus = () => {
        const {showTopStatusBorder, showBottomStatusBorder, isCompleted, isLocked} = this.props;
        const statusTopStyles = showTopStatusBorder ? styles.statusTop : null;
        const statusBottomStyles = showBottomStatusBorder ? styles.statusBottom : null;
        const statusIndicatorStyles = [styles.statusIndicator];

        if (isCompleted) {
            statusIndicatorStyles.push({borderColor: color.brandSuccess});
        } else if (isLocked) {
            statusIndicatorStyles.push({borderColor: color.brandDark});
        } else {
            statusIndicatorStyles.push({borderColor: color.brandPrimary});
        }

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

    renderContentLockOverlay = () => {
        const {isLocked} = this.props;

        if (isLocked) {
            return (
                <View style={styles.lockedOverlay}>
                    <MaterialCommunityIcon name="lock" style={styles.lockedIcon}/>
                    <Text style={styles.lockedLabel}>Locked</Text>
                </View>
            );
        }
    };

    render = () => {
        const {step, isCompleted, isLocked} = this.props;
        let contentWrapperStyles = [styles.contentContainer];

        if (isCompleted) {
            contentWrapperStyles.push({borderTopColor: color.brandSuccess});
        } else if (isLocked) {
            contentWrapperStyles.push({borderTopColor: color.brandDark});
        } else {
            contentWrapperStyles.push({borderTopColor: color.brandPrimary});
        }

        return (
            <View key={step.uid} style={styles.container}>
                {this.renderStatus()}
                <TouchableWithoutFeedback onPress={() => this.props.onSelect(step)}>
                    <View style={contentWrapperStyles}>
                        {this.renderContentLockOverlay()}
                        <View style={styles.contentHeader}>
                            {this.renderStepTypeIcon(step)}
                            <Text style={styles.name}>{step.name}</Text>
                        </View>
                        <View style={styles.contentBody}>
                            <Text style={styles.description}>{step.description}</Text>
                        </View>
                        <View style={styles.contentFooter}>
                            <RewardList rewardConfig={getRewardsForStep(step)} hasEarned={isCompleted} size={16}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
}