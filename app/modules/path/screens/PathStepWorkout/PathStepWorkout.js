import React from 'react';
import {View, Text, ScrollView, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import RewardList from "../../../../components/RewardList/RewardList";
import {getRewardsForStep} from "../../../../components/Util";
import ExerciseList from "../../components/ExerciseList/ExerciseList";
import BackgroundImage from "../../../../components/BackgroundImage/BackgroundImage";

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
            hasCompleted: !!stepProgress,
            didEarnRewards: false
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            startWorkout: this.startWorkout.bind(this)
        });
    }

    startWorkout = () => {
        const {step, path, workout, onEarnedRewards} = this.props.navigation.state.params;

        this.props.navigation.push("PathStepWorkoutRoutine", {
            path,
            step,
            workout,
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

        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.panel}>
                        <View style={styles.headerIconContainer}>
                            <FontAwesome style={styles.headerIcon}>{Icons.clockO}</FontAwesome>
                        </View>
                        <Text style={styles.title}>{step.name}</Text>
                        <Text style={styles.subTitle}>
                            <FontAwesome>{Icons.graduationCap}</FontAwesome> {path.name}
                        </Text>
                        <View style={styles.exerciseContainer}>
                            <ExerciseList workout={workout} onPress={this.goToExerciseInfo}/>
                        </View>
                        <View style={styles.rewardsContainer}>
                            <Text style={{fontWeight: 'bold'}}>REWARDS:</Text>
                            <View style={{flexDirection: 'row'}}>
                                <RewardList rewardConfig={getRewardsForStep(step)} hasEarned={hasCompleted}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid]
    };
}

export default connect(mapStateToProps)(PathStepWorkoutScreen);