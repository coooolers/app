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
import Button from "../../../../components/Button/Button";
import ScreenInfoDrawer from "../../../../components/ScreenInfoDrawer";
import Reporting from "../../../reporting";
import {isPathStepComplete} from "../../../../components/Util";


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

        this.state = {
            hasCompleted: isPathStepComplete(path, step, pathProgress),
            transcriptIsOpen: false
        };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            goBack: this.goBack.bind(this)
        });

        // TODO: remove done testing new scree
        // const {path, step} = this.props.navigation.state.params;
        // this.props.navigation.navigate('PathStepAudioReward', {
        //     path,
        //     step,
        //     didEarnRewards: this.state.hasCompleted === false
        // });
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    onAudioComplete = () => {
        const {path, step} = this.props.navigation.state.params;
        this.props.navigation.navigate('PathStepAudioReward', {path, step});
    };

    renderTranscript = () => {
        const {transcriptIsOpen} = this.state;
        const {step} = this.props.navigation.state.params;

        if (!step.transcript) return null;

        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>Transcript - </Text>
                    <TouchableOpacity onPress={() => this.setState({transcriptIsOpen: !transcriptIsOpen})}>
                        <Text style={{color: color.brandInfo, fontWeight: 'bold'}}>
                            {transcriptIsOpen ? "close" : "read more..."}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={!transcriptIsOpen} collapsedHeight={30}>
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
        const {screenConfig} = this.props;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <ScreenInfoDrawer uid={"path-step-audio"}
                                  title={screenConfig.infoDrawerTitle}
                                  text={screenConfig.infoDrawerText}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PathStepPanel step={step} path={path}
                                   hasCompleted={hasCompleted}
                                   icon={Icons.headphones}>
                        <PathStepAudioPlayer
                            url={step.audioUrl}
                            onComplete={this.onAudioComplete}
                            onRelease={(totalSecondsListened, listenComplete) => {
                                Reporting.track("path_step_audio_listened", {
                                    pathUid: path.uid,
                                    stepUid: step.uid,
                                    duration: totalSecondsListened,
                                    complete: listenComplete
                                });
                            }}
                        />
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
        pathProgress: state.userPathProgressReducer.byId[state.authReducer.user.uid] || {},
        screenConfig: state.screensReducer.screens.PathStepAudio
    };
}

export default connect(mapStateToProps)(PathStepAudioScreen);
