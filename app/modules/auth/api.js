import {auth, database, FacebookAuthProvider, GoogleAuthProvider} from "../../config/firebase";

export function registerWithEmailAndPassword(email, password) {
    return auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => getUser(user));
}

export function createUser(user) {
    const payload = {
        name: user.name || user.displayName,
        email: user.email || user.emailAddress,
        uid: user.uid,
        created: new Date().toISOString(),
        hasCompletedOnboarding: false,
        appPiecesLearned: []
    };

    return database.ref('users').child(user.uid).set(payload).then(() => {
        return payload;
    });
}

export function login(email, password) {
    return auth.signInAndRetrieveDataWithEmailAndPassword(email, password).then(getUser);
}

export function getUser(user) {
    return new Promise((resolve, reject) => {
        database.ref('users').child(user.uid).once('value')
            .then(snapshot => {
                const exists = (snapshot.val() !== null);

                // if the user exist in the DB, replace the user variable with the returned snapshot
                if (exists) {
                    user = snapshot.val();
                }

                resolve({exists, user});
            })
            .catch((error) => reject({message: error}));
    });
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const {email} = data;
    return auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut() {
    return auth.signOut();
}

//Sign user in using Facebook
export function signInWithFacebook(fbToken) {
    const credential = FacebookAuthProvider.credential(fbToken.accessToken);

    return auth.signInAndRetrieveDataWithCredential(credential)
        .then((user) => getUser(user));
}

//Sign user in using google
export function signInWithGoogle(data) {
    const credential = GoogleAuthProvider.credential(data.idToken, data.accessToken);

    return auth.signInAndRetrieveDataWithCredential(credential)
        .then(data => getUser(data.user));
}