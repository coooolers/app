import React, {Component} from 'react';
import {TouchableWithoutFeedback, View, Text, Image} from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

export default class PathItem extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        path: PropTypes.object.isRequired,
        pathProgress: PropTypes.object.isRequired
    };

    render() {
        const {path, onPress} = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => onPress(path)}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: path.imageUrl}}/>
                    <Text style={styles.title}>{path.name}</Text>
                    <Text style={styles.steps}>{path.stepsOrder.length} Lessons</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

