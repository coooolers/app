import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import PropTypes from 'prop-types';

export default class ExerciseList extends React.Component {
    static propTypes = {
        workout: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired
    };

    onItemPress = (item) => {
        this.props.onPress(item);
    };

    renderExerciseItem = (exercise, index) => {
        const label = exercise.isQuantity ? exercise.quantityLabel : exercise.durationLabel;
        return (
            <View key={index} style={styles.itemWrapper}>
                <Image source={{uri: exercise.imageUrl}} style={styles.itemImage}/>
                <View style={styles.itemContent}>
                    <Text style={styles.itemName}>{exercise.name}</Text>
                    <Text style={styles.itemLabel}>{label}</Text>
                </View>
                <TouchableOpacity onPress={() => this.onItemPress(exercise)}>
                    <FontAwesome style={styles.itemIcon}>{Icons.infoCircle}</FontAwesome>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const {workout} = this.props;

        return (
            <View>
                {workout.routine.map(this.renderExerciseItem)}
            </View>
        );
    }
}