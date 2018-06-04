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
        color: color.brandInfo,
        fontSize: 25,
        marginRight: 5
    },

    exerciseIcon: {
        color: '#333333',
        fontSize: 25,
        marginRight: 5
    },

    workoutIcon: {
        color: color.brandDark,
        fontSize: 25,
        marginRight: 5
    },

    earnedIcon: {
        color: color.brandSuccess,
        fontSize: 20,
        position: 'absolute',
        left: -5,
        bottom: -5
    }
});

export default styles;