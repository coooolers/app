import firebase from 'react-native-firebase';
import {Platform} from "react-native";

export default () => {
    const notification = new firebase.notifications.Notification()
        .setNotificationId('notificationId')
        .setTitle('My notification title')
        .setBody('My notification body')
        .setData({
            key1: 'value1',
            key2: 'value2',
        });

    if (Platform.OS === 'ios') {
        // ios notification parameters - https://rnfirebase.io/docs/v4.2.x/notifications/reference/IOSNotification

        firebase.notifications().displayNotification(notification);
    }
};