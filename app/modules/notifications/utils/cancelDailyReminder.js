import firebase from "react-native-firebase";

export default () => {
    return firebase.notifications().cancelNotification("daily-reminder");
};

