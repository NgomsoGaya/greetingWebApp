//here are the factory functions for my render
import Greet from "../functions/factory.js";
import queryFunction from "../queries/databaseQ.js";
import pgPromise from "pg-promise";

const pgp = pgPromise();
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://greetingtable_user:EAyqRYtDCIU3qD6xdhFMLC8Jh40y8JlN@dpg-cjd1q2k5kgrc739hiflg-a.oregon-postgres.render.com/greetingtable?ssl=true";

const config = {
  connectionString: DATABASE_URL,
};

const db = pgp(config);
const greet = Greet(db);
const query = queryFunction(db)

export default function renderFactoy() {
  async function showCounter(req, res, next) {
    try {
      const counter = await query.getCounterQ();

      res.render("index", {
        counter,
      });
    } catch (err) {
      next(err);
    }
  }

  async function clearCounter(req, res, next) {
    try {
      await query.clearCounterQ();

      const message = await greet.getClrMsg();
      const counter = await query.getCounterQ();

      res.render("index", { clrMsg: message, counter });
    } catch (err) {
      next(err);
    }
  }

  async function greetingMessage(req, res, next) {
    try {
      let username = req.body.name;
      let language = req.body.language;

      let error = "";
      

      if (!username || !language) {
        await greet.setErrorMsg(username, language);
        error = await greet.getErrorMsg();
      }

      let greeting = "";
      let NoSpCharMsg = "";
      const nameRegex = /^[A-Za-z\s]+$/;

      if (username && language) {
        await query.greetingQ(username, language);
        await greet.getGreeting(username, language);
        greeting = await greet.getMsg();
      }
      if (username && language && !nameRegex.test(username)) {
            await greet.noErrorMsg(username, language);
            NoSpCharMsg = await greet.getNoErrorMsg();
      }2
      
      const counter = await query.getCounterQ();

      res.render("index", { greeting, counter, error, NoSpCharMsg});
    } catch (err) {
      next(err);
    }
  }
  async function namesGreeted(req, res, next) {
    try {
      let nameInstance = await query.getNamesQ();

      res.render("names", { names: nameInstance });
    } catch (err) {
      next(err);
    }
  }
  async function namesGreetedTimes(req, res, next) {
    try {
      let numberInstance = await query.getNumberQ(req.params.username);
      res.render("number", {
        number: numberInstance,
        name: req.params.username,
      });
    } catch (err) {
      next(err);
    }
  }
  return {
    showCounter,
    clearCounter,
    greetingMessage,
    namesGreeted,
    namesGreetedTimes,
  };
}