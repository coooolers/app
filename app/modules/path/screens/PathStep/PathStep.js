import React from 'react';
import {ScrollView, TouchableOpacity, View, Text, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import Video from "react-native-video";

import styles from "./styles";

class PathStepScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    };

    constructor(props) {
        super(props);
        const {step} = props.navigation.state.params;
        this.state = {step};
    }

    onBuffer = () => {
      console.log("buffering", arguments);
    };

    onEnd = () => {
        console.log("on end", arguments);
    };

    videoError = () => {
        console.log("on error", arguments);
    };

    loadStart = () => {
        console.log("on load start", arguments);
    };

    setDuration = () => {
        console.log("set duration", arguments);
    };

    setTime = () => {
        console.log("set time", arguments);
    };

    onTimedMetadata = () => {
        console.log("onTimedMetadata", arguments);
    };

    render() {
        const {step} = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.header}
                    source={{uri: "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/images%2Fwokouts%2Fwoman-bicycle-kick.jpg?alt=media&token=a1383899-2873-4bf6-b726-039f970daa7d"}}>

                    <View style={styles.headerContent}>
                        <Text style={styles.title}>{step.name}</Text>
                        <Text style={styles.subTitle}>
                            <FontAwesome>{Icons.graduationCap}</FontAwesome> Beginner Bodyweight
                        </Text>
                        <TouchableOpacity style={styles.closeButton}>
                            <FontAwesome style={{color: 'white'}}>{Icons.close}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.body}>
                    <View style={styles.audioPlayer}>
                        <Video source={{uri: "https://firebasestorage.googleapis.com/v0/b/pursoo-f1e1d.appspot.com/o/audio%2Fmpthreetest.mp3?alt=media&token=a1d1c1cf-d749-4543-8e85-6a482689661c"}}   // Can be a URL or a local file.
                               poster="https://baconmockup.com/300/200/"
                               ref={(ref) => {
                                   this.player = ref
                               }}                                      // Store reference
                               rate={1.0}
                               volume={1.0}
                               resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                               onBuffer={this.onBuffer}                // Callback when remote video is buffering
                               onEnd={this.onEnd}                      // Callback when playback finishes
                               onError={this.videoError}               // Callback when video cannot be loaded
                               onLoadStart={this.loadStart}            // Callback when video starts to load
                               onLoad={this.setDuration}               // Callback when video loads
                               onProgress={this.setTime}               // Callback every ~250ms with currentTime
                               onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                        />
                    </View>
                    <View style={styles.audioControls}>
                        <TouchableOpacity>
                            <FontAwesome style={styles.rewind}>{Icons.backward}</FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome style={styles.play}>{Icons.play}</FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome style={styles.forward}>{Icons.forward}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <Text>REWARDS</Text>
                    <View style={styles.rewardsContainer}>
                        <View><FontAwesome>{Icons.trophy}</FontAwesome> 20</View>
                        <View><FontAwesome>{Icons.book}</FontAwesome> 1</View>
                    </View>
                </View>
                <ScrollView style={styles.footer}
                            showsVerticalScrollIndicator={false}
                            bounces={false}>
                    <Text>Met blandit neque accumsan ut. Mauris lobortis posuere urna et tempus. Sed hendrerit nunc massa, sit
                    amet commodo diam posuere sed. Nullam ut quam id nulla aliquam auctor ac non libero. Donec mollis
                    justo aliquet risus maximus dignissim vitae et tellus. In feugiat lectus in nulla tempor, nec
                    feugiat nisi egestas. Sed quis accumsan justo.
                        Nullam porta sem blandit imperdiet euismod. Fusce mattis lorem sed nisi convallis, at lobortis orci
                    feugiat. Nulla molestie eu nunc sit amet congue. Nullam vel lobortis mi. Suspendisse interdum mi
                    rutrum justo suscipit lacinia. Nullam malesuada est ante, a varius sem hendrerit nec. Aliquam erat
                    volutpat. Proin hendrerit eget nulla porta aliquet. Mauris eu nibh et turpis aliquet elementum a at
                    nulla. Nam pretium tellus et tellus vehicula vestibulum. Vivamus malesuada justo ac sem bibendum
                    maximus. Vestibulum dui massa, pulvinar at euismod non, aliquam quis nisi. Pellentesque pretium a
                    lectus at molestie. Donec sem leo, vestibulum non efficitur eu, egestas vel risus.
                        Nullam ut aliquam purus, ut tincidunt mi. Nullam ac viverra nunc, eget pulvinar lacus. Nulla ac enim
                    scelerisque, condimentum lacus at, finibus sem. Morbi fringilla porttitor dolor, sed vestibulum
                    neque vehicula vitae. Mauris quam sem, auctor sit amet urna sed, pulvinar auctor diam. Integer
                    pulvinar ligula purus, at pulvinar sem suscipit at. Aliquam erat volutpat. Integer ligula quam,
                    tristique condimentum erat at, sodales aliquet neque. Maecenas at viverra magna.
                        Donec vulputate vestibulum diam vel maximus. Pellentesque eu viverra ex, et semper est. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Proin vehicula nisi turpis, et feugiat tortor molestie
                    venenatis. Morbi massa ex, tristique eget quam vulputate, ultrices sagittis odio. Sed accumsan
                    fermentum magna, eget gravida diam fringilla a. Praesent aliquet magna libero, ac imperdiet dui
                    semper at. Vestibulum non hendrerit est. Cras commodo tortor vel nisi feugiat pharetra eu vitae
                    ipsum. Quisque scelerisque scelerisque massa id bibendum. Proin et justo ut nulla molestie sagittis
                    at ac ipsum. Duis eu molestie ligula. Cras sed felis id elit ultrices vestibulum in vel ex.
                    Curabitur porta tempor ex et efficitur. Maecenas diam augue, vestibulum in enim sit amet, varius
                    sollicitudin nisi. Integer magna arcu, pretium vulputate metus sit amet, facilisis faucibus nibh.
                        Maecenas sed eros vel tortor pulvinar aliquam. Nulla non sapien sed magna congue varius feugiat eget
                    urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Pellentesque eleifend bibendum dolor sed mattis. Cras consequat urna sit amet magna ornare, in
                    maximus ante bibendum. Maecenas vel quam id dui malesuada vulputate. Sed dictum aliquet risus, sit
                    amet sagittis libero elementum eu. Sed volutpat congue rhoncus. Morbi tellus risus, facilisis et
                    convallis vitae, congue non justo. Nam mattis efficitur quam eu hendrerit. Nunc vel eros ante.
                    Mauris congue, diam ac ultricies pellentesque, dui ex elementum mauris, sit amet maximus velit
                    libero ut tellus</Text>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PathStepScreen);