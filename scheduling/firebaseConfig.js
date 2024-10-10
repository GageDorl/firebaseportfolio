// firebaseConfig.js
const admin = require("firebase-admin");
const serviceAccount = require("./gage-d-orlando-portfolio-firebase-adminsdk-s8b67-cfbe2b6e23.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gage-d-orlando-portfolio.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
