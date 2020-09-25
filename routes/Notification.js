module.exports = (app) =>{
   
    
    const {
       sendNotification
    } = require('../controllers/Notifications');

    app.post('/api/notifications', sendNotification)

} 