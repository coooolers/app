import {StyleSheet} from 'react-native';
import {color, fontSize, fontFamily, normalize, contentWidth, contentPadding} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 120,
        resizeMode: 'contain',
        marginBottom: 100
    },

    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 40,
    },

    separatorText: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: color.brandLight,
        marginLeft: 20,
        marginRight: 20
    },

    separatorLine: {
        width: 85,
        borderColor: color.brandLight,
        borderWidth: 1,
        height: 2,
        borderRadius: 5
    },

    //===============================

    containerView: {
        width: contentWidth
    },

    socialButton: {
        height: normalize(55),
        borderRadius: 0,
        marginTop: 0,
        marginBottom: 0
    },

    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(55)
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    forgotPasswordText: {
        color: color.brandLight,
        fontSize: 14,
        fontFamily: fontFamily.regular,
        textAlign: 'center',
        marginTop: 15
    }
});

export default styles;