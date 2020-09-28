const FirebaseAdmin = require("firebase-admin");

const serviceAccount = require("../nichepharma-notofications-firebase-adminsdk-b7z3a-8dce354262.json");

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://nichepharma-notofications.firebaseio.com"
  });

 
exports.sendNotification = (topic, data) => {
    const message = {
        notification: {
            title: data.title,
            body: data.body
        },
        android: {
            notification: {
            sound: 'default'
            }
        },
        data: {
            title: data.title,
            body: data.body,
        },
        
        topic: topic + ""
    };
    return FirebaseAdmin.messaging().send(message);
}