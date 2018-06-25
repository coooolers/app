import {StyleSheet} from 'react-native';
import {theme} from "../../index";
import {contentPadding} from "../../../../styles/theme";

const {color, fontFamily, normalize} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight
    },

    content: {
        backgroundColor: color.brandLight
    },

    section: {
        width: '100%',
        padding: contentPadding,
        paddingTop: 20,
        paddingBottom: 20,
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