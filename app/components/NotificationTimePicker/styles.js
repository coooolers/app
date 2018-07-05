import {StyleSheet} from 'react-native';
import {
    color,
    fontSize,
    contentPadding, fontFamily, normalize
} from "../../styles/theme";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },

    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: color.brandLight
    },

    timeContainer: {
        padding: 4,
        flexDirection: 'row',
        backgroundColor: '#daecff',
        borderWidth: 1,
        borderColor: '#456f9c'
    },

    timeLabel: {
        fontSize: fontSize.large - 2,
        fontFamily: fontFamily.regular,
        color: '#456f9c',
        marginRight: 4
    },

    timeLabelIcon: {
        fontSize: normalize(14),
        color: '#456f9c',
        marginTop: 4
    },
});

export default styles;