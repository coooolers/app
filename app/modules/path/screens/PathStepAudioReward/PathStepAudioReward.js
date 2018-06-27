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

class PathStepAudioRewardScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <RNButton title={"Home"} onPress={() => goToMainTabRoute(navigation, "Home")}/>,
            headerRight: null
        }
    };

    constructor(props) {
        super(props);

        const {path, step} = props.navigation.state.params;
        const hasAlreadyCompleted = isPathStepComplete(path, step, props.pathProgress);
        const didCompleteStep = hasAlreadyCompleted === false

        this.state = ({
            hasAlreadyCompleted, // the user completed this step in another session
            didCompleteStep, // the user completed this step right now
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
        const {character} = this.props;
        const rewards = getRewardsForStep(step);

        if (rewards[REWARD_TYPES.XP]) {
            this.setState({animateRewardConfig: rewards}, () => this.setState({animateRewardConfig: null}));

            const characterWithNewXp = Character.addXp(character, rewards[REWARD_TYPES.XP]);
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

        if (nextStep) {
            text = nextStep.name;
            icon = {name: 'play', color: color.brandLight};
            onPress = () => goToPathStep(this.props.navigation, {step: nextStep, path})
        } else {
            text = "Choose a new path";
            icon = {name: 'graduation-cap', color: color.brandLight};
            onPress = () => goToMainTabRoute(this.props.navigation, 'Paths');
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

    renderTopContainer = () => {
        return (
            <View style={styles.topContainer}>
                <FontAwesome style={styles.statusIcon}>{Icons.checkCircleO}</FontAwesome>
                <Text style={styles.congratulations}>Congratulations</Text>
            </View>
        );
    };

    renderMiddleContainer = () => {
        const {path, step} = this.props.navigation.state.params;
        const stepRewards = getRewardsForStep(step);

        return (
            <View style={styles.middleContainer}>
                <Text style={styles.youFinished}>You finished</Text>
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

export default connect(mapStateToProps)(PathStepAudioRewardScreen);