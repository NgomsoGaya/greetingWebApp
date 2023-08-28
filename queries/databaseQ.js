//her are my functions for my queries
export default function queryFunction(db) {
  
    async function greetingQ(name, lang) {

      const selectQuery = "SELECT * FROM greetings";
      const rows = await db.any(selectQuery);
          
      let valueExists = false;

      const nameRegex = /^[A-Za-z\s]+$/;

      if (!nameRegex.test(name)) {
        console.log("Numbers and special characters are not allowed");
        return;
      }
      
      const normalizedInput = name.toLowerCase();

      
        rows.forEach((row) => {
            if (row.username.toLowerCase() === normalizedInput) {
              valueExists = true;
            return; // Exit the loop early since we found the value
          }
        });
      
      if (nameRegex.test(name)) {
         if (!valueExists && lang) {
           return await db.none(
            "insert into greetings (username, number) values ($1, $2)",
            [name, 1]
          );  
      }
      else if (valueExists && lang) {
         return await db.none(
          "UPDATE greetings SET number = number +1 WHERE username ~* $1",
          [name]
        );
      } 
      }
          
     
      
        
    }
  
  
    async function clearCounterQ() {
     return await db.none("DELETE FROM greetings");
    }

     async function getCounterQ() {
       let queryResult = await db.any("SELECT number FROM greetings");
       return queryResult.length;
     }

     async function getNamesQ() {
       let names = await db.any("select username from greetings");
       return names;
     }

     async function getNumberQ(username) {
       let number = await db.one(
         "SELECT number FROM greetings WHERE username = $1",
         [username]
       );
       return number;
     }
    
    return {
        greetingQ,
        clearCounterQ,
        getCounterQ,
        getNamesQ,
        getNumberQ
    }
}