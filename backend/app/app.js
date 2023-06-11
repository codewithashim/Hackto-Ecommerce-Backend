const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

///////////////////////////////////////////////
//                Middilware                 //
/////////////////////////////////////////////*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const AuthRouter = require("../Router/AuthRouter");
const ProductRouter = require("../Router/ProductRouter");

///////         End of Middilware      ////////

///////////////////////////////////////////////
//               Add New Data               //
/////////////////////////////////////////////*/

app.use("/api/v1", AuthRouter);
app.use("/api/v1", ProductRouter);

app.get("/api/v1", (req, res) => {
  res.send("Hey Wellcome to hekto Server!");
});

module.exports = app;
