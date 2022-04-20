const url = "https://pure-cove-46727.herokuapp.com/api/emojis";

let emojis;

function getEmojis() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            emojis = data;
            getCategories(emojis);
            console.log(emojis);
        })
}
getEmojis();

// ------------------- Encode Phrase ------------------- //

const encodeForm = document.querySelector("#encode form");
const resultSection = document.querySelector('.result p');

encodeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.encode.value;
    const inputArray = input.split('');

    if (!input) {
        resultSection.textContent = 'Please enter search value';
        resultSection.classList.add('error');
    } else {
        emojis.filter(el => {
            for (let i = 0; i < inputArray.length; i++) {
                if (inputArray[i].toLowerCase() === el.letter) {
                    inputArray[i] = el.symbol;
                }
            }
        })
        resultSection.textContent = inputArray.join('');
        resultSection.classList.add('success');
        encodeForm.reset();
    }
});

// ------------------- Search for Emoji ------------------- //
const searchForm = document.querySelector("#search form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = event.target.search.value;
    // console.log(text);
    const originalPTag = document.querySelector("#search .result p");

    if (!text.length) {
        originalPTag.textContent = 'Please enter search value';
        originalPTag.classList.add('error');
    } else {
        let foundEmoji = [];
        for (let i = 0; i < emojis.length; i++) {
            if (emojis[i].name.includes(text)) {
                foundEmoji.push(emojis[i]);
            }
        }
        originalPTag.textContent = foundEmoji
            .map((x) => x.symbol)
            .slice(",")
            .join("");
        originalPTag.classList.add('success');
        searchForm.reset();
    }
});


// ------------------- Random Emoji by Category ------------------- //
// -------------- Step 1 : Selected Options ----------------- //
const selected = document.getElementById('category');
const categoryResult = document.querySelector('#random .result p');

selected.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if(selectedValue === selected.querySelector('option').value){
        categoryResult.textContent = 'Please enter search value';
        categoryResult.classList.add('error')
    }
    searchByCategory(selectedValue);
})

function searchByCategory(selectedValue){
    
    const randomizerBtn = document.querySelector("#random button");

    let emptyArr = [];    

    for (let e of emojis) {
        let variable = e.categories;
        if(variable.includes(selectedValue)){
            emptyArr.push(e.symbol);
        }
    }

    randomizerBtn.addEventListener('click', (event) => {
        event.preventDefault();
        categoryResult.textContent = emptyArr[Math.floor(Math.random() * emptyArr.length)]
        categoryResult.classList.add('success');
    })
}

// ------------------------- Step 2 : Form our Categories ----------------------- //
function getCategories(emojis) {
    let listedCategories = [];
    for (let e in emojis) {
        listedCategories.push(emojis[e].categories);
    }
    const noDups = [...new Set(listedCategories.flat())]; //> Creates an array of non-duplicate values in our api 
    makeCategories(noDups); //> Creates categories using our API

}

function makeCategories(noDups){
    const dropDown = document.querySelector("#random form select");
    for(i = 0; i < noDups.length - 1; i++){
        let capitalWord = noDups[i][0].toUpperCase() + noDups[i].slice(1);
        dropDown.innerHTML += `<option value=${noDups[i]}>${capitalWord}</option>`;
    }
}

// ------------------- Replace Text ------------------- //
const replaceform = document.querySelector("#replace form");
const replaceText = document.querySelector('#replace .result p');

replaceform.addEventListener("submit", (event) => {
    event.preventDefault();
    const string = event.target.replace.value;
    const stringArr = string.split(' ');

    if(!string){
        replaceText.textContent = 'Please enter search value';
        replaceText.classList.add('error');
    } else{
        emojis.filter(emoji => {
            for(let i = 0; i < stringArr.length; i++){
                if(stringArr[i].includes(emoji.name)){
                    stringArr[i] = stringArr[i].replace(emoji.name, emoji.symbol)
                }
            }
        })
        replaceText.textContent = stringArr.join(' ');
        replaceText.classList.add('sucess');
    }
})




