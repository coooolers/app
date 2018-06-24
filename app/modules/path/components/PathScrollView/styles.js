import {StyleSheet} from 'react-native';
import {color, fontFamily, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    pathBox: {
        width: 100,
        height: 125,
        backgroundColor: color.brandLight,
        borderWidth: 1,
        borderColor: color.dark_grey,
        padding: 10,
        shadowColor: 'rgba(50, 50, 50, 0.2)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginRight: 10,
    },

    pathBoxTitle: {
        fontFamily: fontFamily.bold,
        fontSize: normalize(12)
    },

    newPathBox: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    newPathBoxTitle: {
        fontFamily: fontFamily.bold,
        fontSize: normalize(12),
        marginBottom: 10,
        textAlign: 'center'
    },

    newPathBoxIcon: {
        fontSize: 20
    }
});

export default styles;