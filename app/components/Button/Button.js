import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button as RNEButton} from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from "./styles";
import _ from 'lodash';


export default class Button extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        isFetching: PropTypes.bool,
        icon: PropTypes.any,
        containerViewStyle: PropTypes.object,
        buttonStyle: PropTypes.object,
    };

    getIcon = () => {
        const {icon} = this.props;

        if (_.isObject(icon)) {
            return Object.assign({type: 'font-awesome'}, icon);
        } else if (_.isString(icon)) {
            return {
                type: 'font-awesome',
                name: icon
            };
        } else {
            return null;
        }
    };

    render() {
        const containerViewStyle = StyleSheet.flatten([styles.containerView, this.props.containerViewStyle || {}]);
        const buttonStyle = StyleSheet.flatten([styles.button, this.props.buttonStyle || {}]);

        return (
            <RNEButton
                raised
                title={this.props.title}
                icon={this.getIcon()}
                containerViewStyle={containerViewStyle}
                buttonStyle={buttonStyle}
                textStyle={styles.buttonText}
                disabled={this.props.isFetching}
                onPress={this.props.onPress}
            />
        )
    }
}