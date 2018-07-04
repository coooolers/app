import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, Button as RNButton} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import {fetchMyCharacter} from "../../../characters/actions";
import {updateUser} from "../../actions";
import {goToMainTabRoute} from "../../../../components/Util";
import Swiper from 'react-native-swiper';
import XpBar from "../../../../components/XpBar/XpBar";
import {Character} from "../../../characters/models";
import {color} from "../../../../styles/theme";

const createCharacterPlaceholder = () => {
    return new Character("1234", {}, "Vikeen", "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/images%2Fcharacters%2Fcharacter-elf-male-fighter.png?alt=media&token=4d0b605d-e314-4c52-a152-beb79dc922e8");
};

class OnboardingHowItWorks extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            character: createCharacterPlaceholder(),
            isReady: false
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchMyCharacter(this.props.user)).then(() => {
            this.setState({isReady: true});
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
                character: createCharacterPlaceholder()
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
        const {character} = this.state;
        const {screenConfig} = this.props;
        if (!this.state.isReady) return null;

        return (
            <Swiper style={styles.container}
                    showsButtons={false}
                    loop={false}
                    activeDotColor={color.brandLight}
                    ref={el => this.swiper = el}
                    onIndexChanged={this.onSlideChange}>
                <View style={[styles.slide, styles.slide1]}>
                    <FontAwesome style={styles.slideIcon}>{Icons.map}</FontAwesome>
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
                    <FontAwesome style={styles.slideIcon}>{Icons.trophy}</FontAwesome>
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