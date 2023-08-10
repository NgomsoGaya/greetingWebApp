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

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: "main" }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render("index", {
        counter: greet.getCounter(),
        greeting: greet.getGreeting()
    })
});

app.post('/greeted', function (req, res) {
    
    res.redirect('/')
});

app.post("/greeting", function (req, res) {
    greet.greetings(req.body.name, req.body.language);

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