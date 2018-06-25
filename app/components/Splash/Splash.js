import React from 'react';
import {View, Animated, ActivityIndicator} from 'react-native';
import LogoIcon from "../../assets/images/logo-icon-red-small.png";
import styles from './styles';
import BackgroundImage from "../BackgroundImage";

export default class extends React.Component {
    state = {
        animateY: new Animated.Value(0)
    };

    componentDidMount() {
        this.animateIcon(10);
    }

    animateIcon = (toValue) => {
        const duration = 500;
        Animated.timing(this.state.animateY, {toValue, duration}).start();

        setTimeout(() => {
            this.animateIcon(-toValue);
        }, duration)

    };

    render() {
        return (
            <View style={styles.container}>
                <BackgroundImage color={"blue"}/>
                <Animated.Image style={[styles.image, {
                    transform: [{
                        translateY: this.state.animateY
                    }]
                }]} source={LogoIcon}/>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}