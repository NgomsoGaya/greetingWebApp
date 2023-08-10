import flash from "express-flash";
import session from "express-session";
import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import Greet from "./functions/factory.js";

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});

const app = express();

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.set("views", "./views");

const greet = Greet()
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

app.get('/', function (req, res) {
    // const greeting = greet.getGreeting();
    // req.flash('greeting', greeting)
    req.flash("greeting", greet.getGreeting());
    req.flash("nameError", greet.getNameError());
    req.flash("radioError", greet.getRadioError());
     req.flash("clearMsg", greet.getClearedCounter());

    res.render("index", {
      counter: greet.getCounter(),
      greeting: req.flash("greeting"),
      nameErr: req.flash("nameError"),
      radioErr: req.flash("radioError"),
      clearCounter: req.flash("clearMsg"),
      clearedCounter: greet.getClearedCounter2(),
      // nameAndRadioErr: greet.getNameAndRadioError(),
    });
});

app.post('/clearing', function (req, res) {
    greet.clearCounter();
    greet.clearedCounter();

    res.redirect('/')
});

app.post("/greeting", function (req, res) {
    greet.greetings(req.body.name, req.body.language);
    greet.nameError(req.body.name);
    greet.radioError(req.body.language);
   // greet.nameAndRadioError(req.body.name, req.body.language);
    //

    
  res.redirect("/");
});

app.get("/greetings", function (req, res) {

    res.render("names", {names: greet.names()})
   
});
//console.log(greet.names())

const PORT = process.env.PORT || 3012

app.listen(PORT, function () {
    console.log("App started at port", PORT)
});