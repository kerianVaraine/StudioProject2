// ref to focusable elements array
let focusIndex;
let focussable;

// init vars to hold key values for configuration of keys/switches
let leftKey;
let rightKey;
let selectKey;


// OLD
// Phrase specific focus limiting
// initially set to -1 (not focussable)
//this should take an array of html nodes, makes it cleaner.
let togglePhraseFocus = function (selector) {
    let phraseButtons;
    switch (selector) {
        case ('all'):
            phraseButtons = Array.from(document.getElementsByClassName('phraseButton'));
            break;
        case ('children'):
            phraseButtons = Array.from(document.activeElement.children);
            break;
    }

    let tabindexState;
    //checks basic button's tab index attribute, for toggle setting//
    if (phraseButtons[0].getAttribute('tabindex') == -1) {
        tabindexState = 0;
    } else {
        tabindexState = -1;
    }
    for (let i = 0; i < phraseButtons.length; i++) {
        phraseButtons[i].setAttribute('tabindex', tabindexState);
    }
}

let toggleTabindex = function (elementArray) {
    let tabindexState; //current state of tabIndex;
    for (let i = 0; i < elementArray.length; i++) {
        if (elementArray[i].getAttribute('tabindex') == -1) {
            tabindexState = 0;
        } else {
            tabindexState = -1;
        }
        elementArray[i].setAttribute('tabindex', tabindexState);
    }
}

//add all elements we want to include in our selection
let getFocussableElements = function (focusContext) {
    //content == '.content' to keep focus on content class
    //category == '.category' to keep focus on categories class
    //all '.within-filter-selector' for all
    let focus;
    if (focusContext == 'all') {
        focus = '.within-filter-selector';
    } else {
        focus = '.' + focusContext;
    }
    focussable = ally.query.tabbable({
        context: focus,
        includeContext: true,
        strategy: 'quick',
    });
    focusIndex = focussable.indexOf(document.activeElement);
}

//function to move focus, called by shortcuts
//@TODO restrict focus based on where in dom focus is; if select category, focus locks to content div.
let focusElement = function (direction) {
    getFocussableElements('all');
    let nextElement;
    if (focusIndex > -1) {
        switch (direction) {
            case ("next"):
                nextElement = focussable[focusIndex + 1] || focussable[0];
                break;
            case ("prev"):
                nextElement = focussable[focusIndex - 1] || focussable[focussable.length - 1];
                break;
        }
        nextElement.focus();
    }
}

//Function to log keypresses and save them as vars defined at head, then keep listening for keypresses
//@TODO refactor to loop, based on how many buttons available.
//@TODO next pass, tidy and make make
let assignShortcut = function () {
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed //not implemented
        }
        if (leftKey === undefined) {
            leftKey = event.key;
            this.console.log("left assigned to " + leftKey);
            return;
        }
        if (rightKey === undefined) {
            rightKey = event.key;
            this.console.log("right assigned to " + rightKey);
            return;
        }
        if (selectKey === undefined) {
            selectKey = event.key;
            this.console.log("select assigned to " + selectKey);
            this.document.getElementById("basic").focus();
            return;
        }
        // Shortcut listener - once assigned
        if (event.key == leftKey) {
            //this.console.log("left Key pressed");
            focusElement("prev");
        } else if (event.key == rightKey) {
            //this.console.log("right Key pressed");
            focusElement("next");
        } else if (event.key == selectKey) {
            //////////////////////////////
            // Manage Focus here /////////
            //////////////////////////////
            //Main page focus management//
            if(this.document.activeElement.className == "section"){
                toggleTabindex(document.activeElement.parentElement.children);
                document.getElementsByClassName("entry")[0].focus(); //focus on first phrase button
                toggleTabindex(document.activeElement.parentElement.children);
            }else
            /////////////////////////////////////
            //Phrase pages DIV focus management//
            /////////////////////////////////////
            if(!atMain && !atPain && this.document.activeElement.tagName != "BUTTON"){
            //toggle children buttons
            let childArray = document.activeElement.children;
            let parentsArray = childArray[0].parentElement.parentElement.children;
            toggleTabindex(childArray);
            this.document.activeElement.click();
            childArray[0].focus();
            toggleTabindex(parentsArray);
            } 
            //////////////////////////////////
            //PAIN PAGE///////////////////////
            //////////////////////////////////
            else if(atPain && !atMain){
                if(!isScanComplete){
                    if(!painPageLoad){
                        onPainPageLoad();
                        painPageLoad = true;
                    }
                    checkScan();
                } else if(isScanComplete){
                    optionSelecting();
                }
            } else{
                this.document.activeElement.click();

            }
        }
    }, true)
}