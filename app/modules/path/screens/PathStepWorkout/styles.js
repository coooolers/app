import {StyleSheet, PixelRatio} from 'react-native';
import {color, contentPadding, contentWidth, fontSize} from "../../../../styles/theme";

const headerIconSize = 36;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black,
        alignItems: 'center',
        justifyContent: 'center',
        padding: contentPadding
    },

    panel: {
        width: contentWidth - 30,
        backgroundColor: color.white,
        padding: contentPadding,
        alignItems: 'center',
        borderTopColor: color.brandPrimary,
        borderTopWidth: 10
    },

    headerIconContainer: {
        padding: 3,
        position: 'absolute',
        backgroundColor: color.brandPrimary,
        borderColor: '#333333',
        borderWidth: 1,
        width: headerIconSize,
        height: headerIconSize,
        borderRadius: headerIconSize / PixelRatio.get(),
        top: -(headerIconSize / 2) - 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerIcon: {
        color: color.white,
        fontSize: 27
    },

    title: {
        fontSize: fontSize.large
    },

    subTitle: {
        fontSize: fontSize.regular - 2
    },

    exerciseList: {
        width: '100%',
    },

    exerciseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderColor: color.brandDark,
        borderWidth: 1,
        backgroundColor: 'red',
        paddingRight: 5,
        height: 50,
    },

    exerciseImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    exerciseContent: {
        flex: 1,
        padding: 5,
    },

    rewardsContainer: {
        width: contentWidth - 30,
        backgroundColor: color.white,
        borderTopColor: color.black,
        borderTopWidth: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

export default styles;