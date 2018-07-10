const functions = require('firebase-functions');
const emails = require("./emails");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.emails = emails;