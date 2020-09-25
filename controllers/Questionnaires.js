const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Questionnaire = require('../models/Questionnaire'); 


//desc Get all questionnaires 
//@route GET /api/v1/auth/questionnaires

exports.getQuestionnaires = asyncHandler( async(req, res, next)=>{
    const questionnaires = await Questionnaire.find();
    res.status(200).json({
        success: true ,
        data : questionnaires
    });
})

//desc Get single questionnaire 
//@route GET /api/v1/auth/questionnaires/:id

exports.getQuestionnaire = asyncHandler( async(req, res, next)=>{
    
    const questionnaire = await Questionnaire.findById(req.params.id);
    res.status(200).json({
        success:true,
        data:questionnaire
    })
})

//desc create questionnaire 
//@route POST /api/v1/auth/questionnaires

exports.createQuestionnaire = asyncHandler( async(req, res, next)=>{
    
    const questionnaire = await Questionnaire.create(req.body);
    res.status(201).json({
        success:true,
        data:questionnaire
    })
})

//desc update questionnaire
//@route PUT /api/v1/auth/questionnaires/:id
 
exports.updateQuestionnaire = asyncHandler( async(req, res, next)=>{
    
    const questionnaire = await Questionnaire.findByIdAndUpdate(req.params.id, req.body , {
        new:true,
        runValidators:true
    });
    res.status(200).json({
        success:true,
        data:questionnaire
    })
})

//desc delete questionnaire 
//@route DELETE /api/v1/auth/questionnaires/:id
 
exports.deleteQuestionnaire = asyncHandler( async(req, res, next)=>{
    
    await Questionnaire.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        data:{}
    })
})