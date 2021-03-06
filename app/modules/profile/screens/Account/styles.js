import {StyleSheet} from 'react-native';
import {color, contentPadding} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.brandLight
    },

    content: {
        padding: contentPadding,
    },

    signOutButton: {
        marginTop: 10,
        marginBottom: 10
    }
});

export default styles;