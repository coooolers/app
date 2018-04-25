import React from 'react';
import {View, FlatList} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles";

class WorkoutDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false
        };
    }

    componentDidMount() {
        this.setState({isReady: true});
    }

    goToWorkoutRoutine = (workout) => {
        return Actions.push("WorkoutRoutine", {workout});
    };

    renderExerciseItem = ({item, index}) => {
        return (
            <View key={index} style={styles.exerciseRow}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseSets}>1</Text>
                <Text style={styles.exerciseReps}>{item.quantity}</Text>
                <Text style={styles.exerciseReward}>{item.xpString}</Text>
            </View>
        )
    };

    render() {
        const {workout} = this.props;

        if (!this.state.isReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{workout.name}</Text>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text>{workout.difficulty}</Text>
                    <Text>{workout.xpString}</Text>
                    <View style={styles.exerciseRoutineContainer}>
                        <View style={styles.exerciseRowHeader}>
                            <Text style={styles.exerciseNameLabel}/>
                            <Text style={styles.exerciseSetsLabel}>Sets</Text>
                            <Text style={styles.exerciseRepsLabel}>Reps</Text>
                            <Text style={styles.exerciseRewardLabel}>Reward</Text>
                        </View>
                        <FlatList
                            data={workout.exercises}
                            keyExtractor={(item, index) => `${item.key}-${index}`}
                            renderItem={this.renderExerciseItem}

                        />
                    </View>
                </View>
                <Button
                    raised
                    title={"START WORKOUT"}
                    borderRadius={4}
                    style={styles.button}
                    containerViewStyle={styles.containerView}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => this.goToWorkoutRoutine(workout)}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(WorkoutDetail);