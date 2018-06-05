import React from 'react';
import {View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import Button from "../../../../components/Button/Button";
import {contentWidth} from "../../../../styles/theme";
import RewardList from "../../../../components/RewardList/RewardList";
import {getRewardsForStep} from "../../../../components/Util";
import ExerciseList from "../../components/ExerciseList/ExerciseList";

class PathStepWorkoutScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {step} = navigation.state.params;

        return {
            headerTitle: step.name
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

    startWorkout = () => {
        const {step, onEarnedRewards} = this.props.navigation.state.params;

        Alert.alert("Start Workout");
    };

    goToExerciseInfo = (exercise) => {
        this.props.navigation.push("ExerciseInfo", {
            exercise: exercise.getExercise()
        });
    };


    renderRewards = () => {
        const {step} = this.props.navigation.state.params;
        const {hasCompleted} = this.state;

        return (
            <View style={styles.rewardsContainer}>
                <Text style={{fontWeight: 'bold'}}>REWARDS:</Text>
                <View style={{flexDirection: 'row'}}>
                    <RewardList rewardConfig={getRewardsForStep(step)} hasEarned={hasCompleted}/>
                </View>
            </View>
        );
    };

    render() {
        const {step, path, workout} = this.props.navigation.state.params;

        return (
            <ImageBackground
                style={styles.container}
                source={{uri: path.imageUrl}}>

                <ScrollView>
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
                    </View>
                    {this.renderRewards()}
                    <Button title={"START WORKOUT"}
                            containerViewStyle={{
                                marginTop: 10,
                                width: contentWidth - 30
                            }}
                            buttonStyle={{
                                borderRadius: 0,
                                height: 45
                            }}
                            onPress={this.startWorkout}/>
                </ScrollView>
            </ImageBackground>
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