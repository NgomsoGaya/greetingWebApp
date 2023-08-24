export default function Greet(db) {

  let msg = ''
  //let clrMsg = "";
  let errmsg = ""

  async function greetings(name, lang) {
    try {
      const selectQuery = "SELECT * FROM greetings";
      let valueExists = false;
      const rows = await db.any(selectQuery);

      const nameRegex = new RegExp(name, 'i')
      rows.forEach((row) => {
        if (nameRegex.test(row.username)) {
          valueExists = true;
          return; // Exit the loop early since we found the value
        }
      });
      if (!valueExists && lang) {
            await db.none(
            "insert into greetings (username, number) values ($1, $2)",
            [name, 1]
          );  
      }
      else if (valueExists && lang) {
          await db.none(
          "UPDATE greetings SET number = number +1 WHERE username ~* $1",
          [name]
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

 async function clearCounter() {
        await db.none(
          "DELETE FROM greetings"
        )
        //clrMsg = "You have cleared the counter.";
      }
 
  async function getClrMsg() {
       
        return "You have cleared the counter."; 
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
        msg = "Hello, " + name;
      } else if (lang == "Afrikaans") {
        msg = "Hallo, " + name;
      }
    } 
  } 
  async function setErrorMsg(name, lang) {
     if (!name && !lang) {
      errmsg = "Please enter a name and select a language.";
    }
    else if(!name){
        errmsg = "Please enter your name."
    }else if(!lang){
        errmsg = "Please select a language."
}
  }
   async function getErrorMsg() {
     return errmsg;
   }

  async function getMsg(){
    return msg;
  }
  
      return {
        greetings,
        getCounter,
        clearCounter,
        setErrorMsg,
        getErrorMsg,
        getNames,
        getNumber,
        getGreeting,
        getMsg,
        getClrMsg
      };
    }