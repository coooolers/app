import {StyleSheet} from 'react-native';
import {color, contentPadding, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight
    },

    navigation: {
        padding: contentPadding
    },

    navigationItem: {
        width: 60,
        height: 60,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: color.light_grey,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navigationItemActive: {
        borderBottomWidth: 2,
        borderBottomColor: color.brandPrimary
    },

    navigationItemCompletedIcon: {
        position: 'absolute',
        fontSize: normalize(20),
        color: color.brandSuccess,
        bottom: 0,
        left: 0,
        zIndex: 1,
    },

    navigationItemFailedIcon: {
        position: 'absolute',
        fontSize: normalize(20),
        color: color.brandDanger,
        bottom: 0,
        left: 0,
        zIndex: 1,
    },

    navigationImage: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    },

    content: {
        flex: 1
    }
});

export default styles;