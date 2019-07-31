let containers = 3;
const COLORCONTAINER = document.querySelectorAll(".colorContainer");
let winnerContainer;
let winnerContainerRGB;
const LINKS = document.querySelectorAll("a");
let rgbDisplayer = document.querySelector(".rgbDisplayer");
let colorFound = false;

LINKS[0].addEventListener("click", function (){
    newGame();
    this.classList.add("showLinkBg");
    setTimeout(function() {
        LINKS[0].classList.remove("showLinkBg");
    }, 100);
});

//easy
LINKS[1].addEventListener("click", function (){
    containers = 3;
    newGame();
    this.classList.add("showLinkBg");
    LINKS[2].classList.remove("showLinkBg");
    document.querySelector(".secondRow").style.display = "none";
});

//hard
LINKS[2].addEventListener("click", function (){
    containers = 6;
    newGame();
    this.classList.add("showLinkBg");
    LINKS[1].classList.remove("showLinkBg");
    document.querySelector(".secondRow").style.display = "flex";
});


function newGame() {
    colorFound = false;
    winnerContainer = COLORCONTAINER[Math.floor(Math.random() * containers)];
    document.querySelector("header").style.backgroundColor = "rgb(20, 150, 200)";
    for (let i = 0; i < containers; i++) {
        RGB = randomRGB();
        COLORCONTAINER[i].style.backgroundColor = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
        COLORCONTAINER[i].addEventListener("click", round);
        COLORCONTAINER[i].classList.remove("hidden");
        COLORCONTAINER[i].classList.remove("wrong");
        COLORCONTAINER[i].classList.add("show");
    }
    winnerContainerRGB = (winnerContainer.style.backgroundColor).toUpperCase();
    rgbDisplayer.textContent = winnerContainerRGB;
}

function randomRGB() {
    const RGB = [
        Math.floor((Math.random() * 255) + 1), 
        Math.floor((Math.random() * 255) + 1), 
        Math.floor((Math.random() * 255) + 1)
    ];

    return RGB;
}

function round() {
    if (!colorFound){
        if ((this.style.backgroundColor).toUpperCase() == rgbDisplayer.textContent) {
            colorFound = true;
            for (let j = 0; j < containers; j++) {
                if (COLORCONTAINER[j].classList.contains("hidden")) {
                    COLORCONTAINER[j].classList.add("wrong");
                }
                else {
                    COLORCONTAINER[j].style.backgroundColor = winnerContainer.style.backgroundColor;
                }
                COLORCONTAINER[j].classList.add("show");
                COLORCONTAINER[j].classList.remove("hidden");
                
            }
            document.querySelector("header").style.backgroundColor = winnerContainer.style.backgroundColor;
        }
        else {
            colorFound = false;
            console.log("hello");
            this.classList.remove("show");
            this.classList.add("hidden");
        }
    }
    else {
        newGame();
    }
}

newGame();