import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight
    },

    /*
     * Top Container
     */
    topContainer: {
        backgroundColor: color.brandSuccess,
        padding: contentPadding,
        paddingBottom: contentPadding * 2,
        paddingTop: contentPadding * 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    congratulations: {
        color: color.brandLight,
        fontSize: fontSize.large + 5,
        fontFamily: fontFamily.regular,
    },

    starContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    star: {
        fontSize: normalize(50),
        color: color.brandLight,
        marginLeft: 5,
        marginRight: 5
    },

    /*
     * Middle Container
     */
    middleContainer: {
        flex: 1,
        padding: contentPadding,
        alignItems: 'center',
        backgroundColor: color.brandLight
    },

    youFinished: {
        color: color.brandDark,
        fontFamily: fontFamily.light,
        marginTop: 10,
        fontStyle: 'italic',
        textAlign: 'center'
    },

    stepName: {
        fontSize: fontSize.large + 2,
        fontFamily: fontFamily.medium,
        marginTop: 15,
    },

    pathName: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        marginTop: 5,
        marginLeft: 5
    },

    pathNameIcon: {
        fontSize: normalize(12)
    },

    rewardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    completedDate: {
        color: color.light_black,
        fontFamily: fontFamily.light,
        marginTop: 10,
        fontStyle: 'italic'
    }
});

export default styles;