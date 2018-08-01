import React from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from "./styles";
import {color} from "../../../../styles/theme";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PathStepItem extends React.Component {
    static propTypes = {
        step: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        isLocked: PropTypes.bool.isRequired
    };

    state = {
        animateX: new Animated.Value(0)
    };

    renderStatusIcon = () => {
        const {isCompleted, isLocked} = this.props;

        if (isCompleted) {
            return <MaterialCommunityIcon name={"checkbox-marked"}
                                          style={[styles.icon, {color: color.brandSuccess}]}/>;
        } else if (isLocked) {
            return <MaterialCommunityIcon name="lock-outline"
                                          style={[styles.icon, {color: color.brandDark}]}/>;
        } else {
            return <MaterialCommunityIcon name="play-circle"
                                          style={[styles.icon, {color: color.brandPrimary}]}/>;
        }
    };

    handlePress = () => {
        const {step, isLocked} = this.props;

        if (isLocked) {
            this.animateLockedIcon(2, 200);
        } else {
            this.props.onSelect(step);
        }
    };

    animateLockedIcon = (toValue, duration) => {
        Animated.timing(this.state.animateX, {toValue, duration}).start();
        setTimeout(() => {
            Animated.timing(this.state.animateX, {toValue: -toValue, duration}).start();
        }, duration);
        setTimeout(() => {
            Animated.timing(this.state.animateX, {toValue: 0, duration}).start();
        }, duration * 2);
    };

    render = () => {
        const {step, isLocked, index} = this.props;
        let textStyles = [styles.name];

        if (isLocked) {
            textStyles.push({color: "#9B9B9B"});
        }

        return (
            <View key={step.uid} style={styles.container}>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Text style={textStyles}>{index + 1}. {step.name}</Text>
                        <Animated.View style={{
                            transform: [{
                                translateX: this.state.animateX
                            }]
                        }}>
                            {this.renderStatusIcon()}
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}