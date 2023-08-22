import assert from "assert";
import Greet from "../functions/factory.js";
import pgPromise from "pg-promise";

const connectionString =
    process.env.DATABASE_URL || "postgres://greetingtable_user:EAyqRYtDCIU3qD6xdhFMLC8Jh40y8JlN@dpg-cjd1q2k5kgrc739hiflg-a.oregon-postgres.render.com/greetingtable?ssl=true";
  
const db = pgp(connectionString);
    
decribe("The greeting web app", function () {
    beforeEach(async function () {
        try {
            await db.none("TRUNCATE TABLE greetings RESTART IDENTITY CASCADE")
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
                number: "1"
            })
            await greet.add({
                username: 'Mihla',
                number: "1"
            })
            let greetings = await greet.all();
            assert.equal(2, greetings.length)
        } catch (err) {
            console.log(err)
    }
})
    it("should be able to update a greeting", async function () {
         let greet = Greet(db);
        let greetings = await greet.add({
           username: "Ngomso",
           number: "1",
        });
       
        greetings.number = "2";
        await greet.update(greetings)

        let updateGreet = await greet.getCounter(greetings.id)

        assert.deepEqual({
            username: "Ngomso",
            number: '2',
            id: 1
        }, updateGreet)
    })
     after(function () {
       db.$pool.end;
     });
})