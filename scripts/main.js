const BASE_URL = "https://pure-cove-46727.herokuapp.com/api/emojis"

const forms = document.querySelectorAll("form")
const form1 = forms[0];
const results = document.querySelectorAll(".result");
const result1 = results[0];
const input1 = document.querySelector("#encode-phrase");


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
   
}

function encodedPhrase(json,input1Text){
   const inputChar = input1Text.split("");//[a,d,f]
    const result1P = result1.querySelector("p");
    let output1 = ""; 
        for (const singleData in json){
            for (let i = 0; i < input1Text.length; i++){

            if (inputChar[i] === json[singleData].letter){//so close...it does not return all - just one for each uni inout
                output1 += `${json[singleData].symbol}`;
                //console.log(output)
            }

            }
        }
    result1P.textContent = output1;

    }







