const emjLink = "https://pure-cove-46727.herokuapp.com/api/emojis";

let apiData;
function getApiData() {
  fetch(emjLink)
    .then((response) => response.json())
    .then((json) => (apiData = json))
    .then((apiData) => getCategory(apiData));
}
getApiData();
function getCategory(apiData) {
  const category = [];
  for (let i = 0; i < apiData.length; i++) {
    for (let j = 0; j < apiData[i].categories.length; j++) {
      if (apiData[i].categories) {
        category.push(apiData[i].categories[j]);
      }
    }
  }
  const categorySet = new Set(category);
  const options = document.querySelector("select");
  categorySet.forEach((category) => {
    const option = document.createElement("option");
    option.setAttribute("value", `${category}`);
    let str = `${category}`;
    let str2 = str.charAt(0).toUpperCase() + str.slice(1);
    option.textContent = str2;
    options.append(option);
  });
  return categorySet;
}

const encodePhrase = document.querySelector("#encode");
encodePhrase.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputText = event.target.encode.value;
  const resultElement = event.target.parentNode.querySelector(".result");
  const encodeResult = event.target.parentNode.querySelector("aside p");
  getEncodePhrase(inputText, resultElement, encodeResult);
  event.target.encode.value = "";
});

function getEncodePhrase(inputText, resultElement, encodeResult) {
  let encodeString = "";

  if (inputText.length === 0) {
    resultElement.classList.remove("success");
    resultElement.classList.add("error");
    encodeString = "Error : No input found";
  }

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === "," || inputText[i] === " ") {
      encodeString += inputText[i];
    }
    for (let j = 0; j < apiData.length; j++) {
      if (inputText[i].toLowerCase() === apiData[j].letter) {
        encodeString += apiData[j].symbol;
        resultElement.classList.remove("error");
        resultElement.classList.add("success");
      }
    }
  }
  encodeResult.textContent = encodeString;
}

const searchPhrase = document.querySelector("#search");
searchPhrase.addEventListener("submit", (event) => {
  event.preventDefault();
  const resultElement = event.target.parentNode.querySelector(".result");
  const searchResult = event.target.parentNode.querySelector("aside p");

  const searchInput = event.target.search.value;
  getsearchPhrase(searchInput, resultElement);
  searchResultStr = getsearchPhrase(searchInput);
  createSearchResult(searchResultStr, resultElement, searchInput, searchResult);
  event.target.search.value = "";
});

function createSearchResult(searchResultStr, resultElement, searchInput, searchResult) {

  if (searchResultStr) {
    resultElement.classList.remove("error");
    resultElement.classList.add("success");
    searchResult.textContent = searchResultStr;
  }

  if (searchInput.length === 0) {
    searchResultStr = "Error: Please enter something";
    resultElement.classList.remove("success");
    resultElement.classList.add("error");
    searchResult.textContent = searchResultStr;
  }
}

function getsearchPhrase(searchInput) {
  let searchResultStr = "";

  for (let i = 0; i < apiData.length; i++) {
    if (apiData[i].name.includes(searchInput)) {
      searchResultStr += apiData[i].symbol;
    }
  }
  return searchResultStr;
}

const randomPhrase = document.querySelector("#random");
randomPhrase.addEventListener("submit", (event) => {
  event.preventDefault();
  const resultElement = event.target.parentNode.querySelector(".result");
  const randomResult = event.target.parentNode.querySelector("aside p");
  const randomInput = event.target.category.value;
  getRandomPhrase(randomInput, resultElement);
  randomResultArr = getRandomPhrase(randomInput);
  createRandomResult(randomResultArr, resultElement, randomInput, randomResult);
  event.target.reset(category);
});

function getRandomPhrase(randomInput) {
  let randomResultArr = [];
  for (let i = 0; i < apiData.length; i++) {
    if (apiData[i].categories.includes(randomInput)) {
      randomResultArr.push(apiData[i].symbol);
    }
  }
  return randomResultArr;
}

function createRandomResult(randomResultArr, resultElement, randomInput, randomResult) {

  if (randomResultArr) {
    resultElement.classList.remove("error");
    resultElement.classList.add("success");
    randomResult.textContent =
      randomResultArr[Math.floor(Math.random() * randomResultArr.length)];
  }

  if (randomInput === "-- Choose a Category --") {
    randomResultArr = "Error: Please select category";
    resultElement.classList.remove("success");
    resultElement.classList.add("error");
    randomResult.textContent = randomResultArr;
  }
}

const replaceText = document.querySelector("#replace");
replaceText.addEventListener("submit", (event) => {
  event.preventDefault();
  const replaceInput = event.target.replace.value;
  const resultElement = event.target.parentNode.querySelector(".result");
  const replaceResult = event.target.parentNode.querySelector("aside p");
  getReplacePhrase(replaceInput, resultElement);
  replaceResultArr = getReplacePhrase(replaceInput);
  createReplaceResult(replaceResultArr, resultElement, replaceInput, replaceResult);
  event.target.replace.value = "";
});

function getReplacePhrase(replaceInput) {

  const textReplace = replaceInput.split(" ");
  let replaceResultArr = textReplace;

  for (let i = 0; i < textReplace.length; i++) {
    for (let j = 0; j < apiData.length; j++) {
      if (textReplace[i].includes(apiData[j].name))
        textReplace[i] = textReplace[i].replace(apiData[j].name, apiData[j].symbol);
    }
  }

  return replaceResultArr;
}
function createReplaceResult(replaceResultArr, resultElement, replaceInput, replaceResult) {

  if (replaceResultArr) {
    resultElement.classList.remove("error");
    resultElement.classList.add("success");
    replaceResult.textContent = replaceResultArr.join(" ");
  }

  if (replaceInput.length === 0) {
    replaceResultArr = "Error: Please enter text";
    resultElement.classList.remove("success");
    resultElement.classList.add("error");
    replaceResult.textContent = replaceResultArr;
  }
}
