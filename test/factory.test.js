import assert from "assert";
import Greet from "../functions/factory.js";
import queryFunction from "../queries/databaseQ.js";
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
      let greet = queryFunction(db);

      await greet.greetingQ("Ngomso", "isiXhosa");
      await greet.greetingQ("Mihla", "isiXhosa");
      
      let greetings = await greet.getCounterQ();
      assert.equal(2, greetings);
    } catch (err) {
      console.log(err);
    }
  });
  it("should be able to update a greeting", async function () {
    try {
      let greet = queryFunction(db);
     await greet.greetingQ("Ngomso", "isiXhosa");

     // greetings.number = "2";
      
     await greet.greetingQ("Ngomso", "isiXhosa");

      let updateGreet = await greet.getNumberQ("Ngomso");

      assert.deepEqual( 2 , updateGreet.number);
    } catch (err) {
      console.log(err);
    }
  });
  it("should return 2 when two different names are greeted", async function () {
   // let greeting = Greet(db);
    let greetQ = queryFunction(db)

    await greetQ.greetingQ("Zola", "isiXhosa");
    await greetQ.greetingQ("Yanga", "English");
    let counter = await greetQ.getCounterQ();
    assert.equal(2, counter);
  });

  describe("Testing greeting functionality", async function () {
    it("should return 'Molo, Thabo' when Thabo is entered and isiXhosa is selected", async function () {
      let greeting = Greet();
      let greetingQ = queryFunction(db);

      await greetingQ.greetingQ("Thabo", "isiXhosa");
      await greeting.getGreeting("Thabo", "isiXhosa");

      assert.equal("Molo, Thabo", await greeting.getMsg());
    });
    it("should return 'Hello, Huey' when Huey is entered and English is selected", async function () {
      let greeting = Greet();
      let greetingQ = queryFunction(db);

      await greetingQ.greetingQ("Huey", "English");
      await greeting.getGreeting("Huey", "English");

      assert.equal("Hello, Huey", await greeting.getMsg());
    });
    it("should return 'Hallo, Tristian' when Tristian is entered and Afrikaans is selected", async function () {
      let greeting = Greet();
      let greetingQ = queryFunction(db);

      await greetingQ.greetingQ("Tristian", "Afrikaans");
      await greeting.getGreeting("Tristian", "Afrikaans");

      assert.equal("Hallo, Tristian", await greeting.getMsg());
    });
    it("should return you have cleared the counter after you click clear button", async function () {
      let greetingQ = queryFunction(db);
      let greeting = Greet();

      await greetingQ.clearCounterQ();
      let msg = await greeting.getClrMsg()

      assert.equal("You have cleared the counter.", msg);
    })
    it("should return 0 after you cleared the counter", async function () {
       let greetingQ = queryFunction(db);
      
      await greetingQ.clearCounterQ()

      let newCounter = await greetingQ.getCounterQ()

      assert.equal(0, newCounter)
    })
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