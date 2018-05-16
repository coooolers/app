import {StyleSheet} from 'react-native';
import {theme} from "../../index"

const {padding, color, fontFamily, fontSize, normalize} = theme;

const xpBarWidth = 300;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.white,

    },

    content: {
        flex: 1,
        flexDirection: 'column',
        padding: padding,
        backgroundColor: color.white,
        alignItems: 'center',
    },

    banner: {
        height: 50,
        backgroundColor: color.brandPrimary,
        padding: 12
    },

    bannerTitle: {
        color: color.white,
        fontFamily: fontFamily.regular,
        fontSize: normalize(18),
        textAlign: 'center'
    },

    title: {
        textAlign: 'center',
        fontSize: normalize(25),
        marginTop: 10,
        marginBottom: 30
    },

    rewardText: {
        textAlign: 'center',
        fontSize: normalize(40),
        marginTop: 5
    },

    rewardIcon: {
        textAlign: 'center',
        fontSize: normalize(50),
    },

    image: {
        width: 120,
        height: 120,
        marginTop: 70,
        marginBottom: 10,
        resizeMode: 'contain'
    },

    level: {
        fontSize: normalize(25),
        fontFamily: fontFamily.bold
    },

    xpContainer: {
        flex: 1,
        flexDirection: 'column',
        width: xpBarWidth
    },

    xpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;