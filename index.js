window.addEventListener("load", () => {
	const padcollection = document.getElementsByClassName("pad");
	const audioplayer = document.getElementById("audioplayer");
	const soundfolder = "sounds/";

	for (p = 0; p < padcollection.length; p++) {
		padcollection[p].addEventListener("click", handleClick);
	}

	function handleClick(e) {
		console.log(e.target.id);
		{
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var response = JSON.parse(xhttp.responseText);
					var muziek = response.muziek;

					var output = "";

					output +=
						"<li><br> Nummer: " +
						muziek[e.target.id].nummer +
						" </li><li>Artiest: " +
						muziek[e.target.id].artiest +
						" </li><li>Lengte: " +
						muziek[e.target.id].lengte +
						" </li><li>Uitgebracht: " +
						muziek[e.target.id].release +
						"</li>";

					document.getElementById("muziek").innerHTML = output;
					console.log(soundfolder + muziek[e.target.id].filename);
					audioplayer.src = soundfolder + muziek[e.target.id].filename;
					audioplayer.play();
					createBubble(e.target.id);
				}
			};
			xhttp.open("GET", "muziek.json", true);
			xhttp.send();
		}
	}

	document.getElementById("stopButton").onclick = function() {
		audioplayer.pause();
		audioplayer.currentTime = 0;
	};

	const visual = document.querySelector(".visual");
	const colors = {
		pad1: "#000000",
		pad2: "#ff0000",
		pad3: "#00ab66",
		pad4: "#d4af37",
		pad5: "#F0E68C",
		pad6: "#999900"
	};

	const createBubble = index => {
		const bubble = document.createElement("div");
		visual.appendChild(bubble);
		bubble.style.backgroundColor = colors[index];
		bubble.style.animation = `jump 1s ease`;
		bubble.addEventListener("animationend", function() {
			visual.removeChild(this);
		});
	};
});
