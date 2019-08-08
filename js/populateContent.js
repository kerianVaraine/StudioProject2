//Main vars for subcategory listing
let atMain = true; //lets create button know if it is at main page for populating buttons
let subCategory = "basic";

//Text-to-Speech, browser based.
let synth = window.speechSynthesis;

//////////////////
//Import from json
//parse content from json file, then populate page with buttons from the selected section.
//////////////////
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
let createButton = function (pCat, index, phraseDivIndex) {
    let button = document.createElement("button"); //create button element
    button.innerText = pCat[index][0]; //add button text from json file
    button.className = "entry"; //assign class/css/styling
    button.tabIndex = -1;
    //BUTTON ON CLICK button.onclick
    button.onclick = function () {
        synth.speak(new SpeechSynthesisUtterance(pCat[index][1])); //speak phrase from json
        removeEntries(); //remove buttons once clicked
        subCategory = pCat[index][0]; //set subCategory global variable to populate the right buttons.
        atMain ? getNextPage(this.innerText) : getNextPage(); // if at main page, go to sub category, else go back to main page
    }

    //check if at main page to populate subcats.
    if (atMain) {
        document.getElementById("entries").appendChild(button); //adds all butons to page.
    } else {
        document.getElementsByClassName("phraseDiv")[phraseDivIndex].appendChild(button); //adds buttons to newly created div for focus management.
    }
}

// populates the content div with buttons and stores the speech synth inside the button
let populateEntries = function (category) {
    let phraseDivIndex = -1;
    // this selects the category inside the json file to loop through and populate buttons
    let pCat = phrases[category];
    //loop to populate page with json info, and main category name for page choice
    for (let i = 0; i < pCat.length; i++) {
        if (!atMain && i % 4 == 0) {
            phraseDivIndex++;
            const newContainer = document.createElement('div');
            newContainer.classList.add('phraseDiv', 'catRow');
            newContainer.tabIndex = 0;
            document.getElementById("entries").appendChild(newContainer)
        }
        createButton(pCat, i, phraseDivIndex);
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
    let secButtArr;
    //create array of section buttons (ie: top nav)
    if (atMain) {
        secButtArr = document.getElementsByClassName("section");

        //apply onclick funtion to each button
        for (let i = 0; i < secButtArr.length; i++) {
            secButtArr[i].onfocus = function () {
                removeEntries();
                populateEntries(secButtArr[i].id);
            };
            secButtArr[i].onclick = function () {
                // console.log("clicked " + secButtArr[i].id);
                document.getElementsByClassName("entry")[0].focus(); //focus on first phrase button

            }
        }
    }
}

////////////////////////////
//Page loading content stuff
////////////////////////////
//parameter is button id, for checking if home page.

const SPAContainer = document.getElementById("SPAContainer")
let getPage = function (pageName, categoryID) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            SPAContainer.innerHTML =
                this.responseText;
            if (document.getElementById("subCategory")) {
                document.getElementById("subCategory").innerHTML = subCategory;
                populateEntries(categoryID);
            }
            populateButtons();
        }
    };
    xhttp.open("GET", "./pages/" + pageName + ".html", true);
    //sets page var for getting sub category
    xhttp.send();
}

///////////////////////////////////////////
// Returns id for buttons to populate page
///////////////////////////////////////////
// This selects the next page based on category's returned from selecting subCategories
// Default returns to Main.html injected.
// Could be refactored to only work with catagor
///////////////////////////////////////////

let getNextPage = function (categoryID) {
    switch (categoryID) {
        case ("Physical"):
        case ("Emotional"):
        case ("Move"):
        case ("Room Changes"):
        case ("Personal"):
        case ("Medical"):
        case ("I would like to ask you..."):
        case ("I would like you to ask me..."):
        case ("Could you please find out..."):
            getPage("phrases", categoryID);
            atMain = false;
            break;
        default:
            atMain = true;
            getPage("main");
    }
}