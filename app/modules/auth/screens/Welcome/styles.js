import {StyleSheet} from 'react-native';
import {color, fontSize, fontFamily, normalize, contentWidth} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: 150,
        resizeMode: 'contain',
        marginBottom: 50
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
    }
});

export default styles;