import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import PathStep from "../../components/PathStep";
import CharacterPanel from "../../components/CharacterPanel";
import {STEP_TYPES} from "../../constants";
import {updateUserPathProgress} from "../../../userPathProgress/actions";

class PathScreen extends React.Component {
    state = {};

    static navigationOptions = ({navigation}) => {
        const {path} = navigation.state.params;

        return {
            title: path.name
        };
    };

    onEarnedRewards = (step) => {
        const {path} = this.props.navigation.state.params;
        const {user, pathProgress} = this.props;

        pathProgress[path.uid] = pathProgress[path.uid] || {};
        pathProgress[path.uid][step.uid] = {
            completed: new Date().toISOString()
        };

        this.props.dispatch(updateUserPathProgress(user, pathProgress)).then(() => {
            this.setState({...this.state}); // rerender for completion events to occur
            console.log("earned rewards", step);
        });
    };

    goToStep = (step) => {
        const {path} = this.props.navigation.state.params;
        if (step.type === STEP_TYPES.AUDIO) {
            this.props.navigation.push("PathStepAudio", {
                step,
                path,
                onEarnedRewards: this.onEarnedRewards.bind(this)
            });
        }
    };

    renderPathStep = (stepKey, index) => {
        const {pathProgress, navigation} = this.props;
        const {path} = navigation.state.params;
        const step = path.steps[stepKey];

        const stepProgress = pathProgress && pathProgress[path.uid] && pathProgress[path.uid][step.uid];
        const isCompleted = !!stepProgress;

        return (
            <PathStep
                key={step.uid}
                step={step}
                showTopStatusBorder={index > 1}
                showBottomStatusBorder={index < path.stepsOrder.length - 1}
                onSelect={this.goToStep}
                isCompleted={isCompleted}
                isLocked={false}
            />
        );
    };

    render() {
        const {character, levelConfig, navigation} = this.props;
        const {path} = navigation.state.params;

        console.log(this.props.pathProgress);

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    {path.stepsOrder.map(this.renderPathStep)}
                </ScrollView>
                <CharacterPanel character={character} levelConfig={levelConfig}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        levelConfig: state.levelConfigReducer.levelConfig,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid]
    };
}

export default connect(mapStateToProps)(PathScreen);