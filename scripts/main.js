const BASE_URL = "https://pure-cove-46727.herokuapp.com/api/emojis"

let data;
const forms = document.querySelectorAll("form");
const results = document.querySelectorAll(".result");
const form1 = forms[0];
const result1 = results[0];
const input1 = document.querySelector("#encode-phrase");
const result1P = result1.querySelector("p");
//for searchEmoji
const form2 = forms[1];
const result2 = results[1];
const result2P = result2.querySelector("p");
const input2 = document.querySelector("#search-phrase");//input of search phrase
//for randomEmoji
const form3 = forms[2];
const result3 = results[2];
const result3P = result3.querySelector("p");
const input3 = document.querySelector("#category");
 //for form 4.
 const form4 = forms[3];
 const result4 = results[3];
 const result4P = result4.querySelector("p");
 const input4 = document.querySelector("#replace-text");


fetch(`${BASE_URL}`)
.then((response) => response.json())
.then((json) => {
/// console.log(json);   
data = json;
createOption(data);//creates options after page loads.
  })
.catch((err) => {
    console.log(err);
})

form1.addEventListener("submit", (event) => {
    event.preventDefault()
    const input1Text = input1.value;

if (input1Text === ""){
    result1.classList.remove("success");
    result1.classList.add("error");
    result1P.textContent = "Empty field";
} else {
    result1.classList.remove("error");
    result1.classList.add("success");
    encodedPhrase(data,input1Text);
    input1.value = "";
}

})


function encodedPhrase(data,input1Text){
    let output1 = ""; 
        
    for (let i = 0; i < input1Text.length; i++){
            for (const singleData in data){
                 if (input1Text[i] === data[singleData].letter){
                output1 += `${data[singleData].symbol}`;//could use replace and remove the ouput1.
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

        if (input2Text === ""){
            result2.classList.remove("success");
            result2.classList.add("error");
            result2P.textContent = "Empty field";
        } else {
            result2.classList.remove("error");
            result2.classList.add("success");
            searchEmoji(data,input2Text);
            input2.value = "";
        }
   });



//search and return the emoji back.
    function searchEmoji (data,input2Text){
       
        let output2 = ""; 
        for (const singleData in data){
            if (data[singleData].name.includes(input2Text)){
                //console.log("apple");
                output2 += `${data[singleData].symbol}`;
            }
        }
        result2P.textContent = output2;
    }


//loop through data. to get all UNI category.//what if it has 2 categories.
form3.addEventListener("submit", (event) => {
    event.preventDefault()
    // console.log(input1Text);
    const input3Text = input3.value//what the user selected.
   

    if (input3Text === ""){
        result3.classList.remove("success");
        result3.classList.add("error");
        result3P.textContent = "Empty field";
    } else {
        result3.classList.remove("error");
        result3.classList.add("success");
        randomEmoji(data,input3Text);
        //input3.slectedIndex = 0;//how to selected the first category options
    }

});

const createOption = (data) => {//filter category to make drop down. 

    const uniqueCategories = [];
    let category = [];
    
    for (const singleData in data){
        if (data[singleData].categories.length > 1) {
            for (let i = 0; i < data[singleData].categories.length; i++) {
                category.push(data[singleData].categories[i]);
            }
        } else {
            category.push(data[singleData].categories[0]);
        }
    }
    //category [] 90+ items. repeating category
    category.map((el) => {
        if (el === undefined) {}
        else if(!uniqueCategories.includes(el)) {
            uniqueCategories.push(el);//only push uni categories - no repeats. 
        } 
    })
    
    //console.log(uniqueCategories);//array of uni category

//create, update, append. each uni categories
for ( let i = 0; i < uniqueCategories.length; i++){
    const option = document.createElement('option');
    option.value = uniqueCategories[i];
    option.textContent = uniqueCategories[i].charAt(0).toUpperCase() + uniqueCategories[i].slice(1);

    input3.append(option);
}



//randomEmoji();
}
//person selects a category - we loop and return symbol with THAT category?. -- at random... so if there is 3 symbol with the same category- we pick one and return that. 


//return randomEmoji
function randomEmoji(data, input3Text){//tree
  let includedArr = [];//array of objects with the new user picked category

// what if they dont select anything? how to check for the first one
    for (const singleData in data){//{oashdiahdiuahsda,}
        const categoriesData = data[singleData].categories;
        //console.log(categoriesData);//unid. 
       if ((data[singleData].categories).includes(input3Text)){
           //push it into a new array. 
           includedArr.push(data[singleData]) ;// needs to be random -- this has to be an array. 
        }
    }
//console.log(includedArr);
//loop the data again? with tree category, return arr with that category. 

result3P.textContent = includedArr[Math.floor(Math.random()*includedArr.length)].symbol;

//use math.random. to selector one of the symbol. 

//result3p.textContent = 
}


form4.addEventListener("submit", (event) => {
    event.preventDefault()
    // console.log(input1Text);
    const input4Text = input4.value//what the user selected.
   // replaceText(data,input4Text);

    if (input4Text === ""){
        result4.classList.remove("success");
        result4.classList.add("error");
        result4P.textContent = "Empty field";
    } else {
        result4.classList.remove("error");
        result4.classList.add("success");
        replaceText(data,input4Text);
        input4.value = "";
        
    }

});
function replaceText(data, input4Text){
    const split4Input = input4Text.split(" ");
    let newStr = "";
    for(let i = 0; i < split4Input.length; i++){
        for(const singleData in data){
            if(split4Input[i].includes(data[singleData].name)){
            newStr = split4Input[i].substring(data[singleData].name.length);
            //substring - the length of the name = which is SHORTER - so its index 4 and onwards. gets cut out and set = newStr so newStr is just ING. 
            //console.log(newStr);
            input4Text = input4Text.replace(`${split4Input[i]}`,`${data[singleData].symbol + newStr}` );//add on the ING. 

            }
        }
    }
    result4P.textContent = input4Text
}








