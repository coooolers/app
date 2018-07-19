import * as t from './actionTypes';
import * as api from './api';
import {auth} from "../../config/firebase";

export const registerWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        return api.registerWithEmailAndPassword(email, password).then(user => {
            dispatch({type: t.LOGGED_IN, data: user})
        });
    }
};

export const getUser = (user) => {
    return (dispatch) => {
        return api.getUser(user).then(response => {
            if (response.exists) {
                dispatch({type: t.LOGGED_IN, data: response.user});
                return response.user;
            }
        });
    }
};

export const resetPassword = (data, successCB, errorCB) => {
    return (dispatch) => {
        api.resetPassword(data, (success, data, error) => {
            if (success) {
                successCB();
            } else if (error) {
                errorCB(error);
            }
        });
    };
};

export const signOut = () => {
    return (dispatch) => {
        return api.signOut().then(() => {
            dispatch({type: t.LOGGED_OUT});
        });
    };
};

export const checkLoginStatus = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged((user) => {
                let isLoggedIn = (user !== null);

                if (isLoggedIn) {
                    dispatch(getUser(user)).then(resolve).catch(reject);
                } else {
                    dispatch({type: t.LOGGED_OUT});
                    resolve(null);
                }
            });
        });
    };
};

export const signInWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        return api.signInWithEmailAndPassword(email, password).then(response => {
            if (response.exists) {
                dispatch({type: t.LOGGED_IN, data: response.user});
            }
        });
    };
};

export const signInWithFacebook = (facebookToken) => {
    return (dispatch) => {
        return api.signInWithFacebook(facebookToken).then(user => {
            dispatch({type: t.LOGGED_IN, data: user});
        });
    };
};

export const signInWithGoogle = (data) => {
    return (dispatch) => {
        return api.signInWithGoogle(data).then(user => {
            dispatch({type: t.LOGGED_IN, data: user});
        });
    };
};
