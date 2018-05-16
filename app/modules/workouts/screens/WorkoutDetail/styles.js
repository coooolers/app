import {StyleSheet} from 'react-native';
import {theme} from "../../index"
import {contentPadding} from "../../../../styles/theme";

const {padding, color, fontFamily, normalize, fontSize, windowWidth} = theme;

const cellWidth = 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: contentPadding,
        backgroundColor: color.white
    },

    title: {
        textAlign: 'center',
        fontSize: fontSize.large,
        fontFamily: fontFamily.medium
    },

    exerciseImage: {
        width: 50,
        height: 50,
        marginRight: 10
    },

    exerciseNameLabel: {
        flex: 1,
        fontSize: fontSize.small
    },

    exerciseName: {
        flex: 1
    },

    exerciseRepsLabel: {
        width: cellWidth,
        textAlign: 'right',
        fontSize: fontSize.small
    },

    exerciseReps: {
        width: cellWidth,
        textAlign: 'right'
    },

    exerciseRewardLabel: {
        width: cellWidth + 20,
        textAlign: 'right',
        fontSize: fontSize.small
    },

    exerciseReward: {
        width: cellWidth + 20,
        textAlign: 'right'
    },

    exerciseSetsLabel: {
        width: cellWidth,
        textAlign: 'right'
    },

    exerciseSets: {
        width: cellWidth,
        textAlign: 'right'
    },

    exerciseRoutineContainer: {
        flex: 10,
        marginTop: 20
    },

    exerciseRowHeader: {
        flex: 0,
        flexDirection: 'row',
        padding: padding,
        borderBottomWidth: 1,
        borderBottomColor: color.light_grey,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    exerciseRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: padding,
        borderBottomWidth: 1,
        borderBottomColor: color.light_grey
    }
});

export default styles;