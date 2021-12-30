const jwt = require('jsonwebtoken');
const reporter = require('../models/reporter');


auth = async(req, res, next)=>{
    try{
        
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        
        const fReporter = await reporter.findOne({_id:decode.reporterID, tokens: token});
        
        if(!fReporter){
            
            throw new Error();

        }
        
        req.reporter = fReporter;
        req.token = token;

        
        next();
    }catch(e){
        res.status(401).send({
            // error:`Please Authenticate`
            e: e.message
            
        })
    }
}

module.exports = auth;