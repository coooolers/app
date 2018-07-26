import {auth, database, FacebookAuthProvider, GoogleAuthProvider} from "../../config/firebase";

export const registerWithEmailAndPassword = async (email, password) => {
    const signInResult = await auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
    const user = await createUser(signInResult.user);
    await signInWithEmailAndPassword(email, password);
    return user;
};

export const createUser = async (user, extraProfileData) => {
    const payload = Object.assign({
        uid: user.uid,
        name: user.name || user.displayName,
        email: user.email || user.emailAddress,
        emailVerified: user.emailVerified,
        phone: user.phone || user.phoneNumber,
        created: new Date().toISOString(),
        photoURL: user.photoURL,
        hasCompletedOnboarding: false,
        appPiecesLearned: []
    }, extraProfileData);

    await database.ref('users').child(user.uid).set(payload);
    return payload;
};

export const getUser = async (user) => {
    const snapshot = await database.ref('users').child(user.uid).once('value');
    const exists = (snapshot.val() !== null);

    if (exists) {
        user = snapshot.val();
    }

    return ({exists, user});
};

export const resetPassword = (data, callback) => {
    const {email} = data;
    return auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
};

export const signOut = () => auth.signOut();

export const signInWithEmailAndPassword = (email, password) => {
    return auth.signInAndRetrieveDataWithEmailAndPassword(email, password).then(getUser);
};

export const signInWithFacebook = async (fbToken) => {
    const credential = FacebookAuthProvider.credential(fbToken.accessToken);
    const signInResult = await auth.signInAndRetrieveDataWithCredential(credential);
    const {exists, user} = await getUser(signInResult.user);

    if (exists) {
        return user;
    } else {
        const {profile} = signInResult.additionalUserInfo;
        return createUser(signInResult.user, {
            familyName: profile.first_name,
            givenName: profile.last_name,
        });
    }
};

export const signInWithGoogle = async (data) => {
    const credential = GoogleAuthProvider.credential(data.idToken, data.accessToken);
    const signInResult = await auth.signInAndRetrieveDataWithCredential(credential);
    const {exists, user} = await getUser(signInResult.user);

    if (exists) {
        return user;
    } else {
        const {profile} = signInResult.additionalUserInfo;
        return createUser(signInResult.user, {
            gender: profile.gender,
            familyName: profile.family_name,
            givenName: profile.given_name,
            locale: profile.locale
        });
    }
};