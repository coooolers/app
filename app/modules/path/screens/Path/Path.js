import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import styles from "./styles";
import PathStep from "../../components/PathStep/PathStep";
import CharacterPanel from "../../components/CharacterPanel/CharacterPanel";

class PathScreen extends React.Component {
    state = {
        steps: [
            {
                "name": "Introduction",
                "type": "audio",
                "description": "Welcome to the introduction to the beginner bodyweight path! Take a moment to listen and learn what you should expect.",
                "rewards": [
                    {"key": "xp", "value": 20}
                ],
                "uuid": "3c5449b3-936d-4253-8b89-49286c99e9eb",
                "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3"
            },
            {
                "name": "Strength Training",
                "type": "audio",
                "description": "Learn what \"Strength Training\" is and why it's so effective at keeping you strong and healthy.",
                "rewards": [
                    {"key": "xp", "value": 20},
                    {"key": "term", "value": 1}
                ],
                "uuid": "722a2286-7498-4849-8bdd-959675bad3f6",
                "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3"
            },
            {
                "name": "Introduction",
                "type": "audio",
                "description": "Welcome to the introduction to the beginner bodyweight path! Take a moment to listen and learn what you should expect.",
                "rewards": [
                    {"key": "xp", "value": 20}
                ],
                "uuid": "3c5449b4-936d-4253-8b89-49286c99e9eb",
                "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3"
            },
            {
                "name": "Strength Training",
                "type": "audio",
                "description": "Learn what \"Strength Training\" is and why it's so effective at keeping you strong and healthy.",
                "rewards": [
                    {"key": "xp", "value": 20},
                    {"key": "term", "value": 1}
                ],
                "uuid": "722a2284-7498-4849-8bdd-959675bad3f6",
                "audioUrl": "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3"
            }
        ]
    };


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
        if (step.type === "audio") {
            this.props.navigation.push("PathStepAudio", {
                step,
                path: {
                    name: "Beginner Bodyweight",
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/images%2Fwokouts%2Fwoman-bicycle-kick.jpg?alt=media&token=a1383899-2873-4bf6-b726-039f970daa7d"
                },
                onEarnedRewards: this.onEarnedRewards.bind(this)
            });
        }
    };

    render() {
        const {character, levelConfig} = this.props;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    {
                        this.state.steps.map((step, index) => {
                            return (
                                <PathStep
                                    key={step.uuid}
                                    step={step}
                                    showTopStatusBorder={index > 0}
                                    showBottomStatusBorder={index < this.state.steps.length - 1}
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