export default function Greet(db) {

let msg = ''

  async function greetings(name, lang) {
    try {
      const selectQuery = "SELECT * FROM greetings";
      let valueExists = false;
      const rows = await db.any(selectQuery);
      rows.forEach((row) => {
        if (row.username === name) {
          valueExists = true;
          return; // Exit the loop early since we found the value
        }
      });
      if (valueExists === false) {
           if (lang && name){
            await db.none(
            "insert into greetings (username, number) values ($1, $2)",
            [name, 1]
          );
           }   
      }
      else if (valueExists === true) {
         if (lang && name){
          await db.none(
          "UPDATE greetings SET number = number +1 WHERE username = $1",
          [name]
        );
         }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

 async function clearCounter() {
        await db.none(
          "DELETE FROM greetings"
        )
      }
  
  async function getCounter() {
    let queryResult = await db.any("SELECT number FROM greetings");
    return queryResult.length;
  }

  async function getNames() {
    let names = await db.any("select username from greetings");
    return names 
  }

  async function getNumber(username) {
    let number = await db.one(
      "SELECT number FROM greetings WHERE username = $1",
      [username]
    );
    return number
  }

 async function getGreeting(name, lang) {
      if (lang && name) {
      if (lang == "isiXhosa") {
        msg = "Molo, " + name;
        } else if (lang == "English") {
         msg =  "Hello, " + name;
        } else if (lang == "Afrikaans") {
        msg = "Hallo, " + name;
        }
}else if(!name && !lang){
        msg = "Greetings!"
}else if(!name){
        msg = "Please enter your name."
}else if(!lang){
        msg = "Please select a language."
}
}

  async function getMsg(){
    return msg;
  }
  
      return {
        greetings,
        getCounter,
        clearCounter,
        getNames,
        getNumber,
        getGreeting,
        getMsg
      };
    }