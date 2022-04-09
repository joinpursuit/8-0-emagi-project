

// create a variable for the Web server api for emjois 
const API = 'https://pure-cove-46727.herokuapp.com/api/emojis';
// create an async request from the Web Server for that api emoji information 
fetch(API)
// .then request responce from JSON to JS form 
.then((response) => response.json())
//.then get data resonce emajo API data 
.then((data) => emaji(data))

// CREATE THE ENCODE SECTION USING LINES 18 - 32 IN HTML

// create a function with the emaji API data 
const emaji = (data) => {
    // create a variable for the form in the article id #encoded section 
const encodeForm = document.querySelector('#encode form');

// add an event listener on the form, when the user SUBMITS a form (EVENT) is the API data will be used to encode text from the user
encodeForm.addEventListener('submit', (event) => encode(event, data))

}

// AFTER YOU CREATE THE ENCODE SECTION - TAKE THE USER INPUT DATA LINE 26 HTML AND CONVERT INTO EMOJI FROM THE EMAJI API

// create a function that will encode text from the user into data from the emaji API
const encode = ((event, data) => {
    // prevent the page from refreshing 
    event.preventDefault()

    // create a variable equal to the text the user types into the HTML line 26 input tag with name"encode"
   const enInput = event.target.encode.value

//    create a variable equal to the text emaji API conversion 
   let encoded = '';
// MAIN ENCODING FUNCTIONALITY ^^^^^^^^^^^^^^^^^^^^^^^C
  
// FEATURE 
//     Call the p tag element inside the class result in the id encode section line 31 in HTML enResult 
   const enResult = document.querySelector('#encode .result p');

//    Call the class result in the id encode section line 29 in HTML the variable result 
   const result = document.querySelector('#encode .result ');

//    FEATURE #4 - IF THE TEXT FIELD IS EMPTY INCLUDEAN ERROR MESSAGE
//    if there is nothing typed in the input box 
   if(!enInput){
    // p tag from line 31 in HTML will say "Please input something"
    enResult.textContent = 'Please input something';
    // if the result 

    // FEATURE #5 IF THE TEXT FIELD IS EMPTY ADD A CLASS OF ERROR TO THE RESULT TAG
    result.classList.add('error')

    result.classList.remove('success')
    return
   }


//CONVERSION FROM TEXT TO EMOJI 

// Loop through the text input characters the user types into HTML line 26
   for(let char of enInput){
    //    if the character is equal to a space or comma 
       if(char === " " || char === ","){
        //    change that characther to an emoji 
           encoded += char;
       }
    //   loop through the emoji in the emaji API data  
    for(let emoji of data){

        // MATCH the lower case charatcher the user types to the key value letter from the emaji API object 
        if(char.toLowerCase() === emoji.letter){

            // change the cnversion emaji  letter to the key value symbol from the emaji API object 
            encoded += emoji.symbol;
        }
        console.log(encoded)
    }
   }
// now the result p tag from line 31 in HTML will change from charachters to emoji symbols
   enResult.textContent = encoded;

   result.classList.remove('error')
   result.classList.add('success')

//AFTER SUBMITTING CODE IF WAS SUCCESSFUL CLEAR THE TEXT FIELD 
//once the encode text to emjoi conversion is complete return a blank field to input next characters
   event.target.encode.value = "";
})

