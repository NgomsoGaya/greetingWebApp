import assert from "assert";
import Greet from "../functions/factory.js";
import pgPromise from "pg-promise";
const pgp = pgPromise();

const connectionString =
    process.env.DATABASE_URL || "postgres://greetingtable_user:EAyqRYtDCIU3qD6xdhFMLC8Jh40y8JlN@dpg-cjd1q2k5kgrc739hiflg-a.oregon-postgres.render.com/greetingtable?ssl=true";
  
const db = pgp(connectionString);
    
describe("The greeting web app", function () {
  this.timeout(20000);

  beforeEach(async function () {
    try {
      await db.none("TRUNCATE TABLE greetings RESTART IDENTITY CASCADE");
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
  it("shoud be able to add a greeting", async function () {
    try {
      let greet = Greet(db);

      await greet.add({
        username: "Ngomso",
        number: "1",
      });
      await greet.add({
        username: "Mihla",
        number: "1",
      });
      let greetings = await greet.all();
      assert.equal(2, greetings.length);
    } catch (err) {
      console.log(err);
    }
  });
  it("should be able to update a greeting", async function () {
    try {
      let greet = Greet(db);
      let greetings = await greet.add({
        username: "Ngomso",
        number: "1",
      });

      greetings.number = "2";
      await greet.update(greetings);

      let updateGreet = await greet.getCounter(greetings.id);

      assert.deepEqual(
        {
          username: "Ngomso",
          number: "2",
          id: 1,
        },
        updateGreet
      );
    } catch (err) {
      console.log(err);
    }
  });
  it("should return 2 when two different names are greeted", async function () {
    let greeting = Greet(db);
    await greeting.greetings("Zola", "isiXhosa");
    await greeting.greetings("Yanga", "English");
    let counter = await greeting.getCounter();
    assert.equal(2, counter);
  });

  // describe("Testing the counter", function () {
  //   it("should return 9 when four more names are greeted", function () {
  //     let greeting = Greet();
  //     greeting.greetings("Zozi", "isiXhosa");
  //     greeting.greetings("Yona", "English");
  //     greeting.greetings("Zizo", "isiXhosa");
  //     greeting.greetings("Nomsa", "English");

  //     assert.equal(9, greeting.getCounter());
  //   });
  // });
  // describe("Testing A greeted name", function () {
  //   it("should return 9 when a name is greeted again", function () {
  //     let greeting = Greet();
  //     greeting.greetings("Zozi", "isiXhosa");
  //     greeting.greetings("Yona", "English");
  //     greeting.greetings("Zizo", "isiXhosa");
  //     assert.equal(9, greeting.getCounter());
  //   });
  // });

  // describe("Testing the reset button", function () {
  //   it("should return 0 when the reset button is clicked", function () {
  //     let greeting = Greet();

  //     greeting.clearCounter();
  //     assert.equal(0, greeting.getClearedCounter2());
  //   });
  //   it("should return you have cleared the counter when the reset button is clicked", function () {
  //     let greeting = Greet();

  //     greeting.clearedCounter();
  //     assert.equal(
  //       "You have cleared the counter!",
  //       greeting.getClearedCounter()
  //     );
  //   });
  // });

  // describe("Testing greeting after clearing", function () {
  //   it("should return 1 when a name is greeted", function () {
  //     let greeting = Greet();
  //     greeting.greetings("Zozi", "isiXhosa");
  //     assert.equal(1, greeting.getCounter());
  //   });

  //   it("should return 5 when 4 more names are greeted", function () {
  //     let greeting = Greet();
  //     greeting.greetings("lisa", "isiXhosa");
  //     greeting.greetings("loyiso", "isiXhosa");
  //     greeting.greetings("dinga", "isiXhosa");
  //     greeting.greetings("bonga", "isiXhosa");
  //     assert.equal(5, greeting.getCounter());
  //   });
  // });

  after(function () {
    db.$pool.end;
  });
})