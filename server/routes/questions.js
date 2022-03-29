/* Team: Group 3
  Web site name : Survey+
  Date : March 18, 2022
  Author's names & Student IDs:
    Jiaying Song - 301172953
    Nimish Patel - 301224017
    Vishalkumar Parekh - 301221947
    Deepkumar Patel - 301236607
    Gokulraj Venugopal – 301202722
    Dimple - 301225341
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const authentication = require('../../Authentication/token');


let questionsController = require('../controllers/questions');


/* GET Route for displaying the view page - CREATE Operation */
router.get('/', authentication,questionsController.displayView);

//router.get('/survey/view', questionsController.displayView);

/* GET Route for displaying the create page - CREATE Operation */
router.get('/create/:id', authentication ,questionsController.displayCreatePage);  


/* POST Route for processing the create page - CREATE Operation */
router.post('/create/:id', authentication ,questionsController.processCreatePage);
    

/* GET Route for displaying the update page - UPDATE Operation */
router.get('/update/:id', authentication,questionsController.displayUpdatePage);
     

/* POST Route for processing the update page - UPDATE Operation */
router.post('/update/:id', authentication,questionsController.processUpdatePage);
 
//router.get('/view/:id', questionsController.displayNewSurvey);

router.get('/delete/:id', authentication,questionsController.performDelete);


module.exports = router;
