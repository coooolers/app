import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import LogoIcon from "../../assets/images/white-logo-icon-transparent.png";

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={LogoIcon}/>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}