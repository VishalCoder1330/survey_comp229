


  /* Team: Group 3
  Web site name : Survey+
  Date : March 18, 2022
  Author's names & Student IDs:
    Jiaying Song - 301172953
    Nimish Patel - 301224017
    Vishalkumar Parekh - 301221947
    Deepkumar Patel - 301236607
    Gokulraj Venugopal – 301202722
    Dimple Malhotra - 301225341

  */

  let express = require('express');
  let router = express.Router();
  let mongoose = require('mongoose');
  
  //let jwt = require('jsonwebtoken');
  
  //create a reference to the model
  let Questions = require('../models/questions');
  let Survey = require('../models/survey');

  module.exports.displayAnswer= (req, res, next) => {
    Questions.find((err, questionList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('survey/answer', {
                title: 'Survey Answers',
                  QuestionsList: questionList});      
        }
    });
  }


module.exports.displayAnswerPage = (req, res, next) => {
     
      res.render('survey/answer', {title: 'Survey Answers'
      });
  }
  

module.exports.processAnswerPage = (req, res, next) => {
    
     let id = req.params.id

    let updatedAnswers =Questions({
        "_id": id,
        "question": req.body.question,
        "questionsAnswer": req.body.questionsAnswer
     
    });

    Questions.updateOne({_id: id}, updatedAnswers, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the answers page
            res.redirect('/survey-answer');

        }
    });
  
}





 

