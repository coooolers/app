import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight,
    },

    rowContainer: {
        height: 80,
        borderBottomWidth: 1,
        borderColor: color.grey,
        padding: contentPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    rowTitle: {
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
        color: color.brandDark
    },

    rowIcon: {
        fontSize: normalize(25),
        color: color.brandDark
    }
});

export default styles;