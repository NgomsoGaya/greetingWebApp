import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import Greet from "./functions/factory";

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

