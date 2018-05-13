import {StyleSheet} from 'react-native';
import {contentPadding, fontFamily, normalize, padding, color} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomContainer: {
        flex: 1,
        padding: contentPadding,
        alignItems: 'center'
    },

    topContainer: {
        flex: 1,
        backgroundColor: color.brandPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    image: {
        resizeMode: 'contain',
        width: 200
    },

    title: {
        fontFamily: fontFamily.medium,
        fontSize: normalize(35),
        marginBottom: 20
    }
});

export default styles;