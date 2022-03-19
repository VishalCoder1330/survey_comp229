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
  
  //let jwt = require('jsonwebtoken');
  
  //create a reference to the model
  let Questions = require('../models/questions');
  let Survey = require('../models/survey');

  module.exports.displayView= (req, res, next) => {
    Questions.find((err, questionList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('survey/view', {
                title: 'Questions List',
                  QuestionsList: questionList,

            });      
        }
    });
  }
  
module.exports.displayCreatePage = (req, res, next) => {
     
      res.render('survey/create', {title: 'Add New Survey'});
  }
  
  module.exports.processCreatePage = (req, res, next) => {
    
    let newQuestions = Questions({
        "question": req.body.question,
       // "questionType": req.body.question
        
    });

    Questions.create(newQuestions , (err, question) =>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            //refresh the surveys
            res.redirect('/survey-view');
        }
    });

  
  }




  module.exports.displayUpdatePage = (req, res, next) =>{
    let id = req.params.id;

    Questions.findById(id, (err, questionToEdit) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/update', {title: 'Update Questions ', questions: questionToEdit})
        }
    });
}
  
  module.exports.processUpdatePage= (req, res, next) =>{
    let id = req.params.id

    let updatedSurvey =Questions({
        "_id": id,
        "question": req.body.question,
      "questionsAnswer": req.body.questionsAnswer
    });

    Questions.updateOne({_id: id}, updatedSurvey, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey
            res.redirect('/survey-view');

        }
    });
}
  
  module.exports.performDelete = (req, res, next) =>{
    let id = req.params.id;

    Questions.remove({_id: id}, (err) =>{
        if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
            //refresh the refresh survey
            res.redirect('/survey-view');
       }
    });
  }
  
