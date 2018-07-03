import {messaging} from "../../config/firebase";

export default async () => {
    const fcmToken = await messaging.getToken();

    if (fcmToken) {
        return fcmToken;
        // user has a device token
    } else {
        // user doesn't have a device token yet
    }
};