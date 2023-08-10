export default function Greet() {

let greetingDisplay = []
let msg = ''
//let errorMsg = ""
let counter = 0
    let errorMsg1 = "" 
    let errorMsg2 = ""
   // let errorMsg3 = ""
    let errorMsg4 = ""

    function greetings(name, lang) { 
        if (lang == 'isiXhosa' && checkForNames(greetingDisplay, name) == false) {
            if (name) {msg = "Molo, " + name}
                if(greetingDisplay && checkForNames(greetingDisplay, name) == false && name){
                    greetingDisplay.push({
                        names: name,
                        number: 1})
                }
               //console.log(greetingDisplay)
        }

        else if (lang == "English" && checkForNames(greetingDisplay, name) == false) {
          if (name) {msg = "Hello, " + name;}
          if (greetingDisplay && checkForNames(greetingDisplay, name) == false && name) {
            greetingDisplay.push({
              names: name,
              number: 1,});
          }
          //console.log(greetingDisplay)
        }

       else if (lang == "Afrikaans" && checkForNames(greetingDisplay, name) == false) {
          if (name) {msg = "Hallo, " + name;}
          if (greetingDisplay && checkForNames(greetingDisplay, name) == false && name) {
            greetingDisplay.push({
              names: name,
              number: 1,});
          }
          //console.log(greetingDisplay)
        }

        else if (checkForNames(greetingDisplay, name) == true) {
            if (name && lang == 'isiXhosa') { msg = "Molo, " + name; }
            else if (name && lang == "English") {msg = "Hello, " + name; }
            else if (name && lang == "Afrikaans") { msg = "Hallo, " + name; }
            
                     for (const obj of greetingDisplay) {
                       if (obj.names === name) {
                         obj.number += 1;
                       }
                     }
            
        }


       

        // else if (checkForNames(greetingDisplay, name) == true) {
        //   if (name) {msg = "Hello, " + name;}
        //   for (const obj of greetingDisplay) {
        //     if (obj.names === name) {
        //       obj.number += 1;
        //     }
        //   }
        // }


       

        // else if (checkForNames(greetingDisplay, name) == true) {
        //   if (name) {msg = "Hallo, " + name;}
        //   for (const obj of greetingDisplay) {
        //     if (obj.names === name) {
        //       obj.number += 1;
        //     }
        //   }
       // }
    }

function checkForNames(greetingDisplay, name) {
        if (greetingDisplay) {
         for (const obj of greetingDisplay) {
         if (obj.names === name) {
           return true; // Found a matching object
         }
       }
          return false; // No matching object found
        }
     }

    function names() {
        return greetingDisplay
    }

    function getGreeting(){
        return msg
        }
    
    function getCounter(){
            return greetingDisplay.length
        }

    function nameError(name){
        if(!name){
          
            errorMsg1 = "Please enter your name!";
            
        }
    } 

    function getNameError(){
        return errorMsg1
    }

    function radioError(lang){
        if (!lang) {
            
            errorMsg2 = "Please select a language!"
        }
    }

    function getRadioError(){
        return errorMsg2
    }

    // function nameAlreadyExist() {
        
    //           errorMsg = "Name is already greeted!"
    // }

    // function getNameAlreadyExist(){
    //      return errorMsg
    // }

    // function nameAndRadioError(name, lang){
    //     if (!name && !lang) {
          
    //         errorMsg3 = "Please enter your name and select a language!"
    //     } 
    // }
    // function getNameAndRadioError(){
    //     return errorMsg3
    // }

    function clearedCounter(){
        
        errorMsg4 = "You have cleared the counter!"
    }

    function getClearedCounter(){
        return errorMsg4
    }

    // function nameNotAllowed(name){
    //     errorMsg = "Numbers and special characters are not allowed!"
    // }

    // function getNameNotAllowed(){
    //     return errorMsg
    // }

    function clearCounter(){
     greetingDisplay.length = counter
    }

    function getClearedCounter2(){
        return greetingDisplay.length
    }
    return {
      greetings,
      getGreeting,
      getCounter,
      names,
      checkForNames,
      nameError,
      getNameError,
      radioError,
      getRadioError,
    //   nameAlreadyExist,
    //   getNameAlreadyExist,
    //   nameAndRadioError,
    //   getNameAndRadioError,
      clearedCounter,
      getClearedCounter,
    //   nameNotAllowed,
    //   getNameNotAllowed,
      clearCounter,
      getClearedCounter2,
    };
} 