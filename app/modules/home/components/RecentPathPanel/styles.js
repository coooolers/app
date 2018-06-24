import {StyleSheet} from 'react-native';
import {theme} from "../../index";
import {contentPadding} from "../../../../styles/theme";

const {color, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        height: 225,
        backgroundColor: color.brandPrimary,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.dark_grey
    },

    content: {
        padding: contentPadding
    },

    status: {
        color: color.brandLight,
        fontFamily: fontFamily.regular,
        fontSize: normalize(14),
        marginTop: 50
    },

    title: {
        color: color.brandLight,
        fontSize: normalize(24),
        fontFamily: fontFamily.bold,
        marginTop: 5
    },

    buttonContainer: {
        marginTop: 25,
        marginLeft: 0,
        paddingLeft: 0
    },

    button: {
        backgroundColor: color.light_grey,
        borderColor: color.grey,
        borderWidth: 1,
        borderRadius: 20,
        width: 120,
        height: 30,
        padding: 0
    },

    buttonTitle: {
        color: '#555',
        fontFamily: fontFamily.bold,
        fontSize: normalize(14),
    },

    progress: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});

export default styles;