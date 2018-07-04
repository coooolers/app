import firebase from "react-native-firebase";
import moment from 'moment';

export default (date) => {
    firebase.notifications().cancelNotification("daily-reminder");

    const notification = new firebase.notifications.Notification()
        .setNotificationId('daily-reminder')
        .setBody('Take a few minutes today for your health');

    const firstNotificationDate = moment(date).add(1, 'days').toDate();
    const time = (firstNotificationDate - new Date());

    return firebase.notifications().scheduleNotification(notification, {
        fireDate: time,
        exact: true,
        repeatInterval: 'day'
    });
};

