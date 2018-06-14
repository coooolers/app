import {StyleSheet} from 'react-native';
import {color, contentPadding, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: color.dark_grey,
        backgroundColor: color.brandLight,
        padding: contentPadding,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginBottom: contentPadding
    },

    name: {
        fontSize: fontSize.large,
        color: color.brandDark,
    },

    description: {
        fontSize: fontSize.small,
        color: color.dark_grey,
        marginTop: normalize(5)
    },

    hrule: {
        marginTop: normalize(20),
        marginBottom: normalize(5),
        borderTopWidth: 2,
        borderTopColor: color.brandDark,
        width: 40
    },

    progressLabel: {
        fontSize: fontSize.regular + 2,
        color: color.dark_grey
    },

    progressTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressBottom: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default styles;