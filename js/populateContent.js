//Main var for subcategory listing
let subCategory = "basic";

//Text-to-Speech, browser based.
let synth = window.speechSynthesis;
//BUTTON POPULATION SCRIPTS
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



// adds button with all functionality and name
let getButtonText = function (pCat, index, categoryName) {
    let button = document.createElement("button"); //create button element
    button.innerText = pCat[index][0]; //add button text from json file
    button.className = "entry"; //assign class/css/styling
    //BUTTON ON CLICK
    button.onclick = function () {
        synth.speak(new SpeechSynthesisUtterance(pCat[index][1])); //speak phrase from json
        subCategory = pCat[index][0];//set subCategory global variable to populate the right buttons.
        removeEntries(); //remove buttons once clicked
        if(categoryName != "basic") {
            getPage("phrases");
        }
        //document.getElementsByClassName("section")[0].focus(); //return focus to categories Messes with things.
    };
    document.getElementById("entries").appendChild(button); //adds all butons to page.
}

// populates the content div with buttons and stores the speech synth inside the button
let populateEntries = function (category) {
    // make reference to json.category;
    let pCat; // ref to json category array
    let arrLength;
    // this selects the category inside the json file to loop through and populate buttons
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
    //loop to populate page with json info, and main category name for page choice
    for (let i = 0; i < arrLength; i++) {
        getButtonText(pCat, i, category);
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

let populateButtons = function () {
    //create array of section buttons (ie: top nav)
    const sectionButtons = document.getElementsByClassName("section");
    const secButtArr = Array.from(sectionButtons);
    //apply onclick funtion to each button
    for (let i = 0; i < secButtArr.length; i++) {
        secButtArr[i].onfocus = function () {
            removeEntries();
            populateEntries(secButtArr[i].id);
            console.log(secButtArr[i].id);
        };
        secButtArr[i].onclick = function () {
            removeEntries();
            populateEntries(secButtArr[i].id);
            document.getElementsByClassName("entry")[0].focus(); //focus on first phrase button
        }
    }
}


////////////////////////////
//Page loading content stuff
////////////////////////////
//parameter is button id, for checking if home page.
// 2nd param is name of sub category chosen.

let getPage = function (pageName) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("SPAContainer").innerHTML =
                this.responseText;
                if(document.getElementById("subCategory")){
                document.getElementById("subCategory").innerHTML = subCategory;

                }
                populateButtons();
        }
    };
    xhttp.open("GET", "./pages/" + pageName + ".html", true);
    //sets page var for getting sub category
    xhttp.send();
}