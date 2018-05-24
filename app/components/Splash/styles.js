import { StyleSheet } from 'react-native';

import { color, fontFamily, padding, fontSize } from "../../styles/theme";

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.brandPrimary
    },

    image:{
        height: 125,
        width: 125,
        backgroundColor: color.brandPrimary,
        marginBottom: padding,
        resizeMode
    },

    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 16,
        height: 50
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});


export default styles;