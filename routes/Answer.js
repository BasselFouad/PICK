const express = require("express");

module.exports = (app) => {
    const answersController = require('../controllers/AnswersController.js');
    const router = express.Router()
    
    router.get("/", answersController.get);
    router.get("/events/:eventId/users/:userId", answersController.getByEventIdAndUserId);
    router.get("/events/:eventId", answersController.getByEventId);
    router.get("/:id", answersController.getById);


    app.post("/", answersController.create);
    
    router.patch("/:id", answersController.update)
    router.patch("/events/:eventId", answersController.addSubmission)

    router.delete("/:id", answersController.delete);
        
    app.use("/api/v1/submissions", router)
    
}