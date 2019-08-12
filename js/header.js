window.onload = setInterval(clock,1000);

function clock() {
    var dt = new Date();
   
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var ldate = (days[dt.getDay()]+ "<br> " + dt.getDate() + " "  + months[dt.getMonth()] + " " + dt.getFullYear());
    var hours = dt.getHours();
    var mins = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    var time = hours + ":" + mins;
    
    document.getElementById("date").innerHTML = ldate;
    document.getElementById("time").innerHTML = "Time: " + time;
}


//if (document.getElementById) {
//    window.onload = header.setup;
    
   clock();
//}
