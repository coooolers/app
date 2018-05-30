import {StyleSheet} from 'react-native';

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
        fontSize: 40,
        marginLeft: 25,
        marginRight: 25
    },
});

export default styles;