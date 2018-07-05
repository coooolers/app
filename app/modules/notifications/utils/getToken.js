import firebase from 'react-native-firebase';

export default async () => {
    return await firebase.messaging().getToken();
};