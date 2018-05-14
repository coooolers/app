import React from 'react';
import {Text, View, Image, SectionList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import styles from "./styles";
import {fetchWorkouts} from "../../actions";
import XpLabel from "../../../../components/XpLabel";

const BEGINNER_DIFFICULTY = 1;
const INTERMEDIATE_DIFFICULTY = 2;
const ADVANCED_DIFFICULTY = 3;

class WorkoutList extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Workouts"
        }
    };

    state = {
        isReady: false,
        workouts: []
    };

    componentDidMount() {
        this.props.dispatch(fetchWorkouts()).then(() => {
            this.setState({
                isReady: true
            });
        });
    }

    goToItem = (workout) => {
        this.props.navigation.navigate("WorkoutDetail", {workout});
    };

    renderWorkoutItem = ({item}) => {
        return (
            <TouchableOpacity key={item.uid} style={styles.workout}
                              onPress={() => this.goToItem(item)}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.image} source={{uri: item.imageUrl}}/>
                    <View style={{flex: 1, flexDirection: "column"}}>
                        <Text style={styles.name}>{item.name}</Text>
                        <XpLabel xp={item.xp}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        if (!this.state.isReady) {
            return null;
        }

        const {workouts} = this.props;
        let sections = [];

        const beginnerWorkouts = workouts.filter(wo => wo.difficulty === BEGINNER_DIFFICULTY);
        if (beginnerWorkouts.length) {
            sections.push({title: 'Beginner', data: beginnerWorkouts});
        }

        const intermediateWorkouts = workouts.filter(wo => wo.difficulty === INTERMEDIATE_DIFFICULTY);
        if (intermediateWorkouts.length) {
            sections.push({title: 'Intermediate', data: intermediateWorkouts});
        }

        const advancedWorkouts = workouts.filter(wo => wo.difficulty === ADVANCED_DIFFICULTY);
        if (advancedWorkouts.length) {
            sections.push({title: 'Advanced', data: advancedWorkouts});
        }

        return (
            <View style={styles.container}>
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.uid}
                    renderItem={this.renderWorkoutItem}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.sectionTitle}>{title}</Text>
                    )}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        workouts: state.workoutReducer.workouts
    }
}

export default connect(mapStateToProps)(WorkoutList);