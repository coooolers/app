import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, Button as RNButton} from 'react-native';
import styles from "./styles";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {fetchMyCharacter} from "../../../characters/actions";
import Swiper from 'react-native-swiper';
import XpBar from "../../../../components/XpBar/XpBar";
import {Character} from "../../../characters/models";
import {color} from "../../../../styles/theme";

const createCharacterPlaceholder = (user, character) => {
    return new Character(character.uid, user, character.nane, character.imageUrl);
};

class OnboardingHowItWorks extends React.Component {
    state = {
        character: null,
        isReady: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        }
    };

    componentWillMount() {
        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({
                character: createCharacterPlaceholder(this.props.user, this.props.character),
                isReady: true
            })
        })
    }

    animateXpBar = () => {
        const {character} = this.state;

        this.setState({
            character: Character.addXp(character, 40)
        });
    };

    onSlideChange = (index) => {
        if (index === 2) { // character slide
            this.setState({
                character: createCharacterPlaceholder(this.props.user, this.props.character)
            });

            setTimeout(() => {
                this.animateXpBar();
                setTimeout(() => {
                    this.animateXpBar();
                    setTimeout(() => {
                        this.animateXpBar();
                        setTimeout(() => {
                            this.animateXpBar();
                            setTimeout(() => {
                                this.animateXpBar();
                            }, 1000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1500)
        }
    };

    goToNext = () => {
        this.props.navigation.push('OnboardingNotifications');
    };

    render() {
        if (!this.state.isReady) return null;

        const {character} = this.state;
        const {screenConfig} = this.props;

        return (
            <Swiper style={styles.container}
                    showsButtons={false}
                    loop={false}
                    activeDotColor={color.brandLight}
                    ref={el => this.swiper = el}
                    onIndexChanged={this.onSlideChange}>
                <View style={[styles.slide, styles.slide1]}>
                    <MaterialCommunityIcon name="map" style={styles.slideIcon}/>
                    <Text style={styles.slideTitle}>{screenConfig.slide1.title}</Text>
                    <Text style={styles.slideDescription}>{screenConfig.slide1.description}</Text>
                    <View style={styles.buttonContainer}>
                        <RNButton
                            color={color.brandLight}
                            title={"Got it"}
                            onPress={() => this.swiper.scrollBy(1)}
                        />
                    </View>
                </View>
                <View style={[styles.slide, styles.slide2]}>
                    <MaterialCommunityIcon name="trophy-variant" style={styles.slideIcon}/>
                    <Text style={styles.slideTitle}>{screenConfig.slide2.title}</Text>
                    <Text style={styles.slideDescription}>{screenConfig.slide2.description}</Text>
                    <View style={styles.buttonContainer}>
                        <RNButton
                            color={color.brandLight}
                            title={"Got it"}
                            onPress={() => this.swiper.scrollBy(1)}
                        />
                    </View>
                </View>
                <View style={[styles.slide, styles.slide3]}>
                    <Image source={{uri: character.imageUrl}}
                           style={{width: 125, height: 125, resizeMode: 'contain', marginBottom: 10}}/>
                    <View style={{width: 175}}>
                        <XpBar character={character}/>
                    </View>
                    <Text style={styles.slideTitle}>{screenConfig.slide3.title}</Text>
                    <Text style={styles.slideDescription}>{screenConfig.slide3.description}</Text>
                    <View style={styles.buttonContainer}>
                        <RNButton
                            color={color.brandLight}
                            title={"Got it"}
                            onPress={this.goToNext}
                        />
                    </View>
                </View>
            </Swiper>
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