//here i have listed all my routes

import flash from "express-flash";
import session from "express-session";
import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import Greet from "./functions/factory.js";
import Cookie  from "express-session";
import renderFactoy from "./render/renderMsg.js";
import queryFunction from "./queries/databaseQ.js";

import pgPromise from "pg-promise";
import 'dotenv/config';
import pkg from "pg";

const pgp = pgPromise()
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://greetingtable_user:EAyqRYtDCIU3qD6xdhFMLC8Jh40y8JlN@dpg-cjd1q2k5kgrc739hiflg-a.oregon-postgres.render.com/greetingtable?ssl=true";

const config = {
  connectionString: DATABASE_URL,
};

const db = pgp(config);

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});

const app = express();

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.set("views", "./views");


const greet = Greet(db)
const query = queryFunction(db)
const render = renderFactoy()

  app.use(session({
    secret : "greeting with routes",
    resave: false,
    saveUninitialized: true
  }));

   app.use(flash());
   app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: "main" }));
app.use(bodyParser.json());
app.use(Cookie());



app.get('/', render.showCounter);

app.post('/clearing', render.clearCounter);

app.post("/greeting", render.greetingMessage);

app.get("/greetings", render.namesGreeted);

app.get("/greetings/:username", render.namesGreetedTimes);

const PORT = process.env.PORT || 3012
app.listen(PORT, function () {
    console.log("App started at port", PORT)
});