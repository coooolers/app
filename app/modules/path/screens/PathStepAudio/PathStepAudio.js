import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Button as RNButton} from 'react-native';
import {connect} from 'react-redux';
import {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import PathStepAudioPlayer from "../../components/PathStepAudioPlayer";
import BackgroundImage from "../../../../components/BackgroundImage";
import Collapsible from 'react-native-collapsible';
import PathStepPanel from "../../components/PathStepPanel";
import {color} from "../../../../styles/theme";

class PathStepAudioScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {step, goBack} = navigation.state.params;

        return {
            headerLeft: <RNButton title={"Back"} onPress={() => goBack()}/>,
            headerTitle: step.name
        }
    };

    constructor(props) {
        super(props);

        const {pathProgress, navigation} = props;
        const {path, step} = navigation.state.params;

        const stepProgress = pathProgress && pathProgress[path.uid] && pathProgress[path.uid][step.uid];

        this.state = {
            hasCompleted: !!stepProgress,
            didEarnRewards: false,
            transcriptIsOpen: false
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goBack: this.goBack.bind(this)
        })
    }

    goBack = () => {
        const {step, onEarnedRewards} = this.props.navigation.state.params;

        this.props.navigation.goBack();

        if (this.state.didEarnRewards) {
            setTimeout(() => {
                onEarnedRewards(step)
            }, 500);
        }
    };

    onAudioComplete = () => {
        this.setState({
            hasCompleted: true,
            // offer rewards the first time a user completes this
            didEarnRewards: this.state.hasCompleted === false
        });
    };

    renderTranscript = () => {
        const {transcriptIsOpen} = this.state;
        const {step} = this.props.navigation.state.params;

        if (!step.transcript) return null;
        
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text>Transcript - </Text>
                    <TouchableOpacity onPress={() => this.setState({transcriptIsOpen: !transcriptIsOpen})}>
                        <Text style={{color: color.brandInfo}}>{transcriptIsOpen ? "close" : "open"}</Text>
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={!transcriptIsOpen}>
                    <View>
                        {
                            step.transcript.map((t, i) => {
                                return <Text key={i} style={styles.transcriptParagraph}>{t}</Text>
                            })
                        }
                    </View>
                </Collapsible>
            </View>
        );
    };

    render() {
        const {hasCompleted} = this.state;
        const {step, path} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PathStepPanel step={step} path={path} hasCompleted={hasCompleted} icon={Icons.headphones}>
                        <PathStepAudioPlayer
                            url={step.audioUrl}
                            onComplete={this.onAudioComplete}/>
                        {this.renderTranscript()}
                    </PathStepPanel>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid]
    };
}

export default connect(mapStateToProps)(PathStepAudioScreen);