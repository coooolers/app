import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import PathStepAudioPlayer from "../../components/PathStepAudioPlayer";
import Button from "../../../../components/Button/Button";
import {contentWidth} from "../../../../styles/theme";
import RewardList from "../../../../components/RewardList/RewardList";
import {getRewardsForStep} from "../../../../components/Util";

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

    renderRewards = () => {
        const {step} = this.props.navigation.state.params;
        const {hasCompleted} = this.state;

        return (
            <View style={styles.rewardsContainer}>
                <Text style={{fontWeight: 'bold'}}>REWARDS:</Text>
                <View style={{flexDirection: 'row'}}>
                    <RewardList rewardConfig={getRewardsForStep(step)} hasEarned={hasCompleted}/>
                </View>
            </View>
        );
    };

    render() {
        const {step, path} = this.props.navigation.state.params;

        return (
            <ImageBackground
                style={styles.container}
                source={{uri: path.imageUrl}}>

                <View style={styles.panel}>
                    <View style={styles.headerIconContainer}>
                        <FontAwesome style={styles.headerIcon}>{Icons.headphones}</FontAwesome>
                    </View>
                    <Text style={styles.title}>{step.name}</Text>
                    <Text style={styles.subTitle}>
                        <FontAwesome>{Icons.graduationCap}</FontAwesome> {path.name}
                    </Text>
                    <View style={styles.audioContainer}>
                        <PathStepAudioPlayer
                            url={step.audioUrl}
                            onComplete={this.onAudioComplete}/>
                    </View>
                </View>
                {this.renderRewards()}
                <Button title={"CLOSE"}
                        containerViewStyle={{
                            marginTop: 10,
                            width: contentWidth - 30
                        }}
                        buttonStyle={{
                            borderRadius: 0,
                            height: 45
                        }}
                        onPress={this.goBack}/>
            </ImageBackground>
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