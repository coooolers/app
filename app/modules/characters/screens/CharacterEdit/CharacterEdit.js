import React from 'react';
import {View, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import styles from "./styles";
import {updateCharacter} from "../../actions";
import CharacterImageScrollView from "../../components/CharacterImageScrollView";
import FormLabel from "../../../../components/FormLabel/FormLabel";
import FormInput from "../../../../components/FormInput/FormInput";

class CharacterEdit extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {cancel, save} = navigation.state.params || {};

        return {
            headerTitle: "Character",
            headerLeft: <RNButton onPress={() => cancel()} title="Cancel"/>,
            headerRight: <RNButton onPress={() => save()} title="Done"/>
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            character: props.character
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            cancel: this.goToHome.bind(this),
            save: this.onSubmit.bind(this)
        });
    }

    goToHome = () => {
        this.props.navigation.navigate('Home');
    };

    onSubmit = () => {
        const {character} = this.state;

        this.props.dispatch(updateCharacter(character)).then(() => {
            this.goToHome();
        }, () => {
            this.dropdown.alertWithType('error', 'Oops! Something got messed up', "");
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
        const {character} = this.state;

        return (
            <View style={styles.container}>
                <DropdownAlert ref={ref => this.dropdown = ref} zIndex={1000}/>
                <FormLabel>Name</FormLabel>
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
                <CharacterImageScrollView character={character}
                                          onSelect={this.onCharacterImagePress}/>
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

export default connect(mapStateToProps)(CharacterEdit);