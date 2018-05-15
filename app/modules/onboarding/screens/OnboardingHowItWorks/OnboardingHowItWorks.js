import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import styles from "./styles";
import Button from "../../../../components/Button/Button";
import PushupImage from "../../../../assets/images/pushup.png";
import {NavigationActions} from "react-navigation";
import Reporting from "../../../reporting";
import {fetchMyCharacter} from "../../../characters/actions";
import {updateUser} from "../../actions";

class OnboardingHowItWorks extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Step 3 of 3"
        }
    };

    state = {
        isReady: false
    };

    componentWillMount() {
        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({isReady: true});
        })
    }

    onPressStartWork = () => {
        Reporting.track("onboarding__start_workout");
        this.goToNext();
    };

    onPressWorkoutLater = () => {
        Reporting.track("onboarding__workout_later");
        this.goToNext();
    };

    goToNext = () => {
        const {user} = this.props;
        user.hasCompletedOnboarding = true;

        this.props.dispatch(updateUser(user)).then(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({routeName: 'Main'})],
            });
            this.props.navigation.dispatch(resetAction);
        });
    };

    render() {
        if (!this.state.isReady) return null;

        return (
            <View style={styles.container}>
                <Text style={styles.intro}>Swipe through a quick tutorial to learn how Pursoo works.</Text>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.slide}>
                            <View style={styles.slideTop}>
                                <Image source={PushupImage} style={styles.slideImage}/>
                            </View>
                            <Text style={styles.slideTitle}>
                                1. Complete A Workout
                            </Text>
                            <Text style={styles.slideDescription}>
                                Choose one of our hand-crafted workouts and start making your fitness goals a reality.
                                Workouts are categorized by difficulty to help you choose one that's right for you.
                            </Text>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.slideTop}>
                                <FontAwesome style={{fontSize: 120, textAlign: 'center'}}>
                                    {Icons.trophy}
                                </FontAwesome>
                            </View>
                            <Text style={styles.slideTitle}>
                                2. Earn Rewards As You Sweat
                            </Text>
                            <Text style={styles.slideDescription}>
                                Each exercise you complete in a workout is counted towards your total reward. The more
                                you burn, the more you earn.
                            </Text>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.slideTop}>
                                <Image source={{uri: this.props.character.imageUrl}} style={styles.slideImage}/>
                            </View>
                            <Text style={styles.slideTitle}>
                                3. Level Up Your Character
                            </Text>
                            <Text style={styles.slideDescription}>
                                The rewards you rack up from working out are added to your hero. Improve your
                                performance, set new records, and level up your character as you both become stronger.
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <Button title={"Start A Workout"}
                        icon={'heartbeat'}
                        onPress={this.onPressStartWork}/>
                <TouchableOpacity onPress={this.onPressWorkoutLater}>
                    <Text style={styles.secondaryCTA}>I'll workout later</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character
    }
}

export default connect(mapStateToProps)(OnboardingHowItWorks);