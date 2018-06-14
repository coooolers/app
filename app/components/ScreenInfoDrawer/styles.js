import {StyleSheet} from 'react-native';
import {
    color,
    fontSize,
    contentPadding
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
        alignItems: 'flex-start',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        padding: contentPadding,
        backgroundColor: color.brandLight
    },

    text: {
        color: color.brandDark,
        fontSize: fontSize.small,
        width: 250,
        marginTop: 7,
        lineHeight: 18
    },

    title: {
        color: color.brandDark,
        fontSize: fontSize.regular + 2,
        fontWeight: 'bold'
    },

    done: {
        color: color.brandPrimary,
        fontSize: fontSize.regular - 2,
        fontWeight: 'bold',
    },

    divider: {
        borderTopWidth: 1,
        borderTopColor: color.light_grey,
        width: '100%',
        marginTop: 12,
        marginBottom: 12
    }
});

export default styles;