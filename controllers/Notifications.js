const NotificationUtility = require("../utils/NotificationUtility");

exports.sendNotification = async  (req, res) => {
    try {
        if(Array.isArray(req.body.topic)){
            let topics = req.body.topic
            for(let i =0 ; i< topics.length ; i++){
                await NotificationUtility.sendNotification(topic[i], {
                    title: req.body.title,
                    body: req.body.body
        });
            }
        }
        else{
            console.log(req.body.topic)
            await NotificationUtility.sendNotification(req.body.topic, {
                title: req.body.title,
                body: req.body.body
            });
        }
        return res.status(200).json({
            success: true, 
            message: "Notification sent to: " + req.body.topic
        });
    
    } catch (error) {
       
        return res.status(400).json({
            success: false, 
            message:  error.message || "Error occurred while sending notification to: " + req.body.topic
        });
   
    }
   

}