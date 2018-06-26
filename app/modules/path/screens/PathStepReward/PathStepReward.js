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
import {REWARD_TYPES} from "../../constants";
import {Character} from "../../../characters/models";
import {updateUserPathProgress} from "../../../userPathProgress/actions";
import {color} from "../../../../styles/theme";
import RewardList from "../../../../components/RewardList/RewardList";
import {updateCharacter} from "../../../characters/actions";
import moment from 'moment';

class PathStepRewardScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <RNButton title={"Home"} onPress={() => goToMainTabRoute(navigation, "Home")}/>,
            headerRight: null,
            title: "Congratulations"
        }
    };

    constructor(props) {
        super(props);

        const {path, step, didEarnRewards} = props.navigation.state.params;
        const hasCompleted = isPathStepComplete(path, step, props.pathProgress);

        this.state = ({
            hasCompleted,
            didEarnRewards,
            showCompletedDate: hasCompleted
        });
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.didEarnRewards) {
                this.completeStep();
            }
        }, 500);
    }

    completeStep = () => {
        const {path, step} = this.props.navigation.state.params;
        const {user, pathProgress, character} = this.props;
        const rewards = getRewardsForStep(step);

        // update character rewards
        this.setState({
            animateRewardConfig: rewards,
            hasCompleted: true
        }, () => this.setState({animateRewardConfig: null}));

        if (rewards[REWARD_TYPES.XP]) {
            const characterWithNewXp = Character.addXp(character, rewards[REWARD_TYPES.XP]);
            this.props.dispatch(updateCharacter(characterWithNewXp)).then(() => {
                this.setState({...this.state}); // animate xp bar
            });
        }

        // update path progress
        pathProgress[path.uid] = pathProgress[path.uid] || {};
        pathProgress[path.uid][step.uid] = {
            completed: new Date().toISOString()
        };

        this.props.dispatch(updateUserPathProgress(user, pathProgress));

        Reporting.track("path_step_complete", {pathUid: path.uid, stepUid: step.uid});
    };

    onButtonPress = () => {
        const {path, step} = this.props.navigation.state.params;
        const nextStep = getNextStepInPath(path, step);

        if (nextStep) {
            goToPathStep(this.props.navigation, {
                step: nextStep,
                path
            })
        } else {
            // user completed all path steps. Send them to find a new path
            goToMainTabRoute(this.props.navigation, 'Paths');
        }
    };

    renderButton = () => {
        const {path, step} = this.props.navigation.state.params;
        const nextStep = getNextStepInPath(path, step);
        const text = nextStep ? nextStep.name : 'Choose a new path';
        const icon = nextStep ?
            {name: 'play', color: color.brandLight} :
            {name: 'graduation-cap', color: color.brandLight};

        return (
            <Button title={text} onPress={this.onButtonPress}
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
        const {showCompletedDate} = this.state;
        const {pathProgress} = this.props;

        if (showCompletedDate) {
            const date = moment(getPathStepCompletedDate(path, step, pathProgress)).format('MMM DD YYYY');
            return (
                <Text style={styles.completedDate}>completed: {date}</Text>
            );
        }
    };

    render() {
        const {character} = this.props;
        const {path, step} = this.props.navigation.state.params;
        const stepRewards = getRewardsForStep(step);

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <FontAwesome style={styles.statusIcon}>{Icons.checkCircleO}</FontAwesome>
                    <Text style={styles.congratulations}>Congratulations</Text>
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.youFinished}>You finished</Text>
                    <Text style={styles.stepName}>{step.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <FontAwesome style={styles.pathNameIcon}>{Icons.graduationCap}</FontAwesome>
                        <Text style={styles.pathName}>{path.name}</Text>
                    </View>
                    <View style={styles.rewardContainer}>
                        <RewardList rewardConfig={stepRewards}
                                    hasEarned={this.state.hasCompleted}
                                    size={45}/>
                        {this.renderCompletedDate()}
                    </View>
                </View>
                <CharacterPanel character={character}
                                animateRewardConfig={this.state.animateRewardConfig}/>
                {this.renderButton()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        paths: state.pathsReducer,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {},
        screenConfig: state.screensReducer.screens.Paths
    };
}

export default connect(mapStateToProps)(PathStepRewardScreen);