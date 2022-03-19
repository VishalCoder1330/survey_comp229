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

let mongoose = require('mongoose');
mongoose.Schema.Types.Boolean.convertToFalse.add('');

//create a model class
let  questionsModel = mongoose.Schema({
  
  //question: String,
  question: String,
  questionType: Boolean  ,
  surveyID: String,
  author: String,
  questionsAnswer: String
},
{
    collection: "questions"
});



module.exports = mongoose.model('Questions',   questionsModel);


