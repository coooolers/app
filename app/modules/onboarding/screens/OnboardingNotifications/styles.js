import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight,
        alignItems: 'center',
        padding: contentPadding
    },

    icon: {
        color: color.brandDark,
        fontSize: normalize(60),
        marginBottom: 20
    },

    title: {
        fontSize: fontSize.large,
        fontFamily: fontFamily.regular,
        color: color.brandDark,
        marginBottom: 40,
        textAlign: 'center',
    },

    top: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    dailyAtLabel: {
        fontSize: fontSize.large - 2,
        fontFamily: fontFamily.light,
        color: color.brandDark,
        paddingTop: 4,
        paddingBottom: 4
    },

    timeContainer: {
        padding: 4,
        flexDirection: 'row',
        backgroundColor: '#daecff',
        borderWidth: 1,
        borderColor: '#456f9c'
    },

    timeLabel: {
        fontSize: fontSize.large - 2,
        fontFamily: fontFamily.regular,
        color: '#456f9c',
        marginRight: 4
    },

    timeLabelIcon: {
        fontSize: normalize(14),
        color: '#456f9c',
        marginTop: 4
    },

    bottom: {
        alignItems: 'center',
        paddingBottom: 20
    },

    notNowLabel: {
        color: color.brandDark,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular
    }
});


export default styles;