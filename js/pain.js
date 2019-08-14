/** @fileoverview Logic and animation for pain page */

let painPageLoad = false;
let isScanComplete = false;
let horizontalLine;
let horizontalLineMoved;
let verticalLine;
let verticalLineMoved;

/** Setup scanning on page load*/
let onPainPageLoad = function() {
    atPain = true;
    isScanComplete = false;
    horizontalLine = document.getElementsByClassName("hr");
    horizontalLineMoved = false;
    verticalLine = document.getElementsByClassName("vr");
    verticalLineMoved = false;
        painPageLoad = true;

}


/**Reset variables for page reload */
let resetPainPage = function(){
    isScanComplete =false;
    painPageLoad = false;
    horizontalLineMoved = false;
    verticalLineMoved = false;
}

/** Logic for scanning, controls classes on scan lines and saves position until reset. */
let checkScan = function() {
    if(!isScanComplete){
        if(!horizontalLineMoved && !verticalLineMoved){
            horizontalLine[0].classList.toggle("hidden");
            horizontalLine[0].classList.toggle("verticalScan");
            horizontalLineMoved = true;
        }else if(horizontalLineMoved && !verticalLineMoved){
            horizontalLine[0].style.animationPlayState="paused";
            verticalLine[0].classList.toggle("hidden");
            verticalLine[0].classList.toggle("horizontalScan");
            verticalLineMoved = true;
        }else if(horizontalLineMoved && verticalLineMoved){
            verticalLine[0].style.animationPlayState="paused";
            document.getElementById("reselectPain").focus();
            document.getElementById("body").setAttribute('tabindex', -1);
            isScanComplete = true;
        }
    }
}

/**Called once scan is complete, controlls button functions <br><br>
 * Uses active button ID to give next instructions.
*/
let optionSelecting = function(){
    let active = document.activeElement;
    let parentDiv = document.activeElement.parentElement;
    console.log(active.id);
    switch(active.id){
        case ("reselectPain"):
        resetPainPage();
            getPage("pain");
        break;
        case("BTMain"):
            getPage("main");
            break;
            }
        }