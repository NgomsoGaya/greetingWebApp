import flash from "express-flash";
import session from "express-session";
import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import Greet from "./functions/factory.js";
import Cookie  from "express-session";

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


app.get('/', async function (req, res) {
  
  const counter = await greet.getCounter()
 // const message = await greet.getClrMsg();
  // const greeting = await greet.getMsg()
  //greet.getMsg(),
  //const greeted = await greet.greetings(req.body.name, req.body.language)

    res.render("index", {
      counter,
     // clrMsg: message,
    });
    
});

app.post('/clearing',async function (req, res) {
    await greet.clearCounter();
  //const counter = await greet.getCounter();
 
  const message = await greet.getClrMsg()
  const counter = await greet.getCounter();
    //res.render("index", {clrMsg})
    res.render("index", {clrMsg:message, counter})
});

// app.use(session({
//   secret:"just a secret key used as encryption",
//   resave: false,
//   saveUninitialized: true
// }))
 
app.post("/greeting", async function (req, res) {
  
   let username =req.body.name
   let language = req.body.language
  
  // let previousMessage = req.cookies.previousMessage || "";
  
  // let newMessage = await generateNewMessage(previousMessage);
  let error = ""
  if (!username || !language) {
    await greet.setErrorMsg(username, language)
    error = await greet.getErrorMsg()
  }
  // res.cookie('previosMessage', newMessage.identifier)
  let greeting = "";

  if (username && language) {
    await greet.greetings(username, language)
    await greet.getGreeting(username, language)
    greeting = await greet.getMsg()
  }
 
    const counter = await greet.getCounter()
    // const clrMsg = await greet.clearCounter();
    //const clrMsg = await greet.clrMsg()

  res.render("index", {greeting, counter, error});
});

app.get("/greetings", async function (req, res) {
  
   let nameInstance = await greet.getNames()

   res.render("names", {names: nameInstance})
   
});

app.get("/greetings/:username", async function (req, res) {
  console.log(req.params.username);
  let numberInstance = await greet.getNumber(req.params.username);
  res.render("number", {number: numberInstance, name: req.params.username});
});

const PORT = process.env.PORT || 3012

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});