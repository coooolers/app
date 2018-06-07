import {StyleSheet, PixelRatio} from 'react-native';
import {color, contentPadding, contentWidth, fontSize} from "../../../../styles/theme";

const headerIconSize = 36;
const headerIconSpacing = (headerIconSize / 2);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    panel: {
        width: contentWidth - 30,
        backgroundColor: color.white,
        padding: contentPadding,
        alignItems: 'center',
        borderTopColor: color.brandPrimary,
        borderTopWidth: 10,
        marginTop: headerIconSpacing - 5,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
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
        top: -headerIconSpacing - 5,
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

    exerciseContainer: {
        width: '100%',
        marginTop: 10
    },

    rewardsContainer: {
        width: '100%',
        marginTop: 10,
        backgroundColor: color.white,
        borderTopColor: color.grey,
        borderTopWidth: 1,
        padding: 5,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default styles;