import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import FontAwesome, {Icons} from "react-native-fontawesome";
import styles from "./styles";
import {round} from "../../../../components/Util";

export default class QuantityExercise extends React.Component {
    static propTypes = {
        workoutExercise: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.textInputRef = null;

        this.state = {
            workoutExercise: props.workoutExercise
        };
    }

    focusInput = () => {
        this.textInputRef && this.textInputRef.focus();
    };

    onDonePress = () => {
        const {workoutExercise} = this.state;
        const quantityCompleted = workoutExercise.quantityCompleted || workoutExercise.quantity;
        this.props.onDone(workoutExercise, quantityCompleted);
    };

    onChangeText = (text) => {
        let quantityCompleted = parseInt(text, 10);

        if (quantityCompleted > this.state.workoutExercise.quantity) {
            quantityCompleted = this.state.workoutExercise.quantity;
        }

        const workoutExercise = Object.assign({}, this.state.workoutExercise, {quantityCompleted});
        this.setState({workoutExercise});
    };

    renderCompletedText = () => {
        const {workoutExercise} = this.state;
        const {quantityCompleted, quantity} = workoutExercise;

        if (workoutExercise.quantityCompleted) {
            const percentComplete = round(quantityCompleted/quantity) * 100;

            return (
                <Text style={styles.completedText}>
                    Completed: {quantityCompleted}/{quantity} {`${percentComplete}%`}
                </Text>
            );
        }
    };

    render() {
        const {workoutExercise} = this.state;

        return (
            <View style={styles.container}>
                <Image source={{uri: workoutExercise.imageUrl}} style={styles.image}/>
                <Text style={styles.name}>{workoutExercise.name}</Text>
                <TouchableOpacity style={styles.inputSection} onPress={this.focusInput}>
                    <TextInput ref={(el) => this.textInputRef = el}
                               style={styles.quantity}
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType="numeric"
                               returnKeyType="done"
                               onChangeText={this.onChangeText}
                               value={workoutExercise.quantityLabel}
                               selectTextOnFocus={true}/>
                    <FontAwesome style={styles.icon}>{Icons.pencil}</FontAwesome>
                </TouchableOpacity>
                {this.renderCompletedText()}

                <Button
                    raised
                    title={"Done"}
                    borderRadius={4}
                    style={styles.button}
                    containerViewStyle={styles.containerView}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={this.onDonePress}/>
            </View>
        );
    }
}