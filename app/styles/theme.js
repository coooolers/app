import {Dimensions, Platform} from 'react-native';
import {moderateScale as normalize} from 'react-native-size-matters';

const color = {
    brandPrimary: "#da375c",
    brandSuccess: "#1b998b",
    brandInfo: "#39a0ed",
    brandDanger: 'red',
    brandLight: "#fcfcfc",
    brandDark: "#071108",
    black: "#3B3031",
    light_black: "#414141",
    white: "#ffffff",
    light_grey: "#eaeaea",
    grey: "#ccc",
    dark_grey: '#364652'
};

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(21)
};

const fontFamily = {
    extrabold: "Roboto-ExtraBold",
    bold: "Roboto-Bold",
    medium: "Roboto-Medium",
    regular: "Roboto-Regular",
    light: "Roboto-Light"
};

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const contentPadding = 15;
const contentWidth = windowWidth - (contentPadding * 2);
const windowHeight = Dimensions.get('window').height;

const tabColor = (Platform.OS === "ios") ? color.white : "rgba(255,255,255,.8)";

const tabIconStyle = {fontSize: 28, color: tabColor};
const navTitleStyle = {fontSize: fontSize.regular, fontFamily: fontFamily.extrabold, color: color.black};

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    contentWidth,
    contentPadding,
    normalize
}