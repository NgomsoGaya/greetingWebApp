import assert from "assert";
import Greet from "../functions/factory.js";
import queryFunction from "../queries/databaseQ.js";

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
});
