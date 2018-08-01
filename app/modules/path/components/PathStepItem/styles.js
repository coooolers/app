import {StyleSheet} from 'react-native';
import {color, contentPadding, fontFamily, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.light_grey
    },

    icon: {
        fontSize: normalize(18),
    },

    name: {
        fontSize: normalize(14),
        fontFamily: fontFamily.regular
    }
});

export default styles;