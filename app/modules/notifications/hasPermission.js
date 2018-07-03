import {messaging} from "../../config/firebase";

export default async () => {
    const isEnabled = await messaging.hasPermission();
    return !!isEnabled;
};