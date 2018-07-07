const functions = require('firebase-functions');
const email = require("./email");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.email = email;