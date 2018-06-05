import {StyleSheet} from 'react-native';
import {padding, color, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: padding,
        backgroundColor: color.white
    },

    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        resizeMode: 'contain'
    },

    name: {
        fontSize: normalize(30),
        fontFamily: fontFamily.regular
    },

    quantity: {
        fontSize: normalize(70),
        fontFamily: fontFamily.bold,
        marginTop: 20
    },

    containerView: {
        marginVertical: 20,
        width: 200
    },

    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(45),
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    inputSection: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    icon: {
        fontSize: fontSize.large,
        marginBottom: 15
    }
});

export default styles;