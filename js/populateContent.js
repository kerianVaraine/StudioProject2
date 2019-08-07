//Main var for subcategory listing
let atMain = true;
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

// adds buttons with all functionality and name
let getButtonText = function (pCat, index) {
    let button = document.createElement("button"); //create button element
    button.innerText = pCat[index][0]; //add button text from json file
    button.className = "entry"; //assign class/css/styling
    //BUTTON ON CLICK
    button.onclick = function () {
        synth.speak(new SpeechSynthesisUtterance(pCat[index][1])); //speak phrase from json
        subCategory = pCat[index][0];//set subCategory global variable to populate the right buttons.
        removeEntries(); //remove buttons once clicked
        
        // console.log(pCat[index][0]);


    };
    document.getElementById("entries").appendChild(button); //adds all butons to page.
}

// populates the content div with buttons and stores the speech synth inside the button
let populateEntries = function (category) {
    // this selects the category inside the json file to loop through and populate buttons
    let pCat = phrases[category];
    //loop to populate page with json info, and main category name for page choice
    for (let i = 0; i < pCat.length; i++) {
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
    const secButtArr = document.getElementsByClassName("section");
    //apply onclick funtion to each button
    for (let i = 0; i < secButtArr.length; i++) {
            secButtArr[i].onfocus = function () {
            removeEntries();
            populateEntries(secButtArr[i].id);
        };
        secButtArr[i].onclick = function () {
            console.log("clicked " + secButtArr[i].id);
            document.getElementsByClassName("entry")[0].focus(); //focus on first phrase button

        }
    }
}

////////////////////////////
//Page loading content stuff
////////////////////////////
//parameter is button id, for checking if home page.

const SPAContainer = document.getElementById("SPAContainer")
let getPage = function (pageName) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            SPAContainer.innerHTML =
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