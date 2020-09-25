const FirebaseAdmin = require("firebase-admin");

const serviceAccount = require("../../tacitapp-57fee-firebase-adminsdk-9ohjd-0a93a21106.json"); 

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://tacitapp-57fee.firebaseio.com"
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