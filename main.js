"use strict";


let bombAntal = 10;
let koordinat = document.getElementsByClassName("knapp")
let koordinatVärde = new Array(64);
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
}

update();

function testLocation(event) {
    if (gameOver == false) {
        console.log(event.target.getAttribute("data-kordinat"));
        if (koordinatVärde[event.target.getAttribute("data-kordinat")] >= 10) {
            for (let i = 0; i < 64; i ++) {
                if (koordinatVärde[i] >= 10) {
                    koordinat[i].style.backgroundColor = "red";
                }
            }
            resultat.innerHTML = "Du förlorade!";
            resultat.style.color = "black";
            gameOver = true;
        } else if (koordinatVärde[event.target.getAttribute("data-kordinat")] == 0) {
            clear0Värde(event.target.getAttribute("data-kordinat"));
        } else {
            //visa nummer
            koordinat[event.target.getAttribute("data-kordinat")].innerHTML = koordinatVärde[event.target.getAttribute("data-kordinat")];
            koordinat[event.target.getAttribute("data-kordinat")].style.backgroundColor = "lightgray";
        }
    }
}


//bomb placering
function update() {
    gameOver = false;
    resultat.style.color = "white";
    if (document.querySelector("[data-number]").value == "") {
        bombAntal = 10;
    } else {
        bombAntal = document.querySelector("[data-number]").value;
    }
    console.log(bombAntal);

    for (let i = 0; i < 64; i++) {
        koordinatVärde[i] = 0;
        koordinat[i].style.backgroundColor = "gray";
        koordinat[i].innerHTML = "";
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

function clear0Värde(position) {
    //koordinat[position].innerHTML = koordinatVärde[position];
    koordinat[position].style.backgroundColor = "lightgray";
}