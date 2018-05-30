import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {},

    timerContainer: {
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    bar: {
        width: 250
    },

    controls: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    rewind: {
        fontSize: 30
    },

    play: {
        fontSize: 40,
        marginLeft: 25,
        marginRight: 25
    },

    forward: {
        fontSize: 30
    }
});

export default styles;