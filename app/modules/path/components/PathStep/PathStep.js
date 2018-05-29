import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';

import styles from "./styles";

export default class PathStep extends React.Component {
    static propTypes = {
        showTopStatusBorder: PropTypes.bool.isRequired,
        showBottomStatusBorder: PropTypes.bool.isRequired,
        step: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired
    };

    renderStepTypeIcon = (step) => {
        if (step.type === "audio") {
            return <FontAwesome style={styles.stepIcon}>{Icons.headphones}</FontAwesome>;
        }
    };

    renderReward = (reward, index) => {
        if (reward.key === "xp") {
            return (
                <View key={index} style={styles.stepReward}>
                    <FontAwesome>{Icons.trophy}</FontAwesome>
                    <Text>{reward.value}</Text>
                </View>
            );
        } else if (reward.key === "term") {
            return (
                <View key={index} style={styles.stepReward}>
                    <FontAwesome>{Icons.book}</FontAwesome>
                    <Text>{reward.value}</Text>
                </View>
            );
        }
    };

    render = () => {
        const {step, showTopStatusBorder, showBottomStatusBorder} = this.props;
        const statusTopStyles = showTopStatusBorder === true ? styles.stepStatusTop : null;
        const statusBottomStyles = showBottomStatusBorder === true ? styles.stepStatusBottom : null;

        return (
            <View key={step.uuid} style={styles.stepWrapper}>
                <View style={styles.stepStatus}>
                    <View style={statusTopStyles}/>
                    <View style={styles.stepStatusMiddle}>
                        <View style={styles.stepStatusIndicator}>
                            <FontAwesome style={styles.stepStatusIcon}>{Icons.lock}</FontAwesome>
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
                        {step.rewards.map(this.renderReward)}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}