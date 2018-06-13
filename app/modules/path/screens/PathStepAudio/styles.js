import {StyleSheet} from 'react-native';
import {contentPadding} from "../../../../styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: contentPadding,
        paddingBottom: contentPadding
    },

    transcriptParagraph: {
        marginTop: 5,
        marginBottom: 5
    },

    buttonContainer: {
        paddingTop: contentPadding,
        paddingLeft: contentPadding,
        paddingRight: contentPadding
    }
});

export default styles;