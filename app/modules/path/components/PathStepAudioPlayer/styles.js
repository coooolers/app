import {StyleSheet} from 'react-native';
import {color} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
    },

    controls: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    rewind: {
        fontSize: 30
    },

    play: {
        fontSize: 50,
        marginLeft: 25,
        marginRight: 25
    },

    forward: {
        fontSize: 30
    }
});

export default styles;