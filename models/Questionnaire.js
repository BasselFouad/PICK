const mongoose = require('mongoose');
const Submission = require('./Submission').schema  ;

const QuestionnaireSchema = mongoose.Schema({
        submissions : [Submission]
},
{
    timestamps: true
});



module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
