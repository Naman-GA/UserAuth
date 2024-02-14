const express = require("express");
const multer=require("multer")
const Router = express.Router();
const usercontroller = require("../controller/userController");

const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });

const upload = multer({
    storage: storageEngine,
})

Router.post("/login", usercontroller.login);
// Router.get("/getuser",  usercontroller.getuser);
Router.post("/signup", usercontroller.Signup);
Router.post("/imageUpload",upload.single("image"),usercontroller.uploadImage);


module.exports = Router;
