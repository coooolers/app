import React from 'react';
import {Text, View, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Button from "../../../../components/Button/Button";
import {
    getNextStepInPath, getPathStepCompletedDate,
    getRewardsForStep,
    goToMainTabRoute,
    goToPathStep,
    isPathStepComplete
} from "../../../../components/Util";
import Reporting from "../../../reporting";
import {Character} from "../../../characters/models";
import {updateUserPathProgress} from "../../../userPathProgress/actions";
import {color} from "../../../../styles/theme";
import RewardList from "../../../../components/RewardList/RewardList";
import {updateCharacter} from "../../../characters/actions";
import moment from 'moment';
import {WORKOUT_GRADES} from "../../../workouts/constants";

class PathStepWorkoutRewardScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <RNButton title={"Home"} onPress={() => goToMainTabRoute(navigation, "Home")}/>,
            headerRight: null
        }
    };

    constructor(props) {
        super(props);

        const {path, step, workout} = props.navigation.state.params;
        const hasAlreadyCompleted = isPathStepComplete(path, step, props.pathProgress);
        const didCompleteStep = workout.grade === WORKOUT_GRADES.S && hasAlreadyCompleted === false;

        this.state = ({
            hasAlreadyCompleted, // the user completed this step in another session
            didCompleteStep, // the user completed this step right now
            showCongratulations: didCompleteStep || hasAlreadyCompleted, // the user fully completed the workout
            hasEarnedRewards: false // the user has earned their rewards from this step
        });
    }

    componentDidMount() {
        const {path, step} = this.props.navigation.state.params;

        setTimeout(() => {
            this.earnRewards();

            if (this.state.didCompleteStep) {
                this.completeStep();
                Reporting.track("path_step_complete", {pathUid: path.uid, stepUid: step.uid, type: step.type});
            } else {
                Reporting.track("path_step_incomplete", {pathUid: path.uid, stepUid: step.uid, type: step.type});
            }
        }, 500);
    }

    earnRewards = () => {
        const {workout} = this.props.navigation.state.params;
        const {character} = this.props;

        if (workout.xpEarned) {
            this.setState({
                animateRewardConfig: {
                    xp: workout.xpEarned
                }
            }, () => this.setState({animateRewardConfig: null}));

            const characterWithNewXp = Character.addXp(character, workout.xpEarned);
            this.props.dispatch(updateCharacter(characterWithNewXp)).then(() => {
                this.setState({hasEarnedRewards: true});
            });
        }
    };

    // TODO: move to action
    completeStep = () => {
        const {path, step} = this.props.navigation.state.params;
        const {user, pathProgress} = this.props;

        pathProgress[path.uid] = pathProgress[path.uid] || {};
        pathProgress[path.uid][step.uid] = {
            completed: new Date().toISOString()
        };

        this.props.dispatch(updateUserPathProgress(user, pathProgress));
    };

    renderButton = () => {
        const {path, step} = this.props.navigation.state.params;
        const nextStep = getNextStepInPath(path, step);
        let text = null;
        let icon = null;
        let onPress = null;

        if (this.state.showCongratulations) {
            if (nextStep) {
                text = nextStep.name;
                icon = {name: 'play', color: color.brandLight};
                onPress = () => goToPathStep(this.props.navigation, {step: nextStep, path})
            } else {
                text = "Choose a new path";
                icon = {name: 'graduation-cap', color: color.brandLight};
                onPress = () => goToMainTabRoute(this.props.navigation, 'Paths');
            }
        } else {
            text = 'Home';
            icon = {name: 'home', color: color.brandLight};
            onPress = () => goToMainTabRoute(this.props.navigation, 'Home');
        }

        return (
            <Button title={text} onPress={onPress}
                    raised={false}
                    icon={icon}
                    iconRight={true}
                    containerViewStyle={{padding: 0, margin: 0, borderRadius: 0, width: '100%'}}
                    buttonStyle={{width: '100%', margin: 0, borderRadius: 0}}
            />
        );
    };

    renderCompletedDate = () => {
        const {path, step} = this.props.navigation.state.params;
        const {pathProgress} = this.props;

        if (this.state.hasAlreadyCompleted) {
            const date = moment(getPathStepCompletedDate(path, step, pathProgress)).format('MMM DD YYYY');
            return (
                <Text style={styles.completedDate}>completed: {date}</Text>
            );
        }
    };

    renderStars = () => {
        const {workout} = this.props.navigation.state.params;
        let numStars = 0;
        let stars = [...Array(5)].map((_, i) => <FontAwesome style={styles.star} key={i}>{Icons.starO}</FontAwesome>);

        if (workout.grade === WORKOUT_GRADES.S) {
            numStars = 5;
        } else if (workout.grade === WORKOUT_GRADES.A) {
            numStars = 4;
        } else if (workout.grade === WORKOUT_GRADES.B) {
            numStars = 3;
        } else if (workout.grade === WORKOUT_GRADES.C) {
            numStars = 2;
        } else if (workout.grade === WORKOUT_GRADES.D) {
            numStars = 1;
        } else if (workout.grade === WORKOUT_GRADES.F) {
            numStars = 0;
        }

        for (let i = 0; i < numStars; i++) {
            stars[i] = <FontAwesome style={styles.star} key={i}>{Icons.star}</FontAwesome>;
        }

        return stars;
    };

    renderTopContainer = () => {
        return (
            <View style={[styles.topContainer, {backgroundColor: '#2b78e4'}]}>
                <View style={styles.starContainer}>
                    {this.renderStars()}
                </View>
                <Text style={styles.congratulations}>Great Workout!</Text>
            </View>
        );
    };

    renderMiddleContainer = () => {
        const {path, step} = this.props.navigation.state.params;
        const stepRewards = getRewardsForStep(step);
        const text = this.state.showCongratulations ? 'You finished' : 'Take some time to rest and heal your muscles. Try again later to earn all five stars and complete this level.';

        return (
            <View style={styles.middleContainer}>
                <Text style={styles.youFinished}>{text}</Text>
                <Text style={styles.stepName}>{step.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <FontAwesome style={styles.pathNameIcon}>{Icons.graduationCap}</FontAwesome>
                    <Text style={styles.pathName}>{path.name}</Text>
                </View>
                <View style={styles.rewardContainer}>
                    <RewardList rewardConfig={stepRewards}
                                hasEarned={this.state.hasEarnedRewards}
                                size={45}/>
                    {this.renderCompletedDate()}
                </View>
            </View>
        );
    };

    renderBottomContainer = () => {
        const {character} = this.props;

        return (
            <View>
                <CharacterPanel character={character}
                                animateRewardConfig={this.state.animateRewardConfig}/>
                {this.renderButton()}
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderTopContainer()}
                {this.renderMiddleContainer()}
                {this.renderBottomContainer()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        paths: state.pathsReducer,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {}
    };
}

export default connect(mapStateToProps)(PathStepWorkoutRewardScreen);