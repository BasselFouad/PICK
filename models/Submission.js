const mongoose = require('mongoose');


const SubmissionSchema = mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required:  [true, 'Please add user id']
        },
        questionnaireId: {
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Questionnaire',
            required: [true, 'Please add questionnaire Id']
        },
        answers: [{
            question: {
                type: String,
                required: [true, 'Please add a question']
              },
              choices: {
                type: [String],
                minItems : 2 ,
                required: [true, 'Please add at least two choices']
              },
              answer: {
                type: String,
              },
              correctAnswer: {
                type: String,
                required: [true, 'Please add the correct answer']
              },
              isCorrect: {
                type: Boolean
              }
        }],
        percentage: {type: Number, min: 0, max: 100}
        
    
},
{
    timestamps: true
});



module.exports = mongoose.model('Submission', SubmissionSchema);
