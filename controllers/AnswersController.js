const Answer = require("../models/Answer");
const logger = require("../../config/winston");

exports.get = (req, res) => {
    Answer.find().lean().exec((err, answersDocs) => {
        if(err)
        {
            console.log(err);
            logger.logError(req, err)
            return res.status(200).json({success: false, message: "Cannot get answersDocs", answersDocs: null});
        }
        return res.status(200).json({success: true, message: "Got answersDocs", answersDocs: answersDocs});
    });
}


exports.getByEventIdAndUserId = (req, res) => {
    Answer.findOne({eventId: req.params.eventId, "submissions.userId": req.params.userId}, {'submissions.$': 1}).lean().exec((err, answersDoc) => {
        
        try
        {
            if(err)
            {
                console.log(err);
                logger.logError(req, err)
                return res.status(200).json({success: false, message: "Cannot get submission", submission: null});
            }
            if(!answersDoc)
            {
                return res.status(200).json({success: false, message: "Got submission", submission: null});
            }
            return res.status(200).json({success: true, message: "Got submission", submission: answersDoc.submissions[0]});
        }
        catch(err)
        {
            console.log(err);
            logger.logError(req, err)
            return res.status(200).json({success: false, message: "Cannot get submission", submission: null});
        }
       
    })
}

exports.getByEventId = (req, res) => {
    Answer.findOne({eventId: req.params.eventId}).lean().exec((err, answersDoc) => {
        if(err)
        {
            console.log(err);
            logger.logError(req, err)
            return res.status(200).json({success: false, message: "Cannot get submissions", submissions: null});
        }
        return res.status(200).json({success: true, message: "Got submissions", submissions: answersDoc.submissions});
    })
}


exports.getById = (req, res) => {
    Answer.findById(req.params.id).lean().exec((err, answersDoc) => {
        if(err)
        {
            console.log(err);
            logger.logError(req, err)
            return res.status(200).json({success: false, message: "Cannot get submissions", submissions: null});
        }
        return res.status(200).json({success: true, message: "Got submissions", submissions: answersDoc.submissions});
    })
}


exports.create = (req, res) => {
    Answer.create(req.body).then(answersDoc => {
        return res.status(200).json({success: true, message: "Answers Doc created successfully", answersDoc: answersDoc});
    }).catch(err => {   
        console.log(err);
        logger.logError(req, err)
        return res.status(200).json({success: false, message: "Answers Doc cannot be created", answersDoc: null});
    })
}

exports.update = (req, res) => {
    Answer.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean((err, answersDoc) => {
        if(err)
        {
            console.log(err);
            logger.logError(req, err)
            return res.status(200).json({success: false, message: "Answers Doc cannot be updated", answersDoc: null});
        }
        return res.status(200).json({success: true, message: "Answers Doc updated successfully", answersDoc: answersDoc});
    })
}

exports.addSubmission = async (req, res) => {
    let answersDoc = await Answer.findOne({eventId: req.params.eventId});
    if(answersDoc)
    {
        answersDoc.submissions.push(req.body)
        let updatedAnswersDoc = await answersDoc.save({new: true});
        return res.status(200).json({success: true, message: "Submission added", submission: updatedAnswersDoc.submissions[updatedAnswersDoc.submissions.length - 1]}); 
    }
    let newAnswersDoc = {
        eventId: req.params.eventId,
        submissions: [req.body]
    }
    newAnswersDoc = await Answer.create(newAnswersDoc);
    return res.status(200).json({success: true, message: "Submission added", submission: newAnswersDoc.submissions[0]}); 

}


exports.delete = (req, res) => {
    Answer.findByIdAndDelete(req.params.id).then(answersDoc => {
        return res.status(200).json({success: true, message: "Answers Doc deleted successfully", user: null});
    }).catch(err => {   
        console.log(err);
        logger.logError(req, err)
        return res.status(200).json({success: false, message: "Answers Doc cannot be deleted", user: null});
    })
};