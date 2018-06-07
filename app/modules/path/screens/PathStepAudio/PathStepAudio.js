import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import PathStepAudioPlayer from "../../components/PathStepAudioPlayer";
import BackgroundImage from "../../../../components/BackgroundImage";
import PathStepPanel from "../../components/PathStepPanel";

class PathStepAudioScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {step} = navigation.state.params;

        return {
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
            didEarnRewards: false
        };
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

    render() {
        const {hasCompleted} = this.state;
        const {step, path} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <PathStepPanel step={step} path={path} hasCompleted={hasCompleted} icon={Icons.headphones}>
                    <PathStepAudioPlayer
                        url={step.audioUrl}
                        onComplete={this.onAudioComplete}/>
                </PathStepPanel>
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