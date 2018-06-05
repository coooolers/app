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
import _ from 'lodash';
import {getRewardsForStep, goToMainTabRoute} from "../../../../components/Util";
import {Workout} from "../../../workouts/models";

class PathScreen extends React.Component {
    state = {};

    static navigationOptions = ({navigation}) => {
        const {path} = navigation.state.params || {};

        return {
            headerLeft: <Button onPress={() => goToMainTabRoute(navigation, "Paths")} title="Paths"/>,
            title: path.name
        };
    };

    componentDidMount() {

        //TODO: remove
        const {path} = this.props.navigation.state.params;
        this.goToStep(path.steps["exercise-practice"], 4);
        // setTimeout(() => {
        //     this.onEarnedRewards({
        //         "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3",
        //         "description": "Welcome to the introduction to the beginner bodyweight path! Take a moment to listen and learn what you should expect.",
        //         "name": "Introduction",
        //         "rewards": [{
        //             "key": "xp",
        //             "value": 20
        //         }],
        //         "type": "audio",
        //         "uid": "introduction"
        //     });
        // }, 500);
    }

    onEarnedRewards = (step) => {
        const {path} = this.props.navigation.state.params;
        const {user, pathProgress, character} = this.props;
        const rewards = getRewardsForStep(step);

        pathProgress[path.uid] = pathProgress[path.uid] || {};
        pathProgress[path.uid][step.uid] = {
            completed: new Date().toISOString()
        };

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
        const {character, navigation} = this.props;
        const {path} = navigation.state.params;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    {path.stepsOrder.map(this.renderPathStep)}
                </ScrollView>
                <CharacterPanel character={character}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid]
    };
}

export default connect(mapStateToProps)(PathScreen);