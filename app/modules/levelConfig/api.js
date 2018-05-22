import {database} from "../../config/firebase";

export const fetchLevelConfig = () => {
    return database.ref('levelConfig').once("value").then(snapshot => snapshot.val());
};