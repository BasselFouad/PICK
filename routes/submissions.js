const express = require('express'); 
const {
   getSubmissions,
   getSubmission,
   createSubmission,
   updateSubmission,
   deleteSubmission
} = require('../controllers/Submissions');

const router = express.Router() ;



router.route('/')
        .get(getSubmissions)
            .post(createSubmission)
        
router.route('/:id')
        .get(getSubmission)
            .put(updateSubmission)
                .delete(deleteSubmission) 

// router.route('/:id')
               

module.exports = router;