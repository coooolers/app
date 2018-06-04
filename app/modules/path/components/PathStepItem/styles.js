import {StyleSheet, PixelRatio} from 'react-native';
import {color, contentPadding, contentWidth, fontSize} from "../../../../styles/theme";
import {round} from "../../../../components/Util";

const statusCircleSize = 35;
const defaultBorderWidth = 1;
const statusVRuleOffset = round(statusCircleSize / 2);
const statusHRuleOffset = round(statusCircleSize / 2);
const defaultPadding = 6;
const defaultColor = color.brandDark;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'flex-start'
    },

    /*
     * STATUS
     */
    status: {
        width: statusCircleSize + 20,
        height: '100%',
    },

    statusIndicator: {
        width: statusCircleSize,
        height: statusCircleSize,
        borderRadius: statusCircleSize / PixelRatio.get(),
        borderColor: defaultColor,
        borderWidth: defaultBorderWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },

    statusIcon: {
        fontSize: statusCircleSize - 10
    },

    statusTop: {
        borderLeftColor: defaultColor,
        borderLeftWidth: defaultBorderWidth,
        height: 15,
        marginLeft: statusVRuleOffset
    },

    statusBottom: {
        borderLeftColor: defaultColor,
        borderLeftWidth: 1,
        flex: 1,
        marginLeft: statusVRuleOffset
    },

    statusMiddle: {
        flexDirection: 'row'
    },

    statusLineRight: {
        borderTopColor: defaultColor,
        borderTopWidth: defaultBorderWidth,
        marginTop: statusHRuleOffset,
        flex: 1,
    },

    /*
     * CONTENT
     */
    contentContainer: {
        flex: 1,
        backgroundColor: color.brandLight,
        borderColor: defaultColor,
        borderWidth: defaultBorderWidth,
        borderTopWidth: 8,
        marginBottom: 30
    },

    contentHeader: {
        flexDirection: 'row',
        paddingTop: defaultPadding,
        paddingLeft: defaultPadding,
        paddingRight: defaultPadding,
    },

    contentBody: {
        padding: defaultPadding,
    },

    contentFooter: {
        padding: defaultPadding,
        borderTopColor: defaultColor,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    icon: {
        fontSize: fontSize.regular,
        marginRight: 5,
        marginTop: 5
    },

    name: {
        fontSize: fontSize.large - 2
    },

    description: {
        fontSize: fontSize.small,
        marginTop: 5,
        marginBottom: 5
    }
});

export default styles;