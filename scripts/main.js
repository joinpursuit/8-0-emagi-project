const BASE_URL = "https://pure-cove-46727.herokuapp.com/api/emojis"

const forms = document.querySelectorAll("form");
const results = document.querySelectorAll(".result");
const form1 = forms[0];
const result1 = results[0];
const input1 = document.querySelector("#encode-phrase");
//for searchEmoji
const form2 = forms[1];
const result2 = results[1];
const input2 = document.querySelector("#search-phrase");//input of search phrase


form1.addEventListener("submit", (event) => {
    event.preventDefault()
    // console.log(input1Text);
    const input1Text = input1.value
    getEmagiData(input1Text);

})


function getEmagiData(input1Text){
    fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .then((json) => {
   /// console.log(json);   
   encodedPhrase(json,input1Text);
      })
    .catch((err) => {
        console.log(err);
    })
    input1.value = ""
}

function encodedPhrase(json,input1Text){
   const inputChar = input1Text.split("");//[a,d,f]
    const result1P = result1.querySelector("p");
    let output1 = ""; 
        
    for (let i = 0; i < input1Text.length; i++){
            for (const singleData in json){
                 if (inputChar[i] === json[singleData].letter){
                output1 += `${json[singleData].symbol}`;
                //console.log(output)
            }

            }
        }
    result1P.textContent = output1;

    }



    form2.addEventListener("submit", (event) => {
        event.preventDefault()
        // console.log(input1Text);
        const input2Text = input2.value
        getEmagiData2(input2Text);
   })

//
function getEmagiData2(input2Text){
    fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .then((json) => {
   
   //runs the search.
    searchEmoji(json,input2Text);

    })
    .catch((err) => {
        console.log(err);
    })
   input2.value = "";
}

//search and return the emoji back.
    function searchEmoji (json,input2Text){
        const result2P = result2.querySelector("p");
        let output2 = ""; 
        for (const singleData in json){
            if (json[singleData].name.includes(input2Text)){
                //console.log("apple");
                output2 += `${json[singleData].symbol}`;
            }

        }
        result2P.textContent = output2;
    }









