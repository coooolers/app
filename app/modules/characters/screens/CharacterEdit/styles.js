import {StyleSheet} from 'react-native';
import {theme} from "../../index"
import {contentPadding} from "../../../../styles/theme";

const {color, fontSize, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        padding: contentPadding,
        paddingTop: contentPadding * 3,
        backgroundColor: color.white
    },
    button: {
        backgroundColor: color.brandPrimary,
        height: normalize(55)
    },

    buttonText: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },
});

export default styles;