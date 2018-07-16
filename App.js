import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Router from './app/config/Router';
import store from './app/redux/store';
import firebase from 'react-native-firebase';
import Reporting from "./app/modules/reporting";


export default class App extends Component {
    componentDidMount() {
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
            Reporting.track(`notification_displayed`, {id: notification.notificationId});
        });

        this.notificationListener = firebase.notifications().onNotification(notification => {
            Reporting.track(`notification_received`, {id: notification.notificationId});
        });

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
            const notification = notificationOpen.notification;
            Reporting.track(`notification_opened_foreground`, {id: notification.notificationId});
            Reporting.track(`notification__${notification.notificationId}__opened-foreground`);
        });

        firebase.notifications().getInitialNotification().then(notificationOpen => {
            if (notificationOpen) {
                const notification = notificationOpen.notification;
                Reporting.track(`notification_opened_background`, {id: notification.notificationId});
            }
        });
    }

    componentWillUnmount() {
        this.notificationOpenedListener();
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
