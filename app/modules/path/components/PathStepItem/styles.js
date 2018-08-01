import {StyleSheet} from 'react-native';
import {color, fontFamily} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: color.light_grey
    },

    icon: {
        fontSize: 18,
    },

    name: {
        fontSize: 14,
        fontFamily: fontFamily.regular
    }
});

export default styles;