import React from 'react';
import {Button, Text} from 'react-native-elements';
import {View, Image} from 'react-native';
import PropTypes from "prop-types";
import * as Progress from 'react-native-progress';

import styles from "./styles";
import {color} from "../../../../styles/theme";
import {round, secondsToMMSS} from "../../../../components/Util";

export default class DurationExercise extends React.Component {
    static propTypes = {
        workoutExercise: PropTypes.object.isRequired,
        onDone: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.progressInterval = null;

        this.state = {
            workoutExercise: props.workoutExercise,
            buttonText: "Start",
            progress: 1,
            isRunning: false,
            durationCompleted: 0
        };
    };

    tearDown = () => {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    };

    onDonePress = () => {
        const {workoutExercise, durationCompleted} = this.state;
        this.props.onDone(workoutExercise, durationCompleted);
        this.tearDown();
    };

    onStartPress = () => {
        this.setState({
            progress: 1,
            isRunning: true,
            buttonText: "Done (0s)",
            durationCompleted: 0
        });

        this.progressInterval = setInterval(this.calcProgress, 1000);
    };

    calcProgress = () => {
        const {workoutExercise} = this.state;
        const durationCompleted = this.state.durationCompleted + 1;

        if (durationCompleted > workoutExercise.duration) {
            this.tearDown();
        } else {
            this.setState({
                durationCompleted,
                buttonText: `Done (${this.state.durationCompleted + 1}s)`,
                progress: 1 - round(durationCompleted / workoutExercise.duration, 2)
            });
        }
    };

    render() {
        const {workoutExercise, buttonText, progress, isRunning, durationCompleted} = this.state;
        const buttonHandler = isRunning ? this.onDonePress : this.onStartPress;

        return (
            <View style={styles.container}>
                <Image source={{uri: workoutExercise.imageUrl}} style={styles.image}/>
                <Text style={styles.name}>{workoutExercise.name}</Text>
                <Text style={styles.duration}>
                    {secondsToMMSS(workoutExercise.duration - durationCompleted)}
                </Text>
                <Progress.Bar
                    progress={progress}
                    width={250}
                    height={10}
                    borderRadius={0}
                    borderColor={color.black}
                    color={color.brandPrimary}
                />
                <Button
                    raised
                    title={buttonText}
                    style={styles.button}
                    containerViewStyle={{
                        marginTop: 20,
                        width: 200
                    }}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={buttonHandler}/>
            </View>
        );
    }
}