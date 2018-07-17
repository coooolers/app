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
        textStyle: PropTypes.object,
    };

    getIcon = () => {
        const {icon} = this.props;

        if (_.isObject(icon)) {
            return Object.assign({type: 'material-community-icons'}, icon);
        } else if (_.isString(icon)) {
            return {
                type: 'material-community-icons',
                name: icon
            };
        } else {
            return null;
        }
    };

    render() {
        const containerViewStyle = [styles.containerView, this.props.containerViewStyle || {}];
        const buttonStyle = [styles.button, this.props.buttonStyle || {}];
        const textStyle = [styles.buttonText, this.props.textStyle || {}];

        return (
            <RNEButton
                raised
                title={this.props.title}
                icon={this.getIcon()}
                containerViewStyle={containerViewStyle}
                buttonStyle={buttonStyle}
                textStyle={textStyle}
                disabled={this.props.isFetching}
                onPress={this.props.onPress}
            />
        )
    }
}