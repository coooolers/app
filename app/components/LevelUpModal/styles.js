import {StyleSheet} from 'react-native';
import {color, contentWidth} from "../../styles/theme";

const panelWidth = contentWidth - 50;
const panelContentWidth = panelWidth - 50;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },

    panelImage: {
        position: 'absolute',
        width: panelWidth,
        zIndex: 20,
        resizeMode: 'contain'
    },

    panelContent: {
        position: 'absolute',
        zIndex: 25,
        width: panelContentWidth,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },


    characterImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },

    closeText: {
        fontWeight: 'bold',
        color: color.brandLight,
        position: 'absolute',
        bottom: 20,
        textAlign: 'center'
    }
});

export default styles;