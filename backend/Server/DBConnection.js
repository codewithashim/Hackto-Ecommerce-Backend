const mongoose = require("mongoose");
const app = require("../app/app");
const dotenv = require("dotenv");
dotenv.config();

const DbUser = process.env.DB_USER;
const DbPassword = process.env.DB_PASSWORD;

const port = process.env.PORT || 8080;
const db = `mongodb+srv://hekto-user:rm45TQmDAgLokNhi@codewithashim.3fodfpy.mongodb.net/Hekto?retryWrites=true&w=majority`;

const Bootstrap = async () => {
  try {
    await mongoose.connect(`${db}`);
    console.log("Connected to MongoDB !!");
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Bootstrap,
};
