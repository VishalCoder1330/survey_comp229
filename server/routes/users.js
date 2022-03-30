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

var express = require('express');
var router = express.Router();
let user = require('../controllers/user');
let autheticate = require('../../Authentication/token')

/* User Register Route */
router.post('/register',user.registerUser);

/* User Login Router */
router.post('/login',user.logUser);

/* GET users listing. */
router.get('/', autheticate,function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
