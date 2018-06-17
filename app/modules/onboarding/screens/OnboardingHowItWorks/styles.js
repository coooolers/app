import {StyleSheet} from 'react-native';
import {theme} from "../../index";
import {contentPadding, contentWidth, fontSize, normalize} from "../../../../styles/theme";
const {color} = theme;

const styles = StyleSheet.create({
    container: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: contentPadding,
    },

    slide1: {
        backgroundColor: color.brandPrimary,
    },

    slide2: {
        backgroundColor: color.brandInfo,
    },

    slide3: {
        backgroundColor: color.brandSuccess,
    },

    text: {

    },

    slideIcon: {
        fontSize: 100,
        color: color.brandLight,
    },

    slideTitle: {
        textAlign: 'center',
        fontSize: 30,
        color: color.brandLight,
        marginTop: 50,
    },

    slideDescription: {
        fontSize: fontSize.regular,
        textAlign: 'center',
        color: color.light_grey,
        marginTop: 20
    },

    buttonContainer: {
        borderWidth: 1,
        borderColor: color.brandLight,
        // paddingTop: 5,
        // paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 50
    }
});


export default styles;