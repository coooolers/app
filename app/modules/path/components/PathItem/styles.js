import {StyleSheet} from 'react-native';
import {color, contentPadding, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: color.brandDark,
        borderTopWidth: 8,
        backgroundColor: color.white,
        padding: contentPadding,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
    },

    name: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: color.brandDark
    },

    difficulty: {
        fontSize: fontSize.small,
        color: color.brandDark
    },

    description: {
        fontSize: fontSize.small,
        color: color.dark_grey,
        marginTop: 10
    },

    hrule: {
        marginTop: normalize(20),
        marginBottom: normalize(5),
        borderTopWidth: 3,
        borderTopColor: color.brandDark,
        width: 40
    },

    progressLabel: {
        fontSize: normalize(16),
        color: color.dark_grey
    },

    progressTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressBottom: {
        marginTop: normalize(15),
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default styles;