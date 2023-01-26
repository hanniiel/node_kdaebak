require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const history = require("connect-history-api-fallback");
//firebase admin impl
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  ),
  databaseURL: "https://kdaebakapp.firebaseio.com",
});
//
require("../models/connection");
const idolRouter = require("../routers/idol");
const groupRouter = require("../routers/group");
const userRouter = require("../routers/user");
const voteRouter = require("../routers/vote");
const faveRotuer = require("../routers/favorite");

const upload = require("../middleware/upload");

const app = express();
//middleware
app.use(
  history({
    rewrites: [
      {
        from: /\/api/,
        to: function (context) {
          return context.parsedUrl.pathname;
        },
      },
    ],
  })
);
app.use(cors());
app.use(express.json());

app.use(idolRouter);
app.use(groupRouter);
app.use(userRouter);
app.use(voteRouter);
app.use(faveRotuer);
app.use(express.static("public"));

app.post("/upload", upload, async function (req, res) {
  try {
    if (req.file == null) {
      return res.status(400).send({ error: "no file specified" });
    }
    res.send({ link: req.file.data.link });
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

module.exports = app;
module.exports.handler = serverless(app);
