import {StyleSheet} from 'react-native';
import {color} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    xpIcon: {
        color: color.brandPrimary,
        fontSize: 25,
        marginRight: 5
    },

    termIcon: {
        color: '#39a0ed',
        fontSize: 25,
        marginRight: 5
    },

    earnedIcon: {
        color: '#1b998b',
        fontSize: 20,
        position: 'absolute',
        left: -5,
        bottom: -5
    }
});

export default styles;