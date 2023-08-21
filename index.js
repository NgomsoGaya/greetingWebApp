import flash from "express-flash";
import session from "express-session";
import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import Greet from "./functions/factory.js";

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
 // initialise session middleware - flash-express depends on it
  app.use(session({
    secret : "greeting with routes",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
   app.use(flash());
   app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: "main" }));
app.use(bodyParser.json());

app.get('/', async function (req, res) {
  

    //const greeting = await greet.greetings();
    //req.flash('greeting', greeting)
    //req.flash("greeting", greet.getGreeting());
    // req.flash("nameError", greet.getNameError());
    // req.flash("radioError", greet.getRadioError());
    //  req.flash("clearMsg", greet.getClearedCounter());

    res.render("index", {
     
     greeting: await greet.greetings(req.body.name, req.body.language),
     counter: await greet.getCounter(),
    
    });
    // console.log(greet.greetings(req.body.name, req.body.language))
});

app.post('/clearing', function (req, res) {
    greet.clearCounter();

    res.redirect('/')
});

app.post("/greeting",async function (req, res) {
    greet.greetings(req.body.name, req.body.language);
    greet.getGreeting(req.body.name, req.body.language)
  // const username = req.body.username
  // const number = req.body.number

  res.redirect("/");
});

app.get("/greetings", async function (req, res) {
  
   let nameInstance = await greet.getNames()

   res.render("names", {names: nameInstance})
   
});

app.get("/greetings/:username", async function (req, res) {
 // let nameInstance = await greet.getNames();
  console.log(req.params.username);
  let numberInstance = await greet.getNumber(req.params.username);
  res.render("number", {number: numberInstance, name: req.params.username});
});
//console.log(greet.names())

const PORT = process.env.PORT || 3012

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});