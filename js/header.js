window.onload = setInterval(clock,1000);

function clock() {
    var dt = new Date();
   
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
<<<<<<< HEAD
    var ldate = (days[dt.getDay()]+ " " + dt.getDate() + " "  + months[dt.getMonth()] + " " + dt.getFullYear());
=======
    var ldate = (days[dt.getDay()]+ "<br> " + dt.getDate() + " "  + months[dt.getMonth()] + " " + dt.getFullYear());
>>>>>>> f3daf1e4e01c6d34bcd124514658aebc4013d28b
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
