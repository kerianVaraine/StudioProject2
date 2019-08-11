let synth = window.speechSynthesis;

//parse content from json file, then populate page with buttons from the selected section.
// From:
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
//turn this into a function, where params are location to pull from.
let phrases;
let contentLocation = "./content/categories.json";

let request = new XMLHttpRequest();

request.open('GET', contentLocation);
request.responseType = 'json';
request.send();
request.onload = function () {
    phrases = request.response;
}


// end of json importing
//
//
// adds button with all functionality and name
let getButtonText = function (pCat, index) {
    let button = document.createElement("button"); //create button element
    button.innerText = pCat[index][0]; //add button text from json file
    button.className = "entry"; //assign class/css/styling
    button.onclick = function () { //onclick functionality
        synth.speak(new SpeechSynthesisUtterance(pCat[index][1])); //speak phrase from json
        removeEntries(); //remove buttons once clicked
        document.getElementsByClassName("section")[0].focus(); //return focus to categories
    };
    document.getElementById("entries").appendChild(button); //adds all butons to page.
}

// populates the content div with buttons and stores the speech synth inside the button
let populateEntries = function (category) {
    // make reference to json.category;
    let pCat; // ref to json category array
    let arrLength;
    // this selects the catagory inside the json file to loop through and populate buttons
    switch (category) {
        case ("basic"):
            pCat = phrases.basic;
            break;
        case ("am"):
            pCat = phrases.am;
            break;
        case ("pain"):
            pCat = phrases.pain;
            break;
        case ("need"):
            pCat = phrases.need;
            break;
        case ("conversation"):
            pCat = phrases.conversation;
            break;
    }
    arrLength = pCat.length;
    //loop to populate page with json info
    for (let i = 0; i < arrLength; i++) {
        getButtonText(pCat, i);
    }
}

//remove buttons in entry div
function removeEntries() {
    let elements = document.getElementsByClassName("entry");
    while (elements.length > 0) {
        elements[0].parentElement.removeChild(elements[0]);
    }
}

///Page specific, using ids of section buttons to create phrase buttons

//create array of section buttons (ie: top nav)
const sectionButtons = document.getElementsByClassName("section");
const secButtArr = Array.from(sectionButtons);
//apply onclick funtion to each button
for (let i = 0; i < secButtArr.length; i++) {
    secButtArr[i].onfocus = function () {
        removeEntries();
        populateEntries(secButtArr[i].id);
    };
    secButtArr[i].onclick = function () {
        removeEntries();
        populateEntries(secButtArr[i].id);
        document.getElementsByClassName("entry")[0].focus(); //focus on basic phrase button
    }
}

//assign shortcuts button 
// document.getElementById("assignShortCut").onclick = function () {
//     if (leftKey == undefined) {
//         assignShortcut();
//     }
//     document.getElementById("assignShortCut").innerText = "reset shortcuts";
//     resetShortcuts();
// }