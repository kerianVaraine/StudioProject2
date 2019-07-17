	
	// Don't change anything in this section unless you know what you are doing
		function sayIt(textIt) {//This is the function that takes the phrases, alerts and then prints to the page.
			document.getElementById("id_top_table").style.display = "block";  
		   document.getElementById("id_now").innerHTML =textIt;
		   document.getElementById("id_past").innerHTML +=textIt+"<br/>";
		   var currentTime = new Date ();
		   var seconds = currentTime.getSeconds();
		   if (seconds<15){newAlert('Sorry to butt in, '+textIt);}
		   if (seconds>15&&seconds<30){newAlert('I would like to say, '+textIt);}
		   if (seconds>30&& seconds<45){newAlert('Excuse me, ' +textIt);}
		   if (seconds>45){newAlert('If it is no bother, ' +textIt);}
		   clearTree();
		   return false;
		}
		function clearConversations(){//To clear the backlog
			document.getElementById("id_past").innerHTML = "";
		}
		function getTime() {//Used to read out the time
			var currentTime = new Date(),
		   hours = currentTime.getHours(),
		   minutes = currentTime.getMinutes();
			if (minutes < 10) {minutes = "0" + minutes;}
			document.getElementById("id_now").innerHTML = "I reckon it is " +hours + ":" + minutes;
			newAlert('The time is '+hours + ":" + minutes);
			document.getElementById("id_top_table").style.display = "block"; 
			clearTree();
			return false; 
		}
		function clearTree() { // Hides the submenus after we have got the phrase
			document.getElementById("id_need").style.display = "none";
			document.getElementById("id_want").style.display = "none"; 
			document.getElementById("id_comfort").style.display = "none";
			document.getElementById("id_direction").style.display = "none"; 
			document.getElementById("id_news").style.display = "none";
			document.getElementById("id_help").style.display = "none"; 
			document.getElementById("id_entertain").style.display = "none";
		}
		function newAlert(message) {//Creates the alert so it can be read out loud.
			var iframe = document.createElement("IFRAME");
			iframe.setAttribute("src", 'data:text/plain,');
			document.documentElement.appendChild(iframe);
			window.frames[0].window.alert(message);
			iframe.parentNode.removeChild(iframe);
		}
		function showit (tree){//shows the relevant submenus depending on which button in the toptree was selected
			if (tree==0){
				document.getElementById("id_need").style.display = "block"; 
				document.getElementById("id_top_table").style.display = "none"; 
				document.getElementById("id_want").style.display = "none"; 
				document.getElementById("id_comfort").style.display = "none";
				document.getElementById("id_direction").style.display = "none"; 
				document.getElementById("id_news").style.display = "none";
				document.getElementById("id_help").style.display = "none"; 
				document.getElementById("id_entertain").style.display = "none";
			}
			if (tree==1){
				document.getElementById("id_need").style.display = "none";
				document.getElementById("id_want").style.display = "block"; 
				document.getElementById("id_comfort").style.display = "none";
				document.getElementById("id_direction").style.display = "none"; 
				document.getElementById("id_news").style.display = "none";
				document.getElementById("id_help").style.display = "none"; 
				document.getElementById("id_entertain").style.display = "none";
				document.getElementById("id_top_table").style.display = "none"; 
			}
			if (tree==2){
				document.getElementById("id_need").style.display = "none";
				document.getElementById("id_want").style.display = "none"; 
				document.getElementById("id_comfort").style.display = "block";
				document.getElementById("id_direction").style.display = "none"; 
				document.getElementById("id_news").style.display = "none";
				document.getElementById("id_help").style.display = "none"; 
				document.getElementById("id_entertain").style.display = "none";
				document.getElementById("id_top_table").style.display = "none"; 
			}
			if (tree==3){
				document.getElementById("id_need").style.display = "none";
				document.getElementById("id_want").style.display = "none"; 
				document.getElementById("id_comfort").style.display = "none";
				document.getElementById("id_direction").style.display = "block"; 
				document.getElementById("id_news").style.display = "none";
				document.getElementById("id_help").style.display = "none"; 
				document.getElementById("id_entertain").style.display = "none";
				document.getElementById("id_top_table").style.display = "none"; 
			}
			if (tree==4){
				document.getElementById("id_need").style.display = "none";
				document.getElementById("id_want").style.display = "none"; 
				document.getElementById("id_comfort").style.display = "none";
				document.getElementById("id_direction").style.display = "none"; 
				document.getElementById("id_news").style.display = "block";
				document.getElementById("id_help").style.display = "none"; 
				document.getElementById("id_entertain").style.display = "none";
				document.getElementById("id_top_table").style.display = "none"; 
			}									
			if (tree==5){
				document.getElementById("id_need").style.display = "none";
				document.getElementById("id_want").style.display = "none"; 
				document.getElementById("id_comfort").style.display = "none";
				document.getElementById("id_direction").style.display = "none"; 
				document.getElementById("id_news").style.display = "none";
				document.getElementById("id_help").style.display = "block"; 
				document.getElementById("id_entertain").style.display = "none";
				document.getElementById("id_help").focus();
				document.getElementById("id_top_table").style.display = "none"; 
			}
			if (tree==6){
				document.getElementById("id_need").style.display = "none";
				document.getElementById("id_want").style.display = "none"; 
				document.getElementById("id_comfort").style.display = "none";
				document.getElementById("id_direction").style.display = "none"; 
				document.getElementById("id_news").style.display = "none";
				document.getElementById("id_help").style.display = "none"; 
				document.getElementById("id_entertain").style.display = "block";
				document.getElementById("id_top_table").style.display = "none"; 
			}
		}
