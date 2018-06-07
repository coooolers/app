import {StyleSheet} from 'react-native';
import {color, contentPadding} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight
    },

    navigation: {
        padding: contentPadding
    },

    navigationItem: {
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: color.light_grey
    },

    navigationItemActive: {
        borderBottomWidth: 1,
        borderBottomColor: color.brandPrimary
    },

    navigationImage: {
        width: 50,
        height: 50,
    },

    content: {
        flex: 1
    }
});

export default styles;