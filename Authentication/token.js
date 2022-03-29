const jwt = require('jsonwebtoken');

/**
 * Author - Vishalkumar
 */
module.exports = (req,res,next)=>{
    try{
        const Token = req.cookies.token;
        const decode = jwt.verify(Token,process.env.JWT_KEY);
        next();
    }
    catch(error){
        return res.redirect('/login');
    }
}
