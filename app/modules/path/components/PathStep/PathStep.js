import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';
import styles from "./styles";
import {REWARD_TYPES, STEP_TYPES} from "../../constants";
import RewardIcon from "../RewardIcon/RewardIcon";

export default class PathStep extends React.Component {
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
            return <FontAwesome style={styles.stepIcon}>{Icons.headphones}</FontAwesome>;
        }
    };

    renderStatusIcon = () => {
        const {isCompleted, isLocked} = this.props;

        if (isCompleted) {
            return <FontAwesome style={styles.stepStatusIcon}>{Icons.check}</FontAwesome>
        } else if (isLocked) {
            return <FontAwesome style={styles.stepStatusIcon}>{Icons.lock}</FontAwesome>
        }
    };

    render = () => {
        const {step, showTopStatusBorder, showBottomStatusBorder, isCompleted} = this.props;
        const statusTopStyles = showTopStatusBorder === true ? styles.stepStatusTop : null;
        const statusBottomStyles = showBottomStatusBorder === true ? styles.stepStatusBottom : null;

        return (
            <View key={step.uuid} style={styles.stepWrapper}>
                <View style={styles.stepStatus}>
                    <View style={statusTopStyles}/>
                    <View style={styles.stepStatusMiddle}>
                        <View style={styles.stepStatusIndicator}>
                            {this.renderStatusIcon()}
                        </View>
                        <View style={styles.stepStatusLineRight}/>
                    </View>
                    <View style={statusBottomStyles}/>
                </View>
                <TouchableOpacity style={styles.stepContentWrapper}
                                  onPress={() => this.props.onSelect(step)}>
                    <View style={styles.stepContentHeader}>
                        {this.renderStepTypeIcon(step)}
                        <Text style={styles.stepName}>{step.name}</Text>
                    </View>
                    <View style={styles.stepContentBody}>
                        <Text style={styles.stepDescription}>{step.description}</Text>
                    </View>
                    <View style={styles.stepContentFooter}>
                        {
                            step.rewards.map((r, i) => {
                                return <RewardIcon
                                    key={i}
                                    type={r.key}
                                    value={r.value}
                                    hasEarned={isCompleted}
                                    containerStyles={{
                                        marginRight: 10
                                    }}
                                />
                            })
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}