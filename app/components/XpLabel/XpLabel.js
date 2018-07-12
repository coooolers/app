import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles'
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {padding, fontSize} from "../../styles/theme";

export default class XpLabel extends React.Component {
    static propTypes: {
        xp: PropTypes.number.isRequired,
        iconSize: PropTypes.number
    };

    render() {
        const trophyStyles = {
            marginRight: padding,
            fontSize: this.props.iconSize || fontSize.regular
        };

        return (
            <View style={styles.meta}>
                <MaterialCommunityIcon name="trophy-variant" style={trophyStyles}/>
                <Text>{this.props.xp}xp</Text>
            </View>
        );
    }
}