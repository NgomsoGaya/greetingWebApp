export default function Greet() {

  let msg = ''
  let errmsg = ""
  let noErrmsg = ""
  const nameRegex = /^[A-Za-z\s]+$/;
   

  async function getClrMsg() {
       
        return "You have cleared the counter."; 
  }
  async function numberSpecialCharrErr() {
    
        return "Numbers and special characters are not allowed."
  }

  async function getGreeting(name, lang) {

     //let numbers = false; 
    if (nameRegex.test(name)) {
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

  async function noErrorMsg(name, lang) {
    if (name, lang) {
      if (!nameRegex.test(name)) {
        noErrmsg = "Numbers and special characters are not allowed";
      }
    }
  }

  async function getNoErrorMsg() {
    return noErrmsg;
  }
   async function getErrorMsg() {
     return errmsg;
   }

  async function getMsg(){
    return msg;
  }
  
      return {
        setErrorMsg,
        getErrorMsg,
        getGreeting,
        getMsg,
        getClrMsg,
        numberSpecialCharrErr,
        noErrorMsg,
        getNoErrorMsg,
      };
    }