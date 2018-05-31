import React from 'react';
import {View, Text, TouchableOpacity, Alert, Slider} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';
import styles from "./styles";
import {round, secondsToMMSS} from "../../../../components/Util";
import Sound from "react-native-sound";
import {color} from "../../../../styles/theme";

export default class PathStepAudioPlayer extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onLoad: PropTypes.func,
        onComplete: PropTypes.func.isRequired,
    };

    state = {
        isReady: false,
        isPlaying: false,
        timeListened: 0,
        timeRemaining: 0
    };

    componentWillMount() {
        this.audio = new Sound(this.props.url, null, (error) => {
            if (error) {
                Alert.alert("Error", error.message);
            }

            this.setState({
                timeListened: 0,
                timeRemaining: this.audio.getDuration(),
                isReady: true
            });

            if (this.props.onLoad) this.props.onLoad();
        });
    }

    componentWillUnmount() {
        if (this.audio) this.audio.release();
        this.cancelTimingInterval();
    }

    play = () => {
        this.setState({isPlaying: true});

        this.timingInterval = setInterval(this.onTimeChange, 250);

        this.audio.play(this.onAudioComplete);
    };

    pause = () => {
        this.audio.pause();
        this.setState({isPlaying: false});
        this.cancelTimingInterval();
    };

    cancelTimingInterval = () => {
        if (this.timingInterval) clearInterval(this.timingInterval);
    };

    onAudioComplete = () => {
        this.setState({
            timeListened: 0,
            timeRemaining: this.audio.getDuration(),
            isPlaying: false
        });

        this.cancelTimingInterval();
        this.props.onComplete();
    };

    onTimeChange = () => {
        this.audio.getCurrentTime((seconds) => {
            this.setState({
                timeListened: seconds,
                timeRemaining: this.audio.getDuration() - seconds
            });
        });
    };

    onSlidingComplete = (seconds) => {
        this.audio.setCurrentTime(seconds);
        this.play();
    };

    onSliderChange = (seconds) => {
        const {isPlaying} = this.state;

        if (isPlaying) this.pause();

        this.setState({
            timeListened: seconds,
            timeRemaining: this.audio.getDuration() - seconds
        });
    };

    renderPlayButton = () => {
        const {isPlaying} = this.state;

        if (isPlaying) {
            return (
                <TouchableOpacity onPress={this.pause}>
                    <FontAwesome style={styles.play}>{Icons.pause}</FontAwesome>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.play}>
                    <FontAwesome style={styles.play}>{Icons.play}</FontAwesome>
                </TouchableOpacity>
            );
        }
    };

    render() {
        const {isReady, timeListened, timeRemaining} = this.state;

        if (!isReady) return null;

        return (
            <View style={styles.container}>
                <Slider style={styles.bar}
                        value={timeListened}
                        onSlidingComplete={this.onSlidingComplete}
                        onValueChange={this.onSliderChange}
                        minimumValue={0}
                        minimumTrackTintColor={color.brandPrimary}
                        maximumValue={this.audio.getDuration()}

                />
                <View style={styles.timerContainer}>
                    <Text style={styles.timingText}>{secondsToMMSS(round(timeListened))}</Text>
                    <Text style={styles.timingText}>{secondsToMMSS(round(timeRemaining))}</Text>
                </View>
                <View style={styles.controls}>
                    {this.renderPlayButton()}
                </View>
            </View>
        )
    };
}