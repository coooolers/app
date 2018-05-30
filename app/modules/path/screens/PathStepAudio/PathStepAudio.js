import React from 'react';
import {TouchableOpacity, Image, View, Text, ImageBackground, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';


import styles from "./styles";
import PathStepAudioPlayer from "../../components/PathStepAudioPlayer";

class PathStepAudioScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            hasCompleted: false,
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
            didEarnRewards: this.state.hasCompleted === false // offer rewards the first time a user completes this
        });
    };

    renderRewards = () => {
        const {step, path} = this.props.navigation.state.params;
        const {hasCompleted} = this.state;
        const rewardedIcon = hasCompleted ?
            <FontAwesome style={styles.rewardedIcon}>{Icons.checkCircleO}</FontAwesome> : null;
        const containerStyles = hasCompleted ?
            StyleSheet.flatten([styles.rewardsContainer, {borderColor: '#999999'}]) : styles.rewardsContainer;

        return (
            <View style={containerStyles}>
                {step.rewards.map((r, i) => {
                    let icon = null;
                    let iconStyles = null;
                    let textStyles = styles.rewardText;

                    if (r.key === "xp") {
                        iconStyles = styles.trophyIcon;
                        icon = Icons.trophy;
                    } else if (r.key === "term") {
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
                        </View>
                    );
                })}
                {rewardedIcon}
            </View>
        );
    };

    render() {
        const {step, path} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.header}
                    source={{uri: path.imageUrl}}>

                    <View style={styles.headerContent}>
                        <Text style={styles.title}>{step.name}</Text>
                        <Text style={styles.subTitle}>
                            <FontAwesome>{Icons.graduationCap}</FontAwesome> {path.name}
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
                            <FontAwesome style={styles.closeIcon}>{Icons.close}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.body}>
                    <View style={styles.audioContainer}>
                        <PathStepAudioPlayer
                            url={step.audioUrl}
                            onComplete={this.onAudioComplete}/>
                    </View>
                    <Text>REWARDS</Text>
                    {this.renderRewards()}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
    };
}

export default connect(mapStateToProps)(PathStepAudioScreen);