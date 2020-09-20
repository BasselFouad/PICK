const mongoose = require('mongoose');


const AnswerSchema = mongoose.Schema({
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event',  unique : true,},
    submissions: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        answers: [{
            question: String,
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
