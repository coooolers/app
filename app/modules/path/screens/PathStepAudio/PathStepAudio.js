import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./styles";
import PathStepAudioPlayer from "../../components/PathStepAudioPlayer";
import Button from "../../../../components/Button/Button";
import {contentWidth} from "../../../../styles/theme";
import {REWARD_TYPES} from "../../constants";

class PathStepAudioScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
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
        const {step, path} = this.props.navigation.state.params;
        const {hasCompleted} = this.state;
        const rewardedIcon = hasCompleted ?
            <FontAwesome style={styles.rewardedIcon}>{Icons.checkCircleO}</FontAwesome> : null;

        return (
            <View style={styles.rewardsContainer}>
                <Text style={{fontWeight: 'bold'}}>REWARDS:</Text>
                <View style={{flexDirection: 'row'}}>
                    {step.rewards.map((r, i) => {
                        let icon = null;
                        let iconStyles = null;
                        let textStyles = styles.rewardText;

                        if (r.key === REWARD_TYPES.XP) {
                            iconStyles = styles.trophyIcon;
                            icon = Icons.trophy;
                        } else if (r.key === REWARD_TYPES.TERM) {
                            iconStyles = styles.bookIcon;
                            icon = Icons.book;
                        }

                        if (hasCompleted) {
                            iconStyles = StyleSheet.flatten([iconStyles, {color: '#999999'}]);
                            textStyles = StyleSheet.flatten([textStyles, {color: '#999999'}]);
                        }

                        return (
                            <View key={i} style={styles.reward}>
                                <FontAwesome style={iconStyles}>{icon}</FontAwesome>
                                <Text style={textStyles}>{r.value}</Text>
                                {rewardedIcon}
                            </View>
                        );
                    })}
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