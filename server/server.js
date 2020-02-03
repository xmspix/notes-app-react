import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Accept-Encoding", "gzip, deflate");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use("/api", require("./routes/api"));

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    process.stdout.write("\u001b[2J\u001b[0;0H");
    app.listen(port, () => {
      console.log(
        `🚀  Server ready at http://localhost:${port} >> ${moment().format(
          "LLLL"
        )}`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
