import {StyleSheet} from 'react-native';
import {color, contentPadding, fontSize, tabbarHeight} from "../../../../styles/theme";

const headerHeight = 250;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        flex: 1
    },

    header: {
        height: headerHeight,
        backgroundColor: color.black
    },

    headerContent: {
        padding: contentPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: headerHeight,
        width: '100%'
    },

    title: {
        fontSize: fontSize.large,
        color: color.white
    },

    subTitle: {
        color: color.white
    },

    closeButton: {
        position: 'absolute',
        top: contentPadding * 2,
        right: contentPadding
    },

    closeIcon: {
        fontSize: 22,
        color: color.white
    },

    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: color.white,
        padding: contentPadding
    },

    audioContainer: {
        width: '100%',
        marginBottom: 20
    },

    rewardsContainer: {
        borderColor: color.black,
        borderWidth: 1,
        borderRadius: 5,
        padding: contentPadding,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    reward: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    trophyIcon: {
        color: color.brandPrimary,
        fontSize: 25,
        marginRight: 5
    },

    bookIcon: {
        color: '#39a0ed',
        fontSize: 25,
        marginRight: 5
    }
});

export default styles;