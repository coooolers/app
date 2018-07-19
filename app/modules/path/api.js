import {database} from "../../config/firebase";

export const fetchPaths = () => {
    return database.ref('paths').once("value")
        .then(snapshot => snapshot.val());
};