import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.brandLight,
        marginBottom: contentPadding,
        width: normalize(185)
    },

    imageContainer: {
        width: normalize(185),
        height: normalize(105),
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 1,
        shadowRadius: 1,
    },

    image: {
        width: normalize(185),
        height: normalize(105),
        resizeMode: 'cover'
    },

    title: {
        fontSize: normalize(16),
        fontFamily: fontFamily.regular,
        color: '#4A4A4A',
        marginTop: 10,
        marginBottom: 4
    },

    steps: {
        fontSize: normalize(12),
        fontFamily: fontFamily.light
    }
});

export default styles;