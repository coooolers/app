import React from 'react';
import {TouchableOpacity, ScrollView, View, Alert, Image, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import QuantityExercise from "../../components/QuantityExercise";
import DurationExercise from "../../components/DurationExercise";
import {color, windowWidth} from "../../../../styles/theme";
import styles from "./styles";

class PathStepWorkoutRoutine extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {goToExerciseHelp, cancelWorkout} = navigation.state.params || {};

        return {
            headerLeft: <RNButton onPress={() => cancelWorkout()} title={"Cancel"}/>,
            headerRight: (
                <TouchableOpacity onPress={() => goToExerciseHelp()}>
                    <MaterialCommunityIcon name="information-outline"
                                           style={{color: color.brandDark, fontSize: 22, marginRight: 10}}/>
                </TouchableOpacity>
            )
        }
    };

    constructor(props) {
        super(props);
        const {path, step, workout, exerciseIndex} = props.navigation.state.params;
        this.state = {path, step, workout, exerciseIndex};
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goToExerciseHelp: this.goToExerciseHelp.bind(this),
            cancelWorkout: this.cancelWorkout.bind(this)
        });
    }

    componentDidMount() {
        this.centerExerciseNavigation();
    }

    onQuantityExerciseDone = (workoutExercise, quantityCompleted) => {
        workoutExercise.completeWithQuantity(quantityCompleted);
        this.goToNextExercise();
    };

    onDurationExerciseDone = (workoutExercise, durationCompleted) => {
        workoutExercise.completeWithDuration(durationCompleted);
        this.goToNextExercise();
    };

    cancelWorkout = () => {
        Alert.alert(
            'Cancel Workout?',
            'Any rewards earned will not be saved.',
            [
                {
                    text: 'No',
                    onPress: () => {
                    },
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => this.props.navigation.popToTop(),
                },
            ]
        );
    };

    goToExerciseHelp = () => {
        const {workout, exerciseIndex} = this.state;
        const workoutExercise = workout.routine[exerciseIndex];

        this.props.navigation.push('ExerciseInfo', {
            exercise: workoutExercise.getExercise()
        });
    };

    goToExercise = (exerciseIndex) => {
        const {workout} = this.state;
        const exercises = workout.routine.slice(0, exerciseIndex);
        const allPreviousExercisesComplete = exercises.every(e => e.isComplete);

        if (allPreviousExercisesComplete) {
            this.setState({exerciseIndex}, () => this.centerExerciseNavigation());
        }
    };

    goToNextExercise = () => {
        const {path, step, workout, exerciseIndex} = this.state;
        const nextWorkoutExercise = workout.routine[exerciseIndex + 1];

        if (nextWorkoutExercise) {
            this.goToExercise(exerciseIndex + 1);
        } else {
            workout.complete();

            // TODO: maybe reset nav stack here for memory management?
            // TODO: add value to support success without earning rewards
            this.props.navigation.navigate('PathStepWorkoutReward', {
                path,
                step,
                workout
            });
        }
    };

    centerExerciseNavigation = () => {
        const {exerciseIndex} = this.state;

        const itemWidth = 70;
        const centerOffset = -(windowWidth / 2) + itemWidth;
        const itemOffset = centerOffset + (itemWidth * exerciseIndex);

        this.exerciseScrollView.scrollTo({x: itemOffset, y: 0, animated: true});
    };

    renderExerciseNavigationItem = (e, i) => {
        const {exerciseIndex} = this.state;
        const isCurrentExercise = exerciseIndex === i;
        const itemStyles = isCurrentExercise ?
            [styles.navigationItem, styles.navigationItemActive] : styles.navigationItem;
        let completedIcon = null;


        if (e.isComplete && e.completedStatus === "success") {
            completedIcon = <MaterialCommunityIcon name="check-circle" style={styles.navigationItemCompletedIcon}/>;
        } else if (e.isComplete && e.completedStatus === "failed") {
            completedIcon = <MaterialCommunityIcon name="close-circle" style={styles.navigationItemFailedIcon}/>;
        }

        return (
            <TouchableOpacity key={i} style={itemStyles} onPress={() => this.goToExercise(i)}>
                <Image source={{uri: e.imageUrl}}
                       style={styles.navigationImage}/>
                {completedIcon}
            </TouchableOpacity>
        )
    };

    renderExerciseNavigation = () => {
        const {workout} = this.state;

        return (
            <View style={styles.navigation}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}
                            ref={(e) => this.exerciseScrollView = e}>
                    {workout.routine.map(this.renderExerciseNavigationItem)}
                </ScrollView>
            </View>
        )
    };

    renderExercise = () => {
        const {workout, exerciseIndex} = this.state;
        const workoutExercise = workout.routine[exerciseIndex];

        if (workoutExercise.isQuantity) {
            return (
                <QuantityExercise key={exerciseIndex}
                                  workoutExercise={workoutExercise}
                                  workout={workout}
                                  onDone={this.onQuantityExerciseDone}
                />
            );
        } else {
            return (
                <DurationExercise key={exerciseIndex}
                                  workoutExercise={workoutExercise}
                                  workout={workout}
                                  onDone={this.onDurationExerciseDone}
                />
            )
        }

    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderExerciseNavigation()}
                <View style={styles.content}>
                    {this.renderExercise()}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(PathStepWorkoutRoutine);