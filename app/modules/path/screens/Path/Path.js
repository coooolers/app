import React from 'react';
import {ScrollView, View, Button} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import PathStepItem from "../../components/PathStepItem";
import CharacterPanel from "../../components/CharacterPanel";
import {REWARD_TYPES, STEP_TYPES} from "../../constants";
import {updateUserPathProgress} from "../../../userPathProgress/actions";
import {Character} from "../../../characters/models";
import {updateCharacter} from "../../../characters/actions";
import {getRewardsForStep, goToMainTabRoute, isPathStepComplete} from "../../../../components/Util";
import {Workout} from "../../../workouts/models";
import BackgroundImage from "../../../../components/BackgroundImage/BackgroundImage";
import Reporting from "../../../reporting";

class PathScreen extends React.Component {
    state = {
        animateRewardConfig: null
    };

    static navigationOptions = ({navigation}) => {
        const {path} = navigation.state.params || {};

        return {
            headerLeft: <Button onPress={() => goToMainTabRoute(navigation, "Paths")} title="Paths"/>,
            title: path.name
        };
    };

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.pathStepToComplete && nextProps.pathStepToComplete !== prevProps.pathStepToComplete) {
            this.onEarnedRewards(nextProps.pathStepToComplete.step);
        }
    }

    onEarnedRewards = (step) => {
        const {path} = this.props.navigation.state.params;
        const {user, pathProgress, character} = this.props;
        const rewards = getRewardsForStep(step);

        Reporting.track("path_step_complete", {
            pathUid: path.uid,
            stepUid: step.uid
        });

        pathProgress[path.uid] = pathProgress[path.uid] || {};
        pathProgress[path.uid][step.uid] = {
            completed: new Date().toISOString()
        };

        this.setState({
            animateRewardConfig: rewards
        }, () => this.setState({animateRewardConfig: null}));

        if (rewards[REWARD_TYPES.XP]) {
            const characterWithNewXp = Character.addXp(character, rewards[REWARD_TYPES.XP]);
            this.props.dispatch(updateCharacter(characterWithNewXp)).then(() => {
                this.setState({...this.state});
            });
        }

        this.props.dispatch(updateUserPathProgress(user, pathProgress)).then(() => {
            this.setState({...this.state});
        });

        // TODO: temporary until we create a normalized reward screen
        this.props.dispatch({type: "PATH_STEP_TO_COMPLETE_COMPLETED"});
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
                showTopStatusBorder={index > 1}
                showBottomStatusBorder={index < path.stepsOrder.length - 1}
                onSelect={(step) => this.goToStep(step, index)}
                isCompleted={isPathStepComplete(path, step, pathProgress)}
                isLocked={this.isStepLocked(step, index)}
            />
        );
    };

    render() {
        const {animateRewardConfig} = this.state;
        const {character, navigation} = this.props;
        const {path} = navigation.state.params;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"purple"}/>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {path.stepsOrder.map(this.renderPathStep)}
                </ScrollView>
                <CharacterPanel character={character} animateRewardConfig={animateRewardConfig}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {},
        pathStepToComplete: state.pathStepToCompleteReducer.item
    };
}

export default connect(mapStateToProps)(PathScreen);