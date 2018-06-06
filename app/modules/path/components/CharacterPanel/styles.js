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
    },

    rewardNotificationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 20
    },

    rewardNotificationContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: color.brandDark,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: color.brandLight
    }
});

export default styles;