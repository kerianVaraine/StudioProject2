/**
 * @fileoverview Manages keyboard emulation based switch control and focus manipulation throughout the site. <br><br>
 * <b>Depends on ally.js library</b><br><br>
 * <em>Event listener contains page specific logic and needs to be refactored. </em>
 */

/** ref to focusable elements array */
let focusIndex;
let focussable;

// init vars to hold key values for configuration of keys/switches
// let leftKey;
let rightKey;
let selectKey;

/** Toggles focus on selected DOM Object with class phraseButton.<br>
 * 
 * @param {string} selector 
 * 'all' -- effects all objects with class 'phraseButton'<br><br>
 * 'children' -- effects children of selected node.
 */
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
    //checks first button's tab index attribute, for toggle setting//
    if (phraseButtons[0].getAttribute('tabindex') == -1) {
        tabindexState = 0;
    } else {
        tabindexState = -1;
    }
    for (let i = 0; i < phraseButtons.length; i++) {
        phraseButtons[i].setAttribute('tabindex', tabindexState);
    }
}

/**Toggles tabindex attribute for target array of elements.<br>
 *
 * @param {element[]} elementArray
 */
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

/** Defines an array of elements which have a tabindex of 0.<br>
 * Dependancy: ally.js.
 *
 * @param {string} focusContext
 * 'all' -- selects all focusable object using ally.js definitions.<br><br>
 * anything else -- passes the class to ally.js to check if focusable. 
 */
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

/** Shift focus to next element in focussable[]
 *
 * @param {String} direction
 * 'next' -- focus on next element in focussable[]<br><br>
 * 'prev' -- focus on previous element in focussable[]
 */
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

/** Initiates shortcut assignment for keyboard emulating switch based hardware and creates EventListener to handle switch commands.<br><br>
* @todo <em>This is in no way elegant, and should be refactored into multiple functions based on current page.</em>
*/
let assignShortcut = function () {
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed //not implemented
        }
        if (rightKey === undefined) {
            rightKey = event.key;
            // this.console.log("right assigned to " + rightKey);
            return;
        }
        if (selectKey === undefined) {
            selectKey = event.key;
            // this.console.log("select assigned to " + selectKey);
            this.document.getElementById("basic").focus();
            return;
        }
        // Shortcut listener - once assigned
        if (event.key == rightKey) {
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