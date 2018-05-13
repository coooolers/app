import {StyleSheet} from 'react-native';
import {color, contentPadding, fontSize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        padding: contentPadding
    },

    intro: {
        textAlign: 'center'
    },

    title: {
        fontSize: fontSize.large,
        textAlign: 'center',
        marginTop: 30
    }
});


export default styles;