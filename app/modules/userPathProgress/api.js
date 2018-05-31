import {database} from "../../config/firebase";

export function fetchUserPathProgress(user) {
    return database.ref('usersPathProgress')
        .child(user.uid)
        .once("value")
        .then(snapshot => snapshot.val());
}

export function updateUserPathProgress(user, payload) {
    return database.ref('usersPathProgress').child(user.uid).update({...payload})
        .then(() => payload);
}