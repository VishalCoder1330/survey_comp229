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
let Survey = require('../models/survey');
let Questions = require('../models/questions');
  


module.exports.displaySurvey = (req, res, next) => {
  
    //{ displayName: req.user.displayName },
    Survey.find( (err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
           surveyList = surveyList.filter(i => i && i.endDate).filter(survey => {
                let currentDate = new Date();
                let previousDay = new Date(currentDate.getTime());
                previousDay.setDate(previousDay.getDate() - 1);
                const surveyDate = new Date(survey.endDate);
                currentDate.setHours(0,0,0);
                surveyDate.setHours(0,0,0);
                if(surveyDate < previousDay){
                    return false;
                }
                return true;
            });
            console.log(surveyList);
            res.render('survey/list', {
                title: 'Survey List',
                minDate: new Date(),
                SurveyList: surveyList,

            });          
        }
    });
}
  
  module.exports.displayAddPage = (req, res, next) =>{
      res.render('survey/add', {title: 'Add New Survey',minDate: new Date().toISOString().split('T')[0]});
  }
  
  module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "displayName": req.body.displayName,
        "endDate": req.body.endDate
    });

      Survey.create(newSurvey, (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey-list
            res.redirect('/survey-list');
        }
    });
}
  
  module.exports.displayEditPage = (req, res, next) =>{
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            //surveyToEdit.formattedDate = surveyToEdit.endDate.toISOString().split('T')[0]
            res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit})
        }
    });
}
  
  module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id

    let updatedSurvey =Survey({
        "_id": id,
        "name": req.body.name,
        "displayName": req.body.displayName,
        "endDate": req.body.endDate
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey list 
            res.redirect('/survey-list');

        }
    });
}
  
  module.exports.performDelete = (req, res, next) =>{
    let id = req.params.id;

    Survey.remove({_id: id}, (err) =>{
        if(err)
       {
           console.log(err);
           res.end(err);
       }
       else
       {
            //refresh the survey 
            res.redirect('/survey-list');
       }
    });
  }
  
 