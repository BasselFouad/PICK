const express = require('express'); 
const {
   getQuestionnaires,
   getQuestionnaire,
   createQuestionnaire,
   updateQuestionnaire,
   deleteQuestionnaire
} = require('../controllers/Questionnaires');

const router = express.Router() ;



router.route('/')
        .get(getQuestionnaires)
            .post(createQuestionnaire);
        
router.route('/:id')
        .get(getQuestionnaire)
            .put(updateQuestionnaire)
                .delete(deleteQuestionnaire);

        

module.exports = router;