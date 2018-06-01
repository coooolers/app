import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';
import styles from "./styles";
import {STEP_TYPES} from "../../constants";
import RewardIcon from "../RewardIcon/RewardIcon";
import {color} from "../../../../styles/theme";

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
            return <FontAwesome style={styles.icon}>{Icons.headphones}</FontAwesome>;
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