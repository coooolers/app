import {database} from "../../config/firebase";

export function fetchPaths() {
    return database.ref('paths').once("value")
        .then(snapshot => snapshot.val());
}