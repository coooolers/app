import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, fontSize, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    content: {
        padding: contentPadding
    },

    category: {
        marginTop: 10,
        marginBottom: 40
    },

    categoryTitle: {
        fontSize: normalize(12),
        fontFamily: fontFamily.regular,
        color: '#4A4A4A',
        marginBottom: 15
    },

    categoryDivider: {
        height: 2,
        borderTopWidth: 2,
        borderTopColor: color.light_grey,
        width: '100%'
    }
});

export default styles;