import {StyleSheet, PixelRatio} from 'react-native';
import {color, contentPadding, contentWidth, fontSize} from "../../../../styles/theme";

const headerIconSize = 36;
const headerIconSpacing = (headerIconSize / 2);

const styles = StyleSheet.create({
    container: {
        width: contentWidth - 30,
        backgroundColor: color.white,
        padding: contentPadding,
        alignItems: 'center',
        borderTopColor: color.brandPrimary,
        borderTopWidth: 10,
        marginTop: headerIconSpacing - 5,
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 1,
        shadowRadius: 1
    },

    iconContainer: {
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

    icon: {
        color: color.white,
        fontSize: 27
    },

    header: {
        width: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: fontSize.large
    },

    subTitle: {
        fontSize: fontSize.regular - 2
    },

    body: {
        width: '100%',
        marginTop: 10
    },

    footer: {
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