import React from 'react';
import {Image} from 'react-native';
import PropTypes from "prop-types";
import styles from "./styles";
import RedImage from "../../assets/images/background-red.jpg";
import PurpleImage from "../../assets/images/background-purple.jpg";
import BlueImage from "../../assets/images/background-blue.jpg";
import YellowImage from "../../assets/images/background-yellow.jpg";
import GreenImage from "../../assets/images/background-green.jpg";

export default class BackgroundImage extends React.Component {
    static propTypes = {
        source: PropTypes.any,
        color: PropTypes.string
    };

    getSource = () => {
        const {source, color = ""} = this.props;

        if (source) {
            return source;
        } else if (color.toLowerCase() === "red") {
            return RedImage;
        } else if (color.toLowerCase() === "green") {
            return GreenImage;
        } else if (color.toLowerCase() === "blue") {
            return BlueImage;
        } else if (color.toLowerCase() === "purple") {
            return PurpleImage;
        } else if (color.toLowerCase() === "yellow") {
            return YellowImage;
        }
    };

    render() {
        return (
            <Image source={this.getSource()} style={styles.image}/>
        );
    }
}