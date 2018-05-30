import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';
import styles from "./styles";
import {round, secondsToMMSS} from "../../../../components/Util";
import Sound from "react-native-sound";

export default class PathStepAudioPlayer extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onLoad: PropTypes.func.isRequired,
        onComplete: PropTypes.func.isRequired,
    };

    state = {
        isReady: false,
        isPlaying: false,
        timeListened: secondsToMMSS(0),
        timeRemaining: null
    };

    componentWillMount() {
        this.audio = new Sound(this.props.url, null, (error) => {
            if (error) {
                Alert.alert("Error", error.message);
            }

            this.setState({
                timeListened: secondsToMMSS(0),
                timeRemaining: secondsToMMSS(round(this.audio.getDuration())),
                isReady: true
            });

            this.props.onLoad();
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
        const totalSeconds = round(this.audio.getDuration());

        this.setState({
            timeListened: secondsToMMSS(0),
            timeRemaining: secondsToMMSS(totalSeconds),
            isPlaying: false
        });

        this.cancelTimingInterval();
        this.props.onComplete();
    };

    onTimeChange = () => {
        const totalSeconds = round(this.audio.getDuration());
        this.audio.getCurrentTime((seconds) => {
            this.setState({
                timeListened: secondsToMMSS(round(seconds)),
                timeRemaining: secondsToMMSS(round(totalSeconds - seconds))
            });
        });
    };

    renderControls = () => {
        const {isPlaying} = this.state;

        if (isPlaying) {
            return (
                <View style={styles.controls}>
                    <TouchableOpacity>
                        <FontAwesome style={styles.rewind}>{Icons.backward}</FontAwesome>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.pause}>
                        <FontAwesome style={styles.play}>{Icons.pause}</FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome style={styles.forward}>{Icons.forward}</FontAwesome>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.controls}>
                    <TouchableOpacity>
                        <FontAwesome style={styles.rewind}>{Icons.backward}</FontAwesome>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.play}>
                        <FontAwesome style={styles.play}>{Icons.play}</FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome style={styles.forward}>{Icons.forward}</FontAwesome>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    render() {
        const {isReady, timeListened, timeRemaining} = this.state;

        if (!isReady) return null;

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{timeListened}</Text>
                    <Text>{timeRemaining}</Text>
                </View>
                {this.renderControls()}
            </View>
        )
    };
}