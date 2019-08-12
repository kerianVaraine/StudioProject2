/*On pain page load
*/
let painPageLoad = false;
let isScanComplete = false;
let horizontalLine;
let horizontalLineMoved;
let verticalLine;
let verticalLineMoved;

let onPainPageLoad = function() {
    atPain = true;
    isScanComplete = false;
    horizontalLine = document.getElementsByClassName("hr");
    horizontalLineMoved = false;
    verticalLine = document.getElementsByClassName("vr");
    verticalLineMoved = false;
        painPageLoad = true;

}
let resetPainPage = function(){
    isScanComplete =false;
    painPageLoad = false;
    horizontalLineMoved = false;
    verticalLineMoved = false;
}

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

let optionSelecting = function(){
    let active = document.activeElement;
    let parentDiv = document.activeElement.parentElement;
    console.log(active.id);
    switch(active.id){
        case ("reselectPain"):
        resetPainPage();
            getPage("pain");
        break;
            }
        }