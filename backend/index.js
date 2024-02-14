const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dataa = require("./routes/route");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://ngarg:Naman@cluster0.4uy4zu5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api", dataa);

app.listen(8000, () => {
  console.log("Server starting at 8000");
});
