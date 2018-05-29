import {StyleSheet} from 'react-native';
import {color, contentPadding, contentWidth, fontSize, navbarHeight, normalize} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white
    },

    header: {
        height: 225,
        backgroundColor: color.black
    },

    headerContent: {
        padding: contentPadding,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: 225,
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

    body: {
        alignItems: 'center',
        backgroundColor: color.white,
        padding: contentPadding
    },

    audioControls: {
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
    },

    footer: {
        backgroundColor: '#eeeeee',
        width: '100%',
        padding: contentPadding
    }
});

export default styles;