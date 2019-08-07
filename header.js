window.onload = setInterval(clock,1000);

function clock()
{
    var dt = new Date();
        
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var ldate = (days[dt.getDay()]+ " " + dt.getDate() + " "  + months[dt.getMonth()] + " " + dt.getFullYear());

    document.getElementById("date").innerHTML = ldate;

    var time = (dt.getHours() + ":" + dt.getMinutes());
    document.getElementById("time").innerHTML = time;
}



if (document.getElementById) {
    window.onload = header.setup;
    
    today();
    clock();
}
