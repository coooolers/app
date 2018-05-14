import {StyleSheet} from 'react-native';
import {theme} from "../../index";
import {contentPadding, contentWidth, fontSize, normalize} from "../../../../styles/theme";
const {color} = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: contentPadding
    },

    intro: {
        textAlign: 'center',
        fontSize: normalize(16)
    },

    secondaryCTA: {
        textAlign: 'center',
        marginTop: 10
    },

    slide: {
        width: contentWidth,
        marginTop: 20,
        marginBottom: 20
    },

    slideTop: {
        width: contentWidth,
        height: 200,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    slideImage: {
        width: contentWidth,
        height: 200,
        resizeMode: 'contain',
    },

    slideTitle: {
        textAlign: 'center',
        fontSize: fontSize.large
    },

    slideDescription: {
        textAlign: 'center',
        marginTop: 10
    }
});


export default styles;