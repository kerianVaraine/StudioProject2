// Shortcut assigning and key listening for focusable elements on page
// @author kerian varaine
// 
// @TODO create standalone object for this, keep it nicer.
//
//
// ref to focusable elements array
let focusIndex;
let focussable;

// init vars to hold key values for configuration of keys/switches
let leftKey;
let rightKey;
let selectKey;


//add all elements we want to include in our selection
let getFocussableElements = function () {
    focussable = ally.query.tabbable({
        context: '.within-filter-selector',
        includeContext: true,
        strategy: 'quick',
    });
    focusIndex = focussable.indexOf(document.activeElement);
}

let focusElement = function (direction) {
    getFocussableElements();
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
            return;
        }
        activeShortcuts();
    }, true)
}
//shortcut key reference for listener
let activeShortcuts = function () {
    if (event.key == leftKey) {
        //this.console.log("left Key pressed");
        focusElement("prev");
    } else if (event.key == rightKey) {
        //this.console.log("right Key pressed");
        focusElement("next");
    } else if (event.key == selectKey) {
        // this.console.log("select Key pressed");
        this.document.activeElement.click();
    }
}

//return undefined to reset keys
let setUndefined = function () {
    return;
}

let resetShortcuts = function () {
    leftKey = setUndefined();
    rightKey = setUndefined();
    selectKey = setUndefined();
}
//

//scanning mode test. some issues. needs to be reset when select is pressed, and needs to stay in div scope for tabbables
// let scanningMode = setInterval(function () {
//             focusElement("next");
//         }, 800);


// refactor phils code to speak the phrases needed.
// populate the html with an array of sentences stored in a seperate file.
// making it easier for others to edit and add new phrases.



//Back button selects top level heirachy "section" parent....