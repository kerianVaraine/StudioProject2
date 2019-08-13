/**
 * @fileoverview Manages all dynamic DOM manipulations throughout page.<br><br>
 * Creates all the buttons and loads phrases and button names from Content.JSON file.<br><br>
 * Also keeps track of where in the page the user is via global variables.<br>
 * <em>This needs to be highly refactored</em>
 */

//Main vars for page listings, and subCategory headers.
let atMain = true;
let subCategory = "basic";
let atPain = false;

//Text-to-Speech, browser based.
let synth = window.speechSynthesis;

//Json contents
let phrases;
let contentLocation;


/** Loads Content.json.<br><br>
 * Contains all phrases, previews and spoken text.
 *
 */
let importContent = function () {
    contentLocation = "./content/categories.json";
    let request = new XMLHttpRequest();
    request.open('GET', contentLocation);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        phrases = request.response;
    }
}

//init loading of content.
importContent();
// end of json importing

/**Adds a button with name and spoken text from content.json. <br><br>
 * Includes onclick and onfocus events, but these need to be abstracted out.
 *
 *
 * @param {string} pCat Json category to get nested key:value pairs.
 * @param {int} index Counter for Json subcategory key.
 * @param {int} phraseDivIndex Counter for appending to dynamic div creation when in phrase page.
 */
let createButton = function (pCat, index, phraseDivIndex) {
    let button = document.createElement("button"); //create button element
    button.innerText = pCat[index][0]; //add button text from json file
    button.className = "entry"; //assign class/css/styling
    button.tabIndex = -1;

    //Preview Function on focus
    button.onfocus = function () {
        let preview = document.getElementById("previewText");
        switch (button.innerText) {
            case ("Physical"):
                console.log("focus " + button.innerText)
                preview.innerText = "For example: I am short of breath";
                break;
            case ("Emotional"):
                preview.innerText = " For example: I am happy ";
                break;
            case ("Move"):
                preview.innerText = "Change your position in bed";
                break;
            case ("Room Changes"):
                preview.innerText = "Adjust your room";
                break;
            case ("Personal"):
                preview.innerText = "For example: I need my glasses ";
                break;
            case ("Medical"):
                preview.innerText = "Requests concerning your medical condition";
                break;
            case ("I would like to ask you..."):
                preview.innerText = "General questions, such as \"How are You?\"";
                break;
            case ("I would like you to ask me..."):
                preview.innerText = "To initiate conversation";
                break;
            case ("Could you please find out..."):
                preview.innerText = "Requests relating to house/concerns/family";
                break;
            case ("Return to Main"):
                preview.innerText = "Return to main page"
                break;
            case ("General"):
                preview.innerText = "Communicate pain immediately";
                break;
            case ("Select"):
                preview.innerText = "Communicate pain/discomfort of a specific body part";
                break;
            default:
                preview.innerText = pCat[index][1];

        }
    }

    //BUTTON ON CLICK button.onclick
    button.onclick = function () {
        synth.speak(new SpeechSynthesisUtterance(pCat[index][1])); //speak phrase from json
        removeEntries(); //remove buttons once clicked
        subCategory = pCat[index][0]; //set subCategory global variable to populate the right buttons.
        atMain ? getNextPage(this.innerText) : getNextPage(); // if at main page, go to sub category, else go back to main page
    }

    //check if at main page to populate subcats.
    if (atMain) {
        document.getElementById("entries").appendChild(button); //adds all butons to Main page.
    } else {
        document.getElementsByClassName("phraseDiv")[phraseDivIndex].appendChild(button); //adds buttons in phrase pages to newly created div for focus management.
    }
}

// populates the content div with buttons and stores the speech synth inside the button

/** Takes care of populating the phrase pages in divs of 5 buttons each.
 *
 *
 * @param {String} category Key for json file lookup.
 */
let populateEntries = function (category) {
    let phraseDivIndex = -1;
    // this selects the category inside the json file to loop through and populate buttons
    let pCat = phrases[category];
    //loop to populate page with json info, and main category name for page choice
    for (let i = 0; i < pCat.length; i++) {
        if (!atMain && i % 5 == 0) {
            phraseDivIndex++;
            const newContainer = document.createElement('div');
            newContainer.classList.add('phraseDiv', 'catRow');
            newContainer.tabIndex = 0;
            newContainer.id = "phraseDiv" + phraseDivIndex;
            document.getElementById("entries").appendChild(newContainer);
        }
        createButton(pCat, i, phraseDivIndex);
    }
}

//remove buttons in entry div

/**Remove buttons from main page categories*/
function removeEntries() {
    let elements = document.getElementsByClassName("entry");
    while (elements.length > 0) {
        elements[0].parentElement.removeChild(elements[0]);
    }
}

//MAIN PAGE BUTTONS SETUP

/** Manages main page's dynamic subcategories.<br><br>
 * This creates onFocus event for buttons to show the desired subcategories of content.json.
 */
let populateButtons = function () {
    let sectionButtons;
    //create array of section buttons (ie: top nav)
    if (atMain) {
        sectionButtons = document.getElementsByClassName("section");

        //apply onFocus and onClick funtion to each button
        for (let i = 0; i < sectionButtons.length; i++) {
            sectionButtons[i].onfocus = function () {
                removeEntries();
                populateEntries(sectionButtons[i].id);
            };
        }
    }
}

////////////////////////////
//Page loading content stuff
////////////////////////////
//parameter is button id, for checking if home page.

//Main container level.
const SPAContainer = document.getElementById("SPAContainer")

/** Dynamically change content of SPAContainer. <br><br>
 * Inits focus on new page loads.
 *
 * @param {String} pageName Name of the target page found in ./pages/
 * @param {String} categoryID content.json category key.
 */
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
            //INITIAL FOCUS SETTING
            if (atMain) {
                document.getElementById("basic").focus();
            } else if (!atPain) {
                document.getElementsByClassName("phraseDiv")[0].focus();
            } else if (atPain) {
                document.getElementById("body").focus();
            }
        }
    };
    xhttp.open("GET", "./pages/" + pageName + ".html", true);
    xhttp.send();
}

///////////////////////////////////////////
// Returns id for buttons to populate page
///////////////////////////////////////////
// This selects the next page based on category's returned from selecting subCategories
// Default returns to Main.html injected.
///////////////////////////////////////////


/**This selects the next page based on category's returned from selecting subCategories <br><br>
 * Default returns to Main.html injected.<br><br>
 *<em> This function also sets page location global variable.</em>
 *
 * @param {String} categoryID From clicked button ID to populate the next page.
 */
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
        case ("Select"):
            atMain = false;
            atPain = true;
            getPage("pain");
            break;
        default:
            atMain = true;
            getPage("main");
    }
}