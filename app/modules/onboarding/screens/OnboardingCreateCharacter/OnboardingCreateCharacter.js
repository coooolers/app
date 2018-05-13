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
            headerBackTitle: 'Character',
            title: "Step 2 of 3",
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
        const errors = {};
        if (!this.state.character.name) {
            errors["name"] = "Come now, you can't be a nameless hero.";
        }

        if (!this.state.character.imageUrl) {
            errors["imageUrl"] = "Select an image to your liking";
        }

        if (Object.keys(errors).length) {
            this.setState({errors});
            return;
        }

        this.setState({isFetching: true});

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

        return (
            <View style={styles.container}>
                <Text style={styles.intro}>{this.props.user.name}, it's great to meet you! Take a moment to create your character below.</Text>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>My Character</Text>
                    <FormLabel>Name</FormLabel>
                    <FormValidationMessage>{this.state.errors.name}</FormValidationMessage>
                    <FormInput
                        autoCapitalize='none'
                        clearButtonMode='while-editing'
                        underlineColorAndroid={"#fff"}
                        placeholder="Name"
                        autoFocus={false}
                        onChangeText={(text) => this.onChangeText("name", text)}
                        inputStyle={styles.inputContainer}
                        value={character.name}/>
                    <FormLabel>Image</FormLabel>
                    <FormValidationMessage>{this.state.errors.imageUrl}</FormValidationMessage>
                    <CharacterImageScrollView character={character}
                                              onSelect={this.onCharacterImagePress}/>
                </View>
                <Button title={"Learn How To Play"} onPress={this.onSubmit} isFetching={isFetching}/>
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

export default connect(mapStateToProps)(OnboardingCreateCharacter);