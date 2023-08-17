export default function Greet(db) {


let msg = ''
let errorMsg1 = "" 
let errorMsg2 = ""
let errorMsg4 = ""
  
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
       
          await db.none(
            "insert into greetings (username, number) values ($1, $2)",
            [name, 1]
          );
         
          //console.log(greetingDisplay)
          //let data = await db.any("select * from greetings");
          //console.log(data);
      
      }
      else if (valueExists === true) {
        await db.none(
          "UPDATE greetings SET number = number +1 WHERE username = $1",
          [name]
        );
       // let data = await db.any("select * from greetings");
       // console.log(data);
      }
      return getGreeting(name, lang)
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

    console.log(number)
    return number
  }

  async function getGreeting(name, lang) {
        if (lang == "isiXhosa") {
          return "Molo, " + name;
        } else if (lang == "English") {
          return "Hello, " + name;
        } else if (lang == "Afrikaans") {
          return "Hallo, " + name;
        } 
  }
  
  //console.log(getNames())
  //     function names() {
  //       return greetingDisplay
  //     }

 

  //     function nameError(name) {
  //       if (!name) {
  //         errorMsg1 = "Please enter your name!";
  //       }
  //     }

  //     function getNameError() {
  //       return errorMsg1
  //     }

  //     function radioError(lang) {
  //       if (!lang) {
  //         errorMsg2 = "Please select a language!"
  //       }
  //     }

  //     function getRadioError() {
  //       return errorMsg2
  //     }

  //     function clearedCounter() {
        
  //       errorMsg4 = "You have cleared the counter!"
  //     }

  //     function getClearedCounter() {
  //       return errorMsg4
  //     }
  
  // function getClearedCounter2() {
  //       return greetingDisplay.length
  // }
  
      return {
        greetings,
        getCounter,
        clearCounter,
        getNames,
        getNumber,
        getGreeting,
        // names,
        // nameError,
        // getNameError,
        // radioError,
        // getRadioError,
        // clearedCounter,
        // getClearedCounter,
       
       // getClearedCounter2,
      };
    }