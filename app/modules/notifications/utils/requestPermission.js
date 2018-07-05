import firebase from 'react-native-firebase';

export default async () => {
    return firebase.messaging().requestPermission();
};