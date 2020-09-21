const mongoose = require('mongoose');
const Submission = require('./Submission').schema  ;

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new  mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please add a name']
  },
  last_name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone_number: {
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  submissions: [Submission]
  
},
{
    timestamps: true
});

//encrypt password using brcypt
// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//       next();
//     }
  
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });

//Sign JWT ant Return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign( { id:this._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//Match user entered password to hashed password in DB 
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);

}

//Generate and Hash password Token
UserSchema.methods.getResetPasswordToken= function(){
  //Generate Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash the token and set it to reset Password Token field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  //set the expire 
  this.resetPasswordExpire = Date.now()+10*1000*60*10

  return resetToken ;
}
module.exports = mongoose.model('User',UserSchema);




module.exports = mongoose.model('User', UserSchema);
