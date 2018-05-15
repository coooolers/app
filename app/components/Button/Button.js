import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button as ReactNativeButton} from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from "./styles";


export default class Button extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        icon: PropTypes.string,
        containerViewStyle: PropTypes.object,
    };

    render() {
        const containerViewStyle = StyleSheet.flatten([styles.containerView, this.props.containerViewStyle || {}]);
        const icon = {name: this.props.icon, type: 'font-awesome'};

        return (
            <ReactNativeButton
                raised
                borderRadius={4}
                title={this.props.title}
                icon={icon}
                containerViewStyle={containerViewStyle}
                buttonStyle={[styles.button]}
                textStyle={styles.buttonText}
                disabled={this.props.isFetching}
                onPress={this.props.onPress}
            />
        )
    }
}