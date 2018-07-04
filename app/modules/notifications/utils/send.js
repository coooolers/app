import firebase from 'react-native-firebase';
import {Platform} from "react-native";

export default (notification) => {
    if (Platform.OS === 'ios') {
        // ios notification parameters - https://rnfirebase.io/docs/v4.2.x/notifications/reference/IOSNotification

        firebase.notifications().displayNotification(notification);
    }
};