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
2 */

let mongoose = require('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
  name: String,
  displayName: String,
  author: String,
  question: String,
  startDate: Date,
  endDate: String,
  active: Boolean,
  surveyID: String
},
{
    collection: "survey"
});



module.exports = mongoose.model('Survey', surveyModel);


