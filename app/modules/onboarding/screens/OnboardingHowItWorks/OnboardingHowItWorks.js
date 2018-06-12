import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, ScrollView} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import styles from "./styles";
import Button from "../../../../components/Button/Button";
import PushupImage from "../../../../assets/images/pushup.png";
import Reporting from "../../../reporting";
import {fetchMyCharacter} from "../../../characters/actions";
import {updateUser} from "../../actions";
import {goToMainTabRoute} from "../../../../components/Util";

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

    goToNext = () => {
        const {user} = this.props;
        user.hasCompletedOnboarding = true;

        this.props.dispatch(updateUser(user)).then(() => {
            goToMainTabRoute(this.props.navigation, 'Paths');
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