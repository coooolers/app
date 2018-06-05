import {StyleSheet, PixelRatio} from 'react-native';
import {color, contentPadding, contentWidth, fontSize} from "../../../../styles/theme";
import {round} from "../../../../components/Util";

const statusCircleSize = 35;
const defaultBorderWidth = 1;
const statusVRuleOffset = round(statusCircleSize / 2);
const statusHRuleOffset = round(statusCircleSize / 2);
const defaultPadding = 6;
const defaultColor = color.black;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: contentPadding
    },

    step: {},

    stepWrapper: {
        flexDirection: "row",
        alignItems: 'flex-start'
    },

    stepStatus: {
        width: statusCircleSize + 20,
        height: '100%',
    },

    stepStatusIndicator: {
        width: statusCircleSize,
        height: statusCircleSize,
        borderRadius: statusCircleSize / PixelRatio.get(),
        borderColor: defaultColor,
        borderWidth: defaultBorderWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },

    stepStatusIcon: {
        fontSize: statusCircleSize - 5
    },

    stepStatusTop: {
        borderLeftColor: defaultColor,
        borderLeftWidth: defaultBorderWidth,
        height: 15,
        marginLeft: statusVRuleOffset
    },

    stepStatusBottom: {
        borderLeftColor: defaultColor,
        borderLeftWidth: 1,
        flex: 1,
        marginLeft: statusVRuleOffset
    },

    stepReward: {
        flexDirection: 'row',
        marginRight: 10
    },

    stepIcon: {
        fontSize: fontSize.regular,
        marginRight: 5,
        marginTop: 5
    },

    stepStatusMiddle: {
        flexDirection: 'row'
    },

    stepStatusLineRight: {
        borderTopColor: defaultColor,
        borderTopWidth: defaultBorderWidth,
        marginTop: statusHRuleOffset,
        flex: 1,
    },

    stepContentWrapper: {
        flex: 1,
        borderColor: defaultColor,
        borderWidth: defaultBorderWidth,
        borderRadius: 5,
        marginBottom: 30
    },

    stepContentHeader: {
        flexDirection: 'row',
        paddingTop: defaultPadding,
        paddingLeft: defaultPadding,
        paddingRight: defaultPadding,
    },

    stepContentBody: {
        padding: defaultPadding,
    },

    stepContentFooter: {
        padding: defaultPadding,
        borderTopColor: defaultColor,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    stepName: {
        fontSize: fontSize.large - 2
    },

    stepDescription: {
        fontSize: fontSize.small,
        marginTop: 5,
        marginBottom: 5
    },

    characterContainer: {
        width: '100%'
    },

    characterBackground: {
        padding: contentPadding,
        paddingBottom: 0,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.light_black
    },

    characterImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },

    xpContainer: {
        flex: 1
    },

    xpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default styles;