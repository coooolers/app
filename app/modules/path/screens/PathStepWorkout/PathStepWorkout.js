import React from 'react';
import {View, ScrollView, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import ExerciseList from "../../components/ExerciseList";
import BackgroundImage from "../../../../components/BackgroundImage";
import PathStepPanel from "../../components/PathStepPanel";
import Button from "../../../../components/Button/Button";
import ScreenInfoDrawer from "../../../../components/ScreenInfoDrawer";

class PathStepWorkoutScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {step, startWorkout} = navigation.state.params || {};

        return {
            headerTitle: step.name,
            headerRight: <RNButton onPress={() => startWorkout()} title={"Start"}/>
        }
    };

    constructor(props) {
        super(props);

        const {pathProgress, navigation} = props;
        const {path, step} = navigation.state.params;

        const stepProgress = pathProgress && pathProgress[path.uid] && pathProgress[path.uid][step.uid];

        this.state = {
            hasCompleted: !!stepProgress
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            startWorkout: this.startWorkout.bind(this)
        });
    }

    startWorkout = () => {
        const {step, path, workout, onEarnedRewards} = this.props.navigation.state.params;
        const {hasCompleted} = this.state;

        this.props.navigation.push("PathStepWorkoutRoutine", {
            path,
            step,
            workout,
            hasCompleted,
            exerciseIndex: 0,
            onEarnedRewards
        })
    };

    goToExerciseInfo = (exercise) => {
        this.props.navigation.push("ExerciseInfo", {
            exercise: exercise.getExercise()
        });
    };


    render() {
        const {hasCompleted} = this.state;
        const {step, path, workout} = this.props.navigation.state.params;
        const {screenConfig} = this.props;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <ScreenInfoDrawer uid={"path-step-workout"}
                                  title={screenConfig.infoDrawerTitle}
                                  text={screenConfig.infoDrawerText}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PathStepPanel step={step} path={path} hasCompleted={hasCompleted} icon={Icons.clockO}>
                        <ExerciseList workout={workout} onPress={this.goToExerciseInfo}/>
                    </PathStepPanel>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button title={"START WORKOUT"} onPress={this.startWorkout}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {},
        screenConfig: state.screensReducer.screens.PathStepWorkout
    };
}

export default connect(mapStateToProps)(PathStepWorkoutScreen);