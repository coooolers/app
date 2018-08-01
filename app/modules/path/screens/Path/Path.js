import React from 'react';
import {ScrollView, View, Button as RNButton, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import PathStepItem from "../../components/PathStepItem";
import {STEP_TYPES} from "../../constants";
import {goToMainTabRoute, isPathStepComplete} from "../../../../components/Util";
import {Workout} from "../../../workouts/models";

class PathScreen extends React.Component {
    state = {
        animateRewardConfig: null
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <RNButton onPress={() => goToMainTabRoute(navigation, "Paths")} title="Paths"/>
        };
    };

    goToStep = (step, index) => {
        const {path} = this.props.navigation.state.params;

        if (this.isStepLocked(step, index)) return;

        if (step.type === STEP_TYPES.AUDIO) {
            this.props.navigation.push("PathStepAudio", {
                step,
                path
            });
        } else if (step.type === STEP_TYPES.WORKOUT) {
            this.props.navigation.push("PathStepWorkout", {
                step,
                path,
                workout: new Workout(step.name, step.workoutRoutine)
            });
        }
    };

    isStepLocked = (step, index) => {
        const {navigation, pathProgress} = this.props;
        const {path} = navigation.state.params;
        const {stepsOrder} = path;
        const previousStepUid = stepsOrder[index - 1];
        const previousStep = path.steps[previousStepUid];
        return previousStep ? !isPathStepComplete(path, previousStep, pathProgress) : false;
    };

    renderPathStep = (stepKey, index) => {
        const {pathProgress, navigation} = this.props;
        const {path} = navigation.state.params;
        const step = path.steps[stepKey];

        return (
            <PathStepItem
                key={step.uid}
                step={step}
                index={index}
                onSelect={(step) => this.goToStep(step, index)}
                isCompleted={isPathStepComplete(path, step, pathProgress)}
                isLocked={this.isStepLocked(step, index)}
            />
        );
    };

    render() {
        const {path} = this.props.navigation.state.params;

        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Image source={{uri: path.imageUrl}} style={styles.image}/>
                <View style={styles.content}>
                    <Text style={styles.title}>{path.name}</Text>
                    <Text style={styles.description}>{path.description}</Text>
                    <View style={styles.stepsLabelContainer}>
                        <Text style={styles.stepsLabel}>Steps</Text>
                    </View>
                    {path.stepsOrder.map(this.renderPathStep)}
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {}
    };
}

export default connect(mapStateToProps)(PathScreen);