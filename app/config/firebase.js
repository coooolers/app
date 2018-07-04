import firebase from 'react-native-firebase';

export const database = firebase.database();
export const auth = firebase.auth();
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;