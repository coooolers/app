import {StyleSheet} from 'react-native';
import {color, fontFamily, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: color.light_grey,
        borderWidth: 1,
        padding: 5
    },

    itemContent: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },

    itemImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },

    itemName: {
        fontSize: normalize(16),
        fontFamily: fontFamily.light
    },

    itemLabel: {
        fontSize: normalize(14),
        fontFamily: fontFamily.light
    },

    itemIcon: {
        fontSize: normalize(23),
        color: color.dark_grey
    }
});

export default styles;