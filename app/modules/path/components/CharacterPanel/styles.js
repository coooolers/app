import {StyleSheet} from 'react-native';
import {color, contentPadding} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },

    background: {
        padding: contentPadding,
        paddingBottom: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.light_black
    },

    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },

    xpContainer: {
        flex: 1
    },

    xpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default styles;