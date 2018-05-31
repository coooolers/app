import {database} from "../../config/firebase";

export function fetchUserPathProgress() {
    return database.ref('usersPathProgress').once("value")
        .then(snapshot => snapshot.val());
}