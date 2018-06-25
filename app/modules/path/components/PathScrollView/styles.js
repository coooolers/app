import {StyleSheet} from 'react-native';
import {color, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },

    pathBox: {
        width: 100,
        height: 125,
        backgroundColor: '#FCEFE7',
        borderWidth: 1,
        borderColor: '#A1958E',
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

    pathBoxStatus: {
        fontFamily: fontFamily.light,
        fontSize: fontSize.small,
        marginTop: 5,
        marginBottom: 5
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