import {StyleSheet} from 'react-native';
import {normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },

    timerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    bar: {
        width: '100%'
    },

    controls: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    play: {
        fontSize: normalize(64)
    },

    timingText: {
        fontSize: normalize(12)
    }
});

export default styles;