import {database} from "../../config/firebase";

export const fetchScreens = () => {
    return database.ref('screens').once("value")
        .then(snapshot => {
            return snapshot.val();
        });
};