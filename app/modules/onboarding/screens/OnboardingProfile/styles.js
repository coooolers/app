import {StyleSheet} from 'react-native';
import {theme} from "../../index";
import {contentPadding, contentWidth} from "../../../../styles/theme";
const {color, padding, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        padding: contentPadding
    },

    goal: {
        backgroundColor: color.light_grey,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10,
        padding: padding,
        borderColor: color.grey,
        borderWidth: 1,
        width: contentWidth,

    },

    goalIcon: {
        fontSize: normalize(20),
        marginRight: padding
    },

    goalText: {
        flex: 1,
        fontSize: normalize(16),
    },

    goalCheck: {
        marginLeft: padding,
        fontSize: normalize(20),
        color: color.brandPrimary
    }
});


export default styles;