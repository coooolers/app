import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },

    content: {
        paddingLeft: contentPadding,
        paddingRight: contentPadding,
        paddingTop: contentPadding,
        paddingBottom: contentPadding
    },

    title: {
        color: '#3D3331',
        fontSize: 22,
        fontFamily: fontFamily.regular
    },

    description: {
        color: '#9B9B9B',
        fontFamily: fontFamily.regular,
        marginTop: 10,
        marginBottom: 10
    },

    image: {
        width: '100%',
        height: 225,
        resizeMode: 'cover'
    },

    stepsLabelContainer: {
        marginTop: 20,
        marginBottom: 8,
        borderBottomColor: color.brandDark,
        borderBottomWidth: 1,
        width: 50
    },

    stepsLabel: {
        color: color.brandDark,
        fontFamily: fontFamily.regular,
        fontSize: 16
    }
});

export default styles;