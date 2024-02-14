const  mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    image: String,
  });
  
module.exports = mongoose.model("User", userSchema);