import {database} from "../../config/firebase";

export const fetchPathCategories = () => {
    return database.ref('pathCategories').once("value")
        .then(snapshot => snapshot.val());
};