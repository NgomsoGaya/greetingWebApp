import assert from "assert";
import Greet from "../functions/factory.js";
import queryFunction from "../queries/databaseQ.js";

// import pgPromise from "pg-promise";
// const pgp = pgPromise();

// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgres://greetingtable_user:EAyqRYtDCIU3qD6xdhFMLC8Jh40y8JlN@dpg-cjd1q2k5kgrc739hiflg-a.oregon-postgres.render.com/greetingtable?ssl=true";

// const db = pgp(connectionString);

describe("Testing my greeting App",async function () {
  describe("Testing name and language error",async function () {
    it("Should return please enter a name and select language when greet button is pressed with no prior inputs",async function () {
      let greeting =  Greet();
      await greeting.setErrorMsg("", "");

      assert.equal(await greeting.getErrorMsg(),"Please enter a name and select a language.");
    });
  });
  describe("Testing name error", async function () {
    it("should return please enter your name when radio is selected and greet is pressed",async function () {
      let greeting = Greet();
      await greeting.setErrorMsg("", "isiXhosa");

      assert.equal("Please enter your name.", await greeting.getErrorMsg());
    });
  });

  describe("Testing radio error",async function () {
    it("should return please select a language when no radio is selected",async function () {
      let greeting = Greet();
      await greeting.setErrorMsg("Ngomso", "");

      assert.equal("Please select a language.", await greeting.getErrorMsg());
    });
  });

  // describe("Testing name already exist error", function () {
  //   it("should return name already exist when a name has been greeted before", function () {
  //     let greeting = Greet();
  //     greeting.nameAlreadyExist();

  //     assert.equal("Name is already greeted!", greeting.getNameAlreadyExist());
  //   });
  // });

  // describe("Testing name not allowed error", function () {
  //   it("should return name is not allowed if name has numbers or special characters", function () {
  //     let greeting = Greet();
  //     greeting.nameNotAllowed();

  //     assert.equal(
  //       "Numbers and special characters are not allowed!",
  //       greeting.getNameNotAllowed()
  //     );
  //   });
  // });
//  describe("Testing greeting functionality",async function () {
//     it("should return 'Molo, Thabo' when Thabo is entered and isiXhosa is selected",async function () {
//       let greeting = Greet();
//       let greetingQ = queryFunction(db)

//       await greetingQ.greetingQ("Thabo", "isiXhosa");
//       await greeting.getGreeting("Thabo", "isiXhosa")

//       assert.equal("Molo, Thabo",await greeting.getMsg());
//     });
//     it("should return 'Hello, Huey' when Huey is entered and English is selected",async function () {
//       let greeting = Greet();
//       let greetingQ = queryFunction(db);

//       await greetingQ.greetingQ("Huey", "English");
//       await greeting.getGreeting("Huey", "English")

//       assert.equal("Hello, Huey",await greeting.getMsg());
//     });
//     it("should return 'Hallo, Tristian' when Tristian is entered and Afrikaans is selected",async function () {
//       let greeting = Greet();
//       let greetingQ = queryFunction(db);

//       await greetingQ.greetingQ("Tristian", "Afrikaans");
//       await greeting.getGreeting("Tristian", "Afrikaans")
      
//       assert.equal(
//         "Hallo, Tristian",
//         await greeting.getMsg()
//       );
//     });
//   });

  // describe("Testing the counter",async function () {
  //   it("should return 2 when two different names are greeted",async function () {
  //     let greeting = Greet();
  //     await greeting.greetings("Zola", "isiXhosa");
  //     await greeting.greetings("Yanga", "English");
  //     let counter = await greeting.getCounter()
  //     assert.equal(2, counter);
  //   });
  // });

 


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
});
