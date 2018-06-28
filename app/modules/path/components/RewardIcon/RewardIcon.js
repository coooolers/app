import React, {Component} from 'react';
import FontAwesome, {Icons} from "react-native-fontawesome";
import {View, Text} from "react-native";
import styles from "./styles";
import {REWARD_TYPES} from "../../constants";
import PropTypes from "prop-types";
import {normalize} from "../../../../styles/theme";

export default class RewardIcon extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired, // support 36 or '32 / 36'
        size: PropTypes.number,
        hasEarned: PropTypes.bool.isRequired,
        containerStyles: PropTypes.object
    };

    renderIcon = () => {
        const {type, hasEarned, size} = this.props;
        let iconStyles = [];
        let icon = null;

        if (type === REWARD_TYPES.XP) {
            iconStyles.push(styles.xpIcon);
            icon = Icons.trophy;
        } else if (type === REWARD_TYPES.TERM) {
            iconStyles.push(styles.termIcon);
            icon = Icons.book;
        } else if (type === REWARD_TYPES.EXERCISE) {
            iconStyles.push(styles.exerciseIcon);
            icon = Icons.bicycle;
        } else if (type === REWARD_TYPES.WORKOUT) {
            iconStyles.push(styles.workoutIcon);
            icon = Icons.clockO;
        }

        if (hasEarned) {
            iconStyles.push({color: '#999999'});
        }

        if (size) {
            iconStyles.push({fontSize: normalize(size)});
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
        const {hasEarned, size} = this.props;
        const iconStyles = [styles.earnedIcon];

        if (hasEarned) {
            if (size) {
                iconStyles.push({fontSize: normalize(size - 2)});
            }

            return <FontAwesome style={iconStyles}>{Icons.checkCircleO}</FontAwesome>;
        }
    };

    render() {
        const containerStyles = this.props.containerStyles ?
            [styles.container, this.props.containerStyles] : styles.container;

        return (
            <View style={containerStyles}>
                {this.renderIcon()}
                {this.renderText()}
                {this.renderEarnedIcon()}
            </View>
        );
    }
}