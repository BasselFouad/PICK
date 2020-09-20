const FirebaseAdmin = require("../../config/firebase");


exports.sendNotification = (topic, data) => {
    var message = {
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