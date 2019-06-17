window.addEventListener("load", () => {
	const padcollection = document.getElementsByClassName("pad"); //maakt een array van classes
	const audioplayer = document.getElementById("audioplayer"); //variable van audioplayer
	const soundfolder = "sounds/"; //zorgt dat die de juiste media file krijgt

	for (p = 0; p < padcollection.length; p++) {
		padcollection[p].addEventListener("click", handleClick); //gaat net zo vaak door de loop als er pads zijn
	}

	function handleClick(e) {
		console.log(e.target.id);
		{
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var response = JSON.parse(xhttp.responseText); //zet de json tekst om in normale tekst
					var muziek = response.muziek;

					var output = ""; //output wordt veranderd als er een pad wordt aangeklikt je ziet dan de info van het nummer

					output +=
						"<li><br> Nummer: " +
						muziek[e.target.id].nummer + //het pad met een id nummer komt overeen met het object in de JSON file
						" </li><li>Artiest: " +
						muziek[e.target.id].artiest +
						" </li><li>Lengte: " +
						muziek[e.target.id].lengte +
						" </li><li>Uitgebracht: " +
						muziek[e.target.id].release +
						"</li>";

					document.getElementById("muziek").innerHTML = output;
					console.log(soundfolder + muziek[e.target.id].filename);
					audioplayer.src = soundfolder + muziek[e.target.id].filename; //opent de muziek file
					audioplayer.play(); //speelt af
					createBubble(e.target.id); //zorgt dat er een bubbel omhoog gaat
				}
			};
			xhttp.open("GET", "muziek.json", true); //opent JSON file
			xhttp.send();
		}
	}

	document.getElementById("stopButton").onclick = function() {
		//als je op de stopbutton klikt dan pauzeert de audio player
		audioplayer.pause();
		audioplayer.currentTime = 0;
	};

	const visual = document.querySelector(".visual");
	const colors = {
		//array met verschillende kleuren
		pad1: "#000000",
		pad2: "#ff0000",
		pad3: "#00ab66",
		pad4: "#d4af37",
		pad5: "#F0E68C",
		pad6: "#999900"
	};

	const createBubble = index => {
		const bubble = document.createElement("div"); //maakt een variable die een div maakt
		visual.appendChild(bubble);
		bubble.style.backgroundColor = colors[index]; //pakt een kleur uit de array
		bubble.style.animation = `jump 1s ease`;
		bubble.addEventListener("animationend", function() {
			visual.removeChild(this); //zorg dat de bubble weer wordt verwijderd
		});
	};
});
