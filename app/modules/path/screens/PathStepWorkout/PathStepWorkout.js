import React from 'react';
import {View, Text, ImageBackground, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import Button from "../../../../components/Button/Button";
import {contentWidth} from "../../../../styles/theme";
import RewardIcon from "../../components/RewardIcon/RewardIcon";

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

        // if (this.state.didEarnRewards) {
        //     setTimeout(() => {
        //         onEarnedRewards(step)
        //     }, 500);
        // }
    };

    renderExercises = () => {
        const {step} = this.props.navigation.state.params;
        const {exercises} = this.props;

        return step.workoutRoutine.map((r, i) => {
            const exercise = exercises.byId[r.key];
            return (
                <View key={i} style={styles.exerciseContainer}>
                    <Image source={{uri: exercise.imageUrl}} style={styles.exerciseImage}/>
                    <View style={styles.exerciseContent}>
                        <Text>{exercise.name}</Text>
                        <Text>{r.quantity}</Text>
                        <Text>{r.duration}</Text>
                    </View>
                    <FontAwesome>{Icons.infoCircle}</FontAwesome>
                </View>
            );
        });
    };

    renderRewards = () => {
        const {step} = this.props.navigation.state.params;
        const {hasCompleted} = this.state;

        return (
            <View style={styles.rewardsContainer}>
                <Text style={{fontWeight: 'bold'}}>REWARDS:</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        step.rewards.map((r, i) => {
                            return <RewardIcon
                                key={i}
                                type={r.key}
                                value={r.value}
                                hasEarned={hasCompleted}
                                containerStyles={{
                                    marginRight: 10
                                }}
                            />
                        })
                    }
                </View>
            </View>
        );
    };

    render() {
        const {step, path} = this.props.navigation.state.params;

        return (
            <ImageBackground
                style={styles.container}
                source={{uri: path.imageUrl}}>

                <ScrollView>
                    <View style={styles.panel}>
                        <View style={styles.headerIconContainer}>
                            <FontAwesome style={styles.headerIcon}>{Icons.handRockO}</FontAwesome>
                        </View>
                        <Text style={styles.title}>{step.name}</Text>
                        <Text style={styles.subTitle}>
                            <FontAwesome>{Icons.graduationCap}</FontAwesome> {path.name}
                        </Text>
                        <View style={styles.exerciseList}>
                            {this.renderExercises()}
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
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid],
        exercises: state.exerciseReducer
    };
}

export default connect(mapStateToProps)(PathStepWorkoutScreen);