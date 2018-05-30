import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import FontAwesome, {Icons} from "react-native-fontawesome";
import PropTypes from 'prop-types';
import styles from "./styles";
import {round} from "../../../../components/Util";
import Sound from "react-native-sound/index";

export default class PathStepAudioPlayer extends React.Component {
    static propTypes = {
        url: PropTypes.func.isRequired,
        onLoad: PropTypes.func.isRequired,
        onComplete: PropTypes.func.isRequired,
    };

    state = {
        isPlaying: false
    };

    componentWillMount() {
        const {step} = this.props.navigation.state.params;
        const audio = new Sound(this.props.url, null, (error) => {
            if (error) {
                Alert.alert("Error", error.message);
            }

            this.setState({
                audio,
                step,
                isReady: true
            });

            this.props.onLoad();
        });
    }

    componentWillUnmount() {
        if (this.state.audio) {
            this.state.audio.release();
        }
    }

    play = () => {
        this.setState({isPlaying: true});

        this.state.audio.play(() => {
            this.setState({isPlaying: false});
            this.props.onComplete();
        });
    };

    pause = () => {
        this.state.audio.pause();
        this.setState({isPlaying: false});
    };

    renderControls = () => {
        const {isPlaying} = this.state;

        if (isPlaying) {
            return (
                <View style={styles.audioControls}>
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
                <View style={styles.audioControls}>
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
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>{'0:00'}</Text>
                    <Text>{round(audio.getDuration(), 2)}</Text>
                </View>
                {this.renderControls()}
            </View>
        )
    };
}