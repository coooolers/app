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
import {getRewardsForStep, goToMainTabRoute} from "../../../../components/Util";
import {Workout} from "../../../workouts/models";
import BackgroundImage from "../../../../components/BackgroundImage/BackgroundImage";
import ScreenInfoDrawer from "../../../../components/ScreenInfoDrawer";
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
    };

    goToStep = (step, index) => {
        const {path} = this.props.navigation.state.params;

        if (this.isStepLocked(step, index)) return;

        if (step.type === STEP_TYPES.AUDIO) {
            this.props.navigation.push("PathStepAudio", {
                step,
                path,
                onEarnedRewards: this.onEarnedRewards.bind(this)
            });
        } else if (step.type === STEP_TYPES.WORKOUT) {
            this.props.navigation.push("PathStepWorkout", {
                step,
                path,
                workout: new Workout(step.name, step.workoutRoutine),
                onEarnedRewards: this.onEarnedRewards.bind(this)
            });
        }
    };

    isStepLocked = (step, index) => {
        const {navigation, pathProgress} = this.props;
        const {path} = navigation.state.params;
        const {stepsOrder} = path;
        const previousStepUid = stepsOrder[index - 1];

        if (previousStepUid) {
            const previousStepProgress = pathProgress && pathProgress[path.uid] && pathProgress[path.uid][previousStepUid];
            return !previousStepProgress;
        } else {
            return false;
        }
    };

    renderPathStep = (stepKey, index) => {
        const {pathProgress, navigation} = this.props;
        const {path} = navigation.state.params;
        const step = path.steps[stepKey];

        const stepProgress = pathProgress && pathProgress[path.uid] && pathProgress[path.uid][step.uid];
        const isCompleted = !!stepProgress;

        return (
            <PathStepItem
                key={step.uid}
                step={step}
                showTopStatusBorder={index > 1}
                showBottomStatusBorder={index < path.stepsOrder.length - 1}
                onSelect={(step) => this.goToStep(step, index)}
                isCompleted={isCompleted}
                isLocked={this.isStepLocked(step, index)}
            />
        );
    };

    render() {
        const {animateRewardConfig} = this.state;
        const {character, navigation, screenConfig} = this.props;
        const {path} = navigation.state.params;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"purple"}/>
                <ScreenInfoDrawer uid={"path-step"}
                                  title={screenConfig.infoDrawerTitle}
                                  text={screenConfig.infoDrawerText}/>
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
        screenConfig: state.screensReducer.screens.PathStep
    };
}

export default connect(mapStateToProps)(PathScreen);