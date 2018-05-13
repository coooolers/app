import React from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Text} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import {updateUser} from "../../actions";
import Button from "../../../../components/Button";
import FormInput from "../../../../components/FormInput";
import FormLabel from "../../../../components/FormLabel";
import FormValidationMessage from "../../../../components/FormValidationMessage";
import styles from "./styles";

const GOALS = {
    LOSE_FAT: 'lose-fat',
    GET_FIT: 'get-fit',
    GAIN_MUSCLE: 'gain-muscle'
};

class OnboardingProfile extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: null,
            headerBackTitle: 'Profile',
            title: "Step 1 of 3"
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            name: props.user.name,
            goal: props.user.goal,
            errors: {}
        };
    }

    onChangeText = (key, text) => {
        this.setState({[key]: text});
    };

    setGoal = (goal) => {
        this.setState({goal});
    };

    onSubmit = () => {
        const errors = {};
        if (!this.state.name) {
            errors["name"] = "Please enter your name";
        }

        if (!this.state.goal) {
            errors["goal"] = "By choosing a goal we can personalize content that best suits you";
        }

        if (Object.keys(errors).length) {
            this.setState({errors});
            return;
        }

        this.setState({isFetching: true});
        const {name, goal} = this.state;
        const user = Object.assign({}, this.props.user, {name, goal});

        this.props.dispatch(updateUser(user)).then(() => {
            this.setState({isFetching: false});
            this.goToNext();
        });
    };

    goToNext = () => {
        this.props.navigation.push("OnboardingCreateCharacter");
    };

    renderGoalCheck = (goal) => {
        if (goal === this.state.goal) {
            return <FontAwesome style={styles.goalCheck}>{Icons.checkCircleO}</FontAwesome>;
        } else {
            return null;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 2}}>
                    <View>
                        <FormLabel>What is your name?</FormLabel>
                        <FormInput
                            clearButtonMode='while-editing'
                            underlineColorAndroid={"#fff"}
                            placeholder="John Smith"
                            autoFocus={false}
                            onChangeText={(text) => this.onChangeText("name", text)}
                            value={this.state.name}/>
                        <FormValidationMessage>{this.state.errors.name}</FormValidationMessage>
                    </View>
                    <View>
                        <FormLabel>What is your goal?</FormLabel>
                        <FormValidationMessage>{this.state.errors.goal}</FormValidationMessage>
                        <TouchableOpacity style={styles.goal}
                                          onPress={() => this.setGoal(GOALS.LOSE_FAT)}>
                            <FontAwesome style={styles.goalIcon}>{Icons.arrowCircleDown}</FontAwesome>
                            <Text style={styles.goalText}>Lose fat</Text>
                            {this.renderGoalCheck(GOALS.LOSE_FAT)}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.goal}
                                          onPress={() => this.setGoal(GOALS.GET_FIT)}>
                            <FontAwesome style={styles.goalIcon}>{Icons.heartO}</FontAwesome>
                            <Text style={styles.goalText}>Get fitter</Text>
                            {this.renderGoalCheck(GOALS.GET_FIT)}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.goal}
                                          onPress={() => this.setGoal(GOALS.GAIN_MUSCLE)}>
                            <FontAwesome style={styles.goalIcon}>{Icons.handRockO}</FontAwesome>
                            <Text style={styles.goalText}>Gain muscle mass</Text>
                            {this.renderGoalCheck(GOALS.GAIN_MUSCLE)}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Button title={"Create Character"}
                            onPress={this.onSubmit}
                            isFetching={this.state.isFetching}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(OnboardingProfile);