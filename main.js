"use strict";


let bombAntal = 10;
let antalVisade = 0;
let koordinat = document.getElementsByClassName("knapp")
let koordinatVärde = new Array(64);
let koordinatVisad = new Array(64);
let bombPlats = 65;
let reset = document.getElementsByClassName("reset");
let resultat = document.querySelector("[data-resultat]");
let dupe = true;
let dupeCheck = true;
let gameOver = false;
let grid = document.querySelector("[data-grid]");

for (let i = 0; i < 64; i++) {
    let button = document.createElement("button");
    button.setAttribute("data-kordinat", i);
    button.classList.add("knapp");
    button.addEventListener("click", testLocation)
    grid.append(button);

    koordinatVisad[i] = false;
}

update();

function testLocation(event) {
    if (gameOver == false) {
        console.log(event.target.getAttribute("data-kordinat"));
        if (koordinatVärde[event.target.getAttribute("data-kordinat")] >= 10) {
            for (let i = 0; i < 64; i ++) {
                if (koordinatVärde[i] >= 10) {
                    koordinat[i].style.backgroundColor = "red";
                    koordinat[i].style.borderColor = "darkred";
                }
            }
            resultat.innerHTML = "Du förlorade!";
            resultat.style.color = "black";
            gameOver = true;
            grid.style.backgroundColor = "red";
        } else {
            if (koordinatVisad[event.target.getAttribute("data-kordinat")] == false)
            {
                antalVisade++;
            }
            koordinatVisad[event.target.getAttribute("data-kordinat")] = true;
            koordinat[event.target.getAttribute("data-kordinat")].style.backgroundColor = "lightgray";
            koordinat[event.target.getAttribute("data-kordinat")].style.borderColor = "gray";
            if (koordinatVärde[event.target.getAttribute("data-kordinat")] != 0) {
                koordinat[event.target.getAttribute("data-kordinat")].innerHTML = koordinatVärde[event.target.getAttribute("data-kordinat")];
            }
        }
        if (antalVisade == (64 - bombAntal)) {
            gameOver = true;
            resultat.style.color = "black";
            resultat.innerHTML = "Du vann!";
            grid.style.backgroundColor = "rgb(0, 190, 0)";
        }
        console.log(antalVisade);
    }
}


//bomb placering
function update() {
    gameOver = false;
    resultat.style.color = "white";
    resultat.innerHTML = "Easter egg :p";
    antalVisade = 0;
    grid.style.backgroundColor = "rgb(65, 65, 65)";
    if (document.querySelector("[data-number]").value == "") {
        bombAntal = 10;
    } else {
        bombAntal = document.querySelector("[data-number]").value;
    }
    console.log(bombAntal);

    for (let i = 0; i < 64; i++) {
        koordinatVärde[i] = 0;
        koordinat[i].style.backgroundColor = "rgb(101, 101, 255)";
        koordinat[i].innerHTML = "";

        koordinatVisad[i] = false;

        koordinat[i].style.borderColor = "rgb(59, 59, 158)";
    }
    
    for (let i = 0; i < bombAntal; i++) {
        dupeCheck = true;
        while (dupeCheck) {
            bombPlats = (Math.floor(Math.random() * 64));
            console.log(Math.floor(Math.random() * 64));
            dupeCheck = false;
            if (koordinatVärde[bombPlats] >= 10)
            {
                bombPlats = (Math.floor(Math.random() * 64));
                console.log("ny");
                console.log(Math.floor(Math.random() * 64));
                dupeCheck = true;
            }
        }
        koordinatVärde[bombPlats] += 10;
        console.log(koordinat[bombPlats].getAttribute("data-kordinat"));
        
        //öka värde på de i närheten
        if (bombPlats % 8 == 0) { //vänster
            koordinatVärde[bombPlats + 1] ++;
            try {
                koordinatVärde[bombPlats - 8] ++;
                koordinatVärde[bombPlats - 7] ++;
            } catch {}
            try {
                koordinatVärde[bombPlats + 8] ++;
                koordinatVärde[bombPlats + 9] ++;
            } catch {}

        } else if (bombPlats % 8 == 7) { //höger
            koordinatVärde[bombPlats - 1] ++;
            try {
                koordinatVärde[bombPlats - 8] ++;
                koordinatVärde[bombPlats - 9] ++;
            } catch {}
            try {
                koordinatVärde[bombPlats + 8] ++;
                koordinatVärde[bombPlats + 7] ++;
            } catch {}
        } else {
            koordinatVärde[bombPlats + 1] ++;
            koordinatVärde[bombPlats - 1] ++;
            try {
                koordinatVärde[bombPlats - 8] ++;
                koordinatVärde[bombPlats - 7] ++;
                koordinatVärde[bombPlats - 9] ++;
            } catch {}
            try {
                koordinatVärde[bombPlats + 8] ++;
                koordinatVärde[bombPlats + 7] ++;
                koordinatVärde[bombPlats + 9] ++;
            } catch {}

        }
    }
}