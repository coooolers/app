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

    constructor(props) {
        super(props);
        const {step} = props.navigation.state.params;
        this.state = {step};
    }
    goBack = () => {
        this.props.navigation.pop();
    };

    onAudioLoad = () => {
    };

    onAudioComplete = () => {
        console.log("listen done!");
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
                        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
                            <FontAwesome style={{color: 'white'}}>{Icons.close}</FontAwesome>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.body}>
                    <PathStepAudioPlayer
                        url={"https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3"}
                        onLoad={this.onAudioLoad}
                        onComplete={this.onAudioComplete}/>
                    <Text>REWARDS</Text>
                    <View style={styles.rewardsContainer}>
                        <View><FontAwesome>{Icons.trophy}</FontAwesome> 20</View>
                        <View><FontAwesome>{Icons.book}</FontAwesome> 1</View>
                    </View>
                </View>
                <ScrollView style={styles.footer}
                            showsVerticalScrollIndicator={false}
                            bounces={false}>
                    <Text>Met blandit neque accumsan ut. Mauris lobortis posuere urna et tempus. Sed hendrerit nunc
                        massa, sit amet commodo diam posuere sed. Nullam ut quam id nulla aliquam auctor ac non libero.
                        Donec mollis justo aliquet risus maximus dignissim vitae et tellus. In feugiat lectus in nulla
                        tempor, nec feugiat nisi egestas. Sed quis accumsan justo. Nullam porta sem blandit imperdiet
                        euismod. Fusce mattis lorem sed nisi convallis, at lobortis orci feugiat. Nulla molestie eu nunc
                        sit amet congue. Nullam vel lobortis mi. Suspendisse interdum mi
                        rutrum justo suscipit lacinia. Nullam malesuada est ante, a varius sem hendrerit nec. Aliquam
                        erat volutpat. Proin hendrerit eget nulla porta aliquet. Mauris eu nibh et turpis aliquet
                        elementum a
                        at nulla. Nam pretium tellus et tellus vehicula vestibulum. Vivamus malesuada justo ac sem
                        bibendum
                        maximus. Vestibulum dui massa, pulvinar at euismod non, aliquam quis nisi. Pellentesque pretium
                        a</Text>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PathStepScreen);