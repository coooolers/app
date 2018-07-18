import {StyleSheet} from 'react-native';

import {theme} from "../../modules/auth/index"
import {contentPadding} from "../../styles/theme";

const {color, padding, windowWidth, normalize, fontSize, fontFamily} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        justifyContent: "center",
        alignItems: "center"
    },

    errorContainer: {
        width: '100%',
        backgroundColor: color.brandDanger,
        padding: contentPadding
    },

    errorText: {
        color: color.brandLight,
        width: '100%',
    },

    containerView: {
        marginVertical: padding * 3,
        width: '100%'
    },

    socialButton: {
        height: normalize(55),
        borderRadius: 4,
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

    forgotText: {
        textAlign: "center",
        color: color.black,
        marginBottom: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
    }
});


export default styles;