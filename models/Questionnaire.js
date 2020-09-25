const mongoose = require('mongoose');
const Submission = require('./Submission').schema  ;

const QuestionnaireSchema = mongoose.Schema({
        submissions : [Submission],
        questionsList : [{
            question: {
                type: String,
                required: [true, 'Please add a question']
              },
              choices: {
                type: [String],
                minItems : 2 ,
                required: [true, 'Please add at least two choices']
              },
              correctAnswer: {
                type: String,
                required: [true, 'Please add the correct answer']
              }
        }]
},
{
    timestamps: true
});



module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
