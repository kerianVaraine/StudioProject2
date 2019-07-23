let synth = window.speechSynthesis;

//parse content from json file, then populate page with buttons from the selected section.
// From:
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

//turn this into a function, where params are location to pull from.
let phrases;
let contentLocation = "../content/phrases.json";
let request = new XMLHttpRequest();
request.open('GET', contentLocation);
request.responseType = 'json';
request.send();

request.onload = function () {
    phrases = request.response;
}

// adds button with all functionality and name
let getButtonText = function (pCat, index) {
    let button = document.createElement("button");
    button.innerText = pCat[index][0];
    button.className = "largeButton , entry";
    button.onclick = function () {
        synth.speak(new SpeechSynthesisUtterance(pCat[index][1]));
        removeEntries();
        document.getElementsByClassName("section")[0].focus();
    }; //makes is speak aloud when pressed
    document.getElementById("entries").appendChild(button); //adds to page.
}

// populates the content div with buttons and stores the speech synth inside the button
let populateEntries = function (category) {
    //make reference to json.category;
    let pCat;
    let arrLength;
    switch (category) {
        case("common"):
            pCat = phrases.common;
            break;
        case ("comfort"):
            pCat = phrases.comfort;
            break;
        case ("feel"):
            pCat = phrases.feel;
            break;
        case ("entertainment"):
            pCat = phrases.entertainment;
            break;
    }
    arrLength = pCat.length;
    console.log(arrLength);
    for (let i = 0; i < arrLength; i++) {
        getButtonText(pCat, i);
    }
}

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
        document.getElementsByClassName("entry")[0].focus(); //focus on first phrase button
    }
}

//assign shortcuts button
document.getElementById("assignShortCut").onclick = function () {
    if (leftKey == undefined) {
        assignShortcut();
    }
    document.getElementById("assignShortCut").innerText = "reset shortcuts";
    resetShortcuts();
}