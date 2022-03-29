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


// require modules for the User Model
const mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//creating user schema 

const userSchema = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Username is required'
        },
        password: 
        {
            type: String,
            default: ' ',
            trim: true,
            required: 'password is required'
        },
       email: 
       {
            type: String,
            default: '',
            trim: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            required: 'Email address is required'
       },
       displayName: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
       },
       created: 
       {
            type: Date,
            default: Date.now
       },
       update: 
       {
            type: Date,
            default: Date.now
       }
    },
    {
        collection: "users"
    }
);

// configure options for User Model

//let options = ({ missingPasswordError: 'Wrong / Missing Password'});

//userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', userSchema);