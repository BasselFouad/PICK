const mongoose = require('mongoose');


const AnswerSchema = mongoose.Schema({
    submissions: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answers: [{
            question: String,
            correctAnswer: String,
            answer: String,
            isCorrect: Boolean
        }],
        percentage: {type: Number, min: 0, max: 100}
        
    }]
},
{
    timestamps: true
});



module.exports = mongoose.model('Answer', AnswerSchema);
