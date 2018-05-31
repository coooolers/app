import {database} from "../../config/firebase";

export function fetchPaths() {
    return database.ref('paths').once("value")
        .then(snapshot => {
            const byUid = snapshot.val();
            const keys = Object.keys(byUid);
            return keys.map(key => byUid[key]);
        });
}