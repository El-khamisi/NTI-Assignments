const jwt = require('jsonwebtoken');
const reporter = require('../models/reporter');


auth = async(req, res, next)=>{
    try{
        const token = req.headr('Authorization').replace('Bearer', '');

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        const fReporter = await reporter.findOne({_id:decode._id, tokens: token});

        if(!fReporter){
            throw new Error();

        }
        
        req.reporter = fReporter;
        req.token = token;

        next();
    }catch(e){
        res.status(401).send({
            error:`Please Authenticate`
        })
    }
}

module.exports = auth;