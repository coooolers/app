import {messaging} from "../../config/firebase";

export default async () => {
    return messaging.requestPermission();
};