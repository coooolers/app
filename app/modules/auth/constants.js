export const AUTH_USER_NOT_FOUND_ERROR_CODE = "auth/user-not-found";
export const AUTH_EMAIL_ALREADY_IN_USE_ERROR_CODE = "auth/email-already-in-use";
export const GOOGLE_SIGN_IN_CANCELLED_ERROR_CODE = -5;

/*
 TODO: Use https://www.npmjs.com/package/react-native-config instead.
       these values are coming from the different GoogleService-Info.plist
       environment configurations
 */
export const GOOGLE_IOS_CLIENT_ID = process.env.NODE_ENV === "development" ?
    "183083927281-m33g3ppe5qnc9n24jtobv4gb3vuhr9uv.apps.googleusercontent.com" :
    '891410242074-cdl78f5q3s23t8v2ivjrh3t6mj7vu1lc.apps.googleusercontent.com';