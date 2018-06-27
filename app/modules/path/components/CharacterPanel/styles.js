import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, fontSize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#daecff',
        height: 70,
        padding: contentPadding,
        paddingTop: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#456f9c',
    },

    content: {
        width: '100%',
        flexDirection: 'row',
    },

    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10
    },

    xpContainer: {
        flex: 1
    },

    xpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    xpText: {
        fontSize: fontSize.small,
        fontFamily: fontFamily.light,
        color: color.brandDark
    },

    nameText: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        color: color.brandDark
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