const mongoose = require('mongoose');
const Answer = require('./Answer').schema  ;


const UserSchema = new  mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type: String, unique: true},
    mobileNumber: String,
    password: String,
    answers : [Answer]
  
},
{
    timestamps: true
});

//encrypt password using brcypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

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
