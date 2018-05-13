import {StyleSheet} from 'react-native';
import {padding, color, fontSize, fontFamily, windowWidth, normalize, contentWidth} from "../../styles/theme";

const styles = StyleSheet.create({
    containerView: {
        width: contentWidth,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
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