const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs=require("fs");

exports.Signup = async (req, res) => {
    try {
      const { fname,
        lname,
        email,
        password, } = req.body;
        console.log(req.body);
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json({
          status: false,
          errors: [
            {
              param: "email",
              message: "User with this email address already exists.",
              code: "RESOURCE_EXISTS",
            },
          ],
        });
      }
      encryptedpassword = await bcrypt.hash(password, 10);
      var newUser = new User({
        fname,
          lname,
          email,
          password:encryptedpassword,
      });
      await newUser.save();
      res.json({
        status: true,
        content: {
          data: newUser,
        },
      });
    } catch (error) {
      console.log(error);
      res.json({ msg: "Error reported" });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          res.send({code:200,msg:"Logged In Successfully",user:user})
        } else {
            res.send({code :401 ,msg: "Incorrect email or password" });
        }
      } else {
        res.send({code :401 ,msg: "Incorrect email or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "An error occurred" });
    }
  };

  exports.uploadImage = async (req, res) => {
    try {
        // Assuming Multer middleware has already saved the file to req.file
        if (req.file) {
            res.status(201).send("Single file uploaded successfully");  
    } 
    else {
        res.status(400).send("Please upload a valid image");
      }
}
catch (error) {
    console.log(error);
    res.status(400).send(error);
}
  }

// exports.login=(async(req, res) => {
//     const { email, password } = req.body;
//     //check email
//     await User.findOne({ email: email }, (err, user) => {
//       if (user) {
//         //check password
//         if (password === user.password) {
//           res.send({ message: "Login successfully", user: user });
//         } else {
//           res.send({ message: "Password and confirm password didn't match" });
//         }
//       } else {
//         res.send({ message: "Please login to proceed" });
//       }
//     });
//   });
  
// exports.Signup=(async(req, res) => {
//     const { fname, lname, email, password } = req.body;
//     //check email
//     await User.findOne({ email: email }, (err, user) => {
//       if (user) {
//         res.send({ message: "User is already registerd" });
//       } else {
//         const user = new User({
//           fname,
//           lname,
//           email,
//           password,
//         });
//         user.save((err) => {
//           if (err) {
//             res.send(err);
//           } else {
//             res.send({ message: "Account has been created!! Please Login" });
//           }
//         });
//       }
//     });
//     // res.send("register");
//     //   console.log(req.body);
//   });