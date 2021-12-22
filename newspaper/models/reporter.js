const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const reporterSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0000
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator:(value)=>{
                validator.isEmail(value)
            },
            message:`{VALUE}'s not a correct E-mail`
        }
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        
    },
    thumbnails: {
        type: Buffer
    },
    tokens: [
        {
            type: String,
            required: true
        }
    ],
    postedNews:[
        {
        type: mongoose.Types.ObjectId,
        ref: 'news'
        }
    ]

});


reporterSchema.virtual('vNews',{
    ref:'news',   
    localField:'_id',   
    foreignField:'byReporter'
})


reporterSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});


reporterSchema.methods.generateToken = async function(){

    
    const nToken = jwt.sign(
        {reporterID: this._id.toString(), email: this.email},
        process.env.SECRET_KEY
    );

    this.tokens = this.tokens.concat(nToken);
    await this.save();

    return nToken;
}

reporterSchema.statics.findReporter = async function(email){
    
    const findReporter = await this.findOne({email});
    

    if(!findReporter){
        throw new Error(`There's no reporter associated with${email} E-mail`);

    }

    return findReporter;
}

module.exports = mongoose.model('reporter', reporterSchema);