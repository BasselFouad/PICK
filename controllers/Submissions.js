const Submission = require("../models/Submission");
const User = require("../models/User");
const Questionnaire = require("../models/Questionnaire");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//desc get all submissions
//@route GET /api/v1/submissions
exports.getSubmissions = asyncHandler( async(req, res, next)=>{
    const submissions = await Submission.find();
    res.status(200).json({
        success: true ,
        data : submissions
    });
})

//desc Get single submission 
//@route GET /api/v1/submissions/:id

exports.getSubmission = asyncHandler( async(req, res, next)=>{
    
    const submission = await Submission.findById(req.params.id);
    res.status(200).json({
        success:true,
        data:submission
    })
})

exports.createSubmission =asyncHandler( async(req, res, next)=>{
    
    const user = await User.findById(req.body.userId);
    const questionnaire = await  Questionnaire.findById(req.body.questionnaireId)
 

    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.body.userId}`,404));
    }
    if(!questionnaire){
        return next(new ErrorResponse(`Questionnaire not found with id of ${req.body.questionnaireId}`,404));
    }
    
    let answersArray = req.body.answers ;
    let correctAnswers = 0 ;
    answersArray.forEach( answer => {
        answer.isCorrect = false ;
        if(answer.correctAnswer == answer.answer){
            answer.isCorrect = true 
            correctAnswers++ ;
        }
    })
   
    req.body.percentage = correctAnswers/(answersArray.length) * 100
    req.body.answers = answersArray ;
    
    const submission = await Submission.create(req.body)
    //add submission to User

     await User.findByIdAndUpdate(
        req.body.userId,
        {
            $push : { submissions : submission }
        },
        {
            new:true,
            runValidators:true
        }
       

    ) ;
    await Questionnaire.findByIdAndUpdate(
        req.body.questionnaireId,
        {
            $push : { submissions : submission }
        },
        {
            new:true,
            runValidators:true
        }
    );
    res.status(200).json({
        success: true ,
        data : submission
    });
})

exports.updateSubmission = asyncHandler( async(req, res, next)=>{
   
    let answersArray = req.body.answers ;
    let correctAnswers = 0 ;

    answersArray.forEach( answer => {
        answer.isCorrect = false ;
        if(answer.correctAnswer == answer.answer){
            answer.isCorrect = true 
            correctAnswers++ ;
        }
    })
    req.body.percentage = correctAnswers/(answersArray.length) * 100
    req.body.answers = answersArray ;

    //update submission
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
    });

    //update user submissions
    let user = await User.findById(submission.userId)
    for( let i =0 ; i< user.submissions.length ; i++){
        if(user.submissions[i]._id == req.params.id){
            user.submissions[i] = submission  ;
        }
    }
    await user.save() ;

    //update questionnaire submissions
    let questionnaire = await Questionnaire.findById(submission.questionnaireId)
    for( let i =0 ; i< questionnaire.submissions.length ; i++){
        if(questionnaire.submissions[i]._id == req.params.id){
            questionnaire.submissions[i] = submission  ;
        }
    }
    await questionnaire.save() ;

    res.status(200).json({
        success:true,
        data:submission
    })
})

exports.deleteSubmission = asyncHandler( async(req, res, next)=>{
    
    const submission = await Submission.findByIdAndDelete(req.params.id);

     await  User.findByIdAndUpdate(
        submission.userId,
        {
            $pull : { submissions : {_id : req.params.id } }
        }
        ) ;
    
    await  Questionnaire.findByIdAndUpdate(
        submission.questionnaireId,
        {
            $pull : { submissions : {_id : req.params.id } }
        }
        ) ;    


    res.status(200).json({
        success:true,
        data:'submission has been deleted'
    })
})
