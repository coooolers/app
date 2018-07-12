import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {createMyCharacter} from "../../../characters/actions";
import CharacterImageScrollView from "../../../characters/components/CharacterImageScrollView";
import styles from "./styles";
import Button from "../../../../components/Button/Button";
import FormLabel from "../../../../components/FormLabel/FormLabel";
import FormInput from "../../../../components/FormInput/FormInput";
import FormValidationMessage from "../../../../components/FormValidationMessage/FormValidationMessage";

class OnboardingCreateCharacter extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "My Character",
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            character: {},
            errors: {}
        };
    }

    onSubmit = () => {
        const {screenConfig} = this.props;
        const errors = {};

        if (!this.state.character.name) {
            errors["name"] = screenConfig.nameErrorRequired;
        }

        if (!this.state.character.imageUrl) {
            errors["imageUrl"] = screenConfig.imageErrorRequired;
        }

        if (Object.keys(errors).length) {
            this.setState({errors});
            return;
        }

        this.setState({isFetching: true, errors});

        const {user} = this.props;
        const {character} = this.state;

        this.props.dispatch(createMyCharacter(user, character.name, character.imageUrl))
            .then(() => {
                this.setState({isFetching: false});
                this.props.navigation.push('OnboardingHowItWorks');
            }, () => {
                this.setState({isFetching: false});
            });
    };

    onChangeText = (key, text) => {
        const character = Object.assign({}, this.state.character);
        character[key] = text;
        this.setState({character});
    };

    onCharacterImagePress = (imageUrl) => {
        const character = Object.assign({}, this.state.character, {imageUrl});
        this.setState({character});
    };

    render() {
        const {character, isFetching} = this.state;
        const {screenConfig} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hi there! Create your character to get started.</Text>
                <View style={{flex: 1}}>
                    <FormLabel>{screenConfig.nameLabel}</FormLabel>
                    <FormValidationMessage>{this.state.errors.name}</FormValidationMessage>
                    <FormInput
                        autoCapitalize='none'
                        clearButtonMode='while-editing'
                        underlineColorAndroid={"#fff"}
                        placeholder={screenConfig.namePlaceholder}
                        autoFocus={false}
                        onChangeText={(text) => this.onChangeText("name", text)}
                        inputStyle={styles.inputContainer}
                        value={character.name}/>
                    <FormLabel>{screenConfig.imageLabel}</FormLabel>
                    <FormValidationMessage>{this.state.errors.imageUrl}</FormValidationMessage>
                    <CharacterImageScrollView character={character}
                                              onSelect={this.onCharacterImagePress}/>
                </View>
                <Button title={screenConfig.buttonText}
                        onPress={this.onSubmit} isFetching={isFetching}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        screenConfig: state.screensReducer.screens.OnboardingCreateCharacter
    }
}

export default connect(mapStateToProps)(OnboardingCreateCharacter);