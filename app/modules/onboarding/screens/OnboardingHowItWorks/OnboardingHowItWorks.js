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
        const {screenConfig} = this.props;
        if (!this.state.isReady) return null;

        return (
            <View style={styles.container}>
                <Text style={styles.intro}>{screenConfig.introText}</Text>
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
                            <Text style={styles.slideTitle}>{screenConfig.slide1.title}</Text>
                            <Text style={styles.slideDescription}>{screenConfig.slide1.description}</Text>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.slideTop}>
                                <FontAwesome style={{fontSize: 120, textAlign: 'center'}}>
                                    {Icons.trophy}
                                </FontAwesome>
                            </View>
                            <Text style={styles.slideTitle}>{screenConfig.slide2.title}</Text>
                            <Text style={styles.slideDescription}>{screenConfig.slide2.description}</Text>
                        </View>
                        <View style={styles.slide}>
                            <View style={styles.slideTop}>
                                <Image source={{uri: this.props.character.imageUrl}} style={styles.slideImage}/>
                            </View>
                            <Text style={styles.slideTitle}>{screenConfig.slide3.title}</Text>
                            <Text style={styles.slideDescription}>{screenConfig.slide3.description}</Text>
                        </View>
                    </ScrollView>
                </View>
                <Button title={screenConfig.buttonText}
                        icon={screenConfig.buttonIcon}
                        onPress={this.onPressStartWork}/>
                <TouchableOpacity onPress={this.onPressWorkoutLater}>
                    <Text style={styles.secondaryCTA}>{screenConfig.buttonAltText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        screenConfig: state.screensReducer.screens.OnboardingHowItWorks
    }
}

export default connect(mapStateToProps)(OnboardingHowItWorks);