import {StyleSheet} from 'react-native';
import {color, contentPadding, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: color.brandDark,
        borderTopWidth: 8,
        backgroundColor: color.white,
        padding: contentPadding
    },

    name: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: color.brandDark
    },

    difficulty: {
        fontSize: normalize(13),
        color: color.brandDark
    },

    description: {
        fontSize: normalize(13),
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