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
const authentication = require('../../Authentication/token');
let mongoose = require('mongoose');



let surveyController = require('../controllers/survey');


/* GET Route for the Survey page - READ Operation */
router.get('/', surveyController.displaySurvey);


/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',authentication ,surveyController.displayAddPage);  


/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', authentication ,surveyController.processAddPage);
    

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id',  authentication,surveyController.displayEditPage);
     

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id',  authentication,surveyController.processEditPage);
       

/* GET Route to perform Deletion - DELETE Operation */
router.get('/delete/:id', authentication,surveyController.performDelete);



module.exports = router;