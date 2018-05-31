import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import PathStep from "../../components/PathStep/PathStep";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";

class PathScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {path} = navigation.state.params;

        return {
            title: path.name
        };
    };

    onEarnedRewards = (step) => {
        console.log("earned rewards", step);
    };

    goToStep = (step) => {
        const {path} = this.props.navigation.state.params;
        if (step.type === "audio") {
            this.props.navigation.push("PathStepAudio", {
                step,
                path,
                onEarnedRewards: this.onEarnedRewards.bind(this)
            });
        }
    };

    render() {
        const {character, levelConfig, navigation} = this.props;
        const {path} = navigation.state.params;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    {
                        path.stepsOrder.map((stepKey, index) => {
                            const step = path.steps[stepKey];
                            return (
                                <PathStep
                                    key={step.uid}
                                    step={step}
                                    showTopStatusBorder={index > 0}
                                    showBottomStatusBorder={index < path.stepsOrder.length - 1}
                                    onSelect={this.goToStep}
                                />
                            );
                        })
                    }
                </ScrollView>
                <CharacterPanel character={character} levelConfig={levelConfig}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        character: state.characterReducer.character,
        levelConfig: state.levelConfigReducer.levelConfig
    };
}

export default connect(mapStateToProps)(PathScreen);