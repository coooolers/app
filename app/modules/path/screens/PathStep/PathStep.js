import React from 'react';
import {ScrollView, TouchableOpacity, View, Text, Image, Alert, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';


import styles from "./styles";
import PathStepAudioPlayer from "../../components/PathStepAudioPlayer";

class PathStepScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    goBack = () => {
        this.props.navigation.pop();
    };

    onAudioLoad = () => {
    };

    onAudioComplete = () => {
        console.log("listen done!");
    };

    renderReward = (reward, index) => {
        if (reward.key === "xp") {
            return (
                <View key={index} style={styles.reward}>
                    <FontAwesome style={styles.trophyIcon}>{Icons.trophy}</FontAwesome>
                    <Text>{reward.value}</Text>
                </View>
            );
        } else if (reward.key === "term") {
            return (
                <View key={index} style={styles.reward}>
                    <FontAwesome style={styles.bookIcon}>{Icons.book}</FontAwesome>
                    <Text>{reward.value}</Text>
                </View>
            );
        }

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
                            onLoad={this.onAudioLoad}
                            onComplete={this.onAudioComplete}/>
                    </View>
                    <Text>REWARDS</Text>
                    <View style={styles.rewardsContainer}>
                        {step.rewards.map(this.renderReward)}
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PathStepScreen);