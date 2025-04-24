// Game Variables
let currentLevel = 1;
const shapes = ["square", "circle"];
const nextLevelShapes = ["dog", "cat"]; // Animal shapes for Level 2
const carShapes = ["car", "truck"]; // Car shapes for Level 3

// Function to generate draggable shapes based on the current level
function generateShapes(level) {
    const shapesContainer = document.getElementById("shapes-container");
    let levelShapes = [];

    if (level === 1) {
        levelShapes = shapes;
    } else if (level === 2) {
        levelShapes = nextLevelShapes;
    } else if (level === 3) {
        levelShapes = carShapes;
    }

    shapesContainer.innerHTML = "";
    levelShapes.forEach(shape => {
        const shapeElement = document.createElement("div");
        shapeElement.classList.add("shape", shape);
        shapeElement.setAttribute("draggable", true);
        shapeElement.addEventListener("dragstart", handleDragStart);
        shapesContainer.appendChild(shapeElement);
    });
}

// Function to generate drop zones based on the current level
function generateDropZones(level) {
    const dropZonesContainer = document.getElementById("drop-zones-container");
    dropZonesContainer.innerHTML = "";

    let levelShapes = [];
    if (level === 1) {
        levelShapes = shapes;
    } else if (level === 2) {
        levelShapes = nextLevelShapes;
    } else if (level === 3) {
        levelShapes = carShapes;
    }

    levelShapes.forEach((shape) => {
        const dropZone = document.createElement("div");
        dropZone.classList.add("drop-zone", `zone-${shape}`);
        dropZone.addEventListener("dragover", handleDragOver);
        dropZone.addEventListener("drop", handleDrop);
        dropZonesContainer.appendChild(dropZone);
    });
}

// Handle drag start event
function handleDragStart(event) {
    event.dataTransfer.setData("shape", event.target.className.split(" ")[1]);
}

// Handle drag over event to allow dropping
function handleDragOver(event) {
    event.preventDefault();
}

// Handle drop event
function handleDrop(event) {
    const draggedShape = event.dataTransfer.getData("shape");
    const targetZone = event.target;

    if (draggedShape === targetZone.classList[1].split('-')[1]) {
        targetZone.appendChild(document.querySelector(`.${draggedShape}`));
        checkGameCompletion();
    }
}

// Check if all shapes are matched
function checkGameCompletion() {
    const allMatched = document.querySelectorAll(".drop-zone").every(zone => {
        return zone.children.length > 0;
    });

    if (allMatched) {
        document.getElementById("congratulation-popup").style.display = "block";
    }
}

// Move to the next level
document.getElementById("next-level-btn").addEventListener("click", () => {
    currentLevel++;
    generateShapes(currentLevel);
    generateDropZones(currentLevel);
    document.getElementById("congratulation-popup").style.display = "none";
});

// Back to home button functionality
document.getElementById("home-btn").addEventListener("click", () => {
    window.location.href = "/"; // Redirect to home page (you can set it as your root path)
});

// Initial game setup
generateShapes(currentLevel);
generateDropZones(currentLevel);
