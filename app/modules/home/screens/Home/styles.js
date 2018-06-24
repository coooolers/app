import {StyleSheet} from 'react-native';
import {theme} from "../../index";
import {contentPadding} from "../../../../styles/theme";

const {color, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.light_grey
    },

    content: {
        backgroundColor: color.light_grey
    },

    section: {
        width: '100%',
        padding: contentPadding,
        alignItems: 'flex-start'
    },

    sectionTitle: {
        color: color.brandDark,
        fontFamily: fontFamily.bold,
        fontSize: normalize(10),
        marginBottom: 10
    }
});

export default styles;