import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.brandLight,
        marginBottom: contentPadding,
        width: normalize(185),
        marginRight: 20,
    },

    image: {
        width: normalize(185),
        height: normalize(105),
        borderColor: color.grey,
        borderWidth: 1,
        borderRadius: 5,
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