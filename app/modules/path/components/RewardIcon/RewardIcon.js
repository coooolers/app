import React, {Component} from 'react';
import FontAwesome, {Icons} from "react-native-fontawesome";
import {StyleSheet, View, Text} from "react-native";
import styles from "./styles";
import {REWARD_TYPES} from "../../constants";
import PropTypes from "prop-types";

export default class RewardIcon extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        size: PropTypes.number,
        hasEarned: PropTypes.bool.isRequired,
        containerStyles: PropTypes.object
    };

    renderIcon = () => {
        const {type, hasEarned, size} = this.props;
        let iconStyles = null;
        let icon = null;

        if (type === REWARD_TYPES.XP) {
            iconStyles = styles.xpIcon;
            icon = Icons.trophy;
        } else if (type === REWARD_TYPES.TERM) {
            iconStyles = styles.termIcon;
            icon = Icons.book;
        } else if (type === REWARD_TYPES.EXERCISE) {
            iconStyles = styles.exerciseIcon;
            icon = Icons.bicycle;
        } else if (type === REWARD_TYPES.WORKOUT) {
            iconStyles = styles.workoutIcon;
            icon = Icons.clockO;
        }

        if (hasEarned) {
            iconStyles = StyleSheet.flatten([iconStyles, {color: '#999999'}]);
        }

        if (size) {
            iconStyles = StyleSheet.flatten([iconStyles, {fontSize: size}]);
        }

        return <FontAwesome style={iconStyles}>{icon}</FontAwesome>;
    };

    renderText = () => {
        const {value, hasEarned} = this.props;

        if (hasEarned) {
            return <Text style={{color: '#999999'}}>{value}</Text>;
        } else {
            return <Text>{value}</Text>;
        }

    };

    renderEarnedIcon = () => {
        const {hasEarned} = this.props;

        if (hasEarned) {
            return <FontAwesome style={styles.earnedIcon}>{Icons.checkCircleO}</FontAwesome>;
        }
    };

    render() {
        const containerStyles = this.props.containerStyles ?
            StyleSheet.flatten([styles.container, this.props.containerStyles]) : styles.container;

        return (
            <View style={containerStyles}>
                {this.renderIcon()}
                {this.renderText()}
                {this.renderEarnedIcon()}
            </View>
        );
    }
}