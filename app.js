const container = document.querySelector(".container");
const btn = document.querySelector(".grid-size-button");
const selectionButtons = document.querySelector(".selection-buttons");
const colourWheel = document.querySelector("#colour-wheel");
let gridSize = 16;
const modes = {
    eraserMode: false,
    rainbowMode: true,
    colourMode: false
};

createGrid();

btn.addEventListener("click", () => {
    const input = parseInt(prompt("Enter grid size"));
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    if (input <= 100) {
        gridSize = input;
        createGrid();
    }
})

function createGrid() {
    const styleString = `flex: 1 1 ${100 / gridSize}%;`;
    for (let i = 0; i < (gridSize * gridSize); i++) {
        const box = document.createElement("div");
        box.setAttribute("class", "box");
        box.setAttribute("style", styleString);
        container.appendChild(box);
    }
}

selectionButtons.addEventListener("click", (event) => {
    let target = event.target;
    document.querySelectorAll(".selection-buttons button").forEach((button) => {
        button.style.backgroundColor = "#4914ff";
    })

    target.style.backgroundColor = "crimson";

    switch (target.id) {
        case "eraser-button":
            modes.eraserMode = true;
            modes.colourMode = false;
            modes.rainbowMode = false;
            break;
        case "rainbow-button":
            modes.eraserMode = false;
            modes.colourMode = false;
            modes.rainbowMode = true;
            break;
        case "set-color-button":
            modes.eraserMode = false;
            modes.colourMode = true;
            modes.rainbowMode = false;
            break;
    }
});

document.querySelector("#clear-button").addEventListener("click", () => clearBoard());

container.addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("box")) {
            for ([key, value] of Object.entries(modes)) {
                if (value === true) {
                    executeModeFunctionality(key, e.target);
                    break;
                }
            }
        }
    }
)

function executeModeFunctionality(key, node) {
    switch (key) {
        case "eraserMode":
            node.style.backgroundColor = "white";
            break;
        case "rainbowMode":
            node.style.backgroundColor = randomRGBVal();
            break;
        case "colourMode":
            node.style.backgroundColor = colourWheel.value;
            break;
    }
}

function randomRGBVal() {
    return `rgb(${randomInteger(255)} ${randomInteger(255)} ${randomInteger(255)})`
}

function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}

function clearBoard() {
    document.querySelectorAll(".container > *").forEach((node) => {
        node.style.backgroundColor = "white";
    })
}