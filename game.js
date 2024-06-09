const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize to set canvas size

canvas.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (!isPaused) {
        helicopter.velocity = helicopter.lift;
    }
});

canvas.addEventListener('touchstart', function(event) {
    event.preventDefault();
    if (!isPaused) {
        helicopter.velocity = helicopter.lift;
    }
});

let helicopter = {
    x: 50,
    y: 150,
    width: canvas.width * 0.1, // Adjusted relative to canvas width
    height: canvas.height * 0.06, // Adjusted relative to canvas height
    gravity: 0.5,
    lift: -6,
    velocity: 0
};

let buildings = [];
let buildingWidth = canvas.width * 0.15; // Adjusted relative to canvas width
let buildingGap = canvas.height * 0.3; // Adjusted relative to canvas height
let frame = 0;
let score = 0;
let tokens = 0;
let isPaused = true;
let passedBuildings = 0;

function drawHelicopter() {
    ctx.fillStyle = 'black';
    ctx.fillRect(helicopter.x, helicopter.y, helicopter.width, helicopter.height);
}

function drawBuilding(building) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(building.x, 0, buildingWidth, building.top);
    ctx.fillRect(building.x, canvas.height - building.bottom, buildingWidth, building.bottom);
}

function drawScore() {
    document.getElementById('score').innerText = score;
}

function drawTokens() {
    ctx.fillStyle = 'black';
    ctx.font = `${canvas.height * 0.05}px Arial`; // Adjusted font size
    ctx.fillText(`Tokens: ${tokens}`, 10, 50);
}

function updateHelicopter() {
    helicopter.velocity += helicopter.gravity;
    helicopter.y += helicopter.velocity;
    if (helicopter.y > canvas.height - helicopter.height || helicopter.y < 0) {
        resetGame();
    }
}

function updateBuildings() {
    if (frame % 80 === 0) {
        let topHeight = Math.random() * (canvas.height - buildingGap);
        let bottomHeight = canvas.height - topHeight - buildingGap;
        buildings.push({
            x: canvas.width,
            top: topHeight,
            bottom: bottomHeight,
            passed: false
        });
    }

    for (let i = buildings.length - 1; i >= 0; i--) {
        buildings[i].x -= 4;
        if (buildings[i].x + buildingWidth < 0) {
            buildings.splice(i, 1);
            score++;
            passedBuildings++;
            if (passedBuildings % 5 === 0) {
                buildingGap -= 2;
                buildings.forEach(building => {
                    building.x -= 2;
                });
            }
        }
        if (!buildings[i].passed && buildings[i].x + buildingWidth < helicopter.x) {
            buildings[i].passed = true;
            tokens++;
        }
    }
}

function checkCollision() {
    for (let i = 0; i < buildings.length; i++) {
        if (helicopter.x < buildings[i].x + buildingWidth &&
            helicopter.x + helicopter.width > buildings[i].x &&
            (helicopter.y < buildings[i].top || helicopter.y + helicopter.height > canvas.height - buildings[i].bottom)) {
            resetGame();
        }
    }
}

function resetGame() {
    helicopter.y = 150;
    helicopter.velocity = 0;
    buildings = [];
    score = 0;
    tokens = 0;
    isPaused = true;
    passedBuildings = 0;
    buildingGap = canvas.height * 0.3; // Reset building gap relative to canvas height
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHelicopter();
    buildings.forEach(drawBuilding);
    drawScore();
    drawTokens();
}

function update() {
    if (!isPaused) {
        frame++;
        updateHelicopter();
        updateBuildings();
        checkCollision();
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isPaused) {
        helicopter.velocity = helicopter.lift;
    }
});

document.getElementById('playButton').addEventListener('click', function() {
    isPaused = false;
});

document.getElementById('settings-button').addEventListener('click', function() {
    alert('Открыть настройки');
});

document.getElementById('missions-button').addEventListener('click', function() {
    alert('Открыть задания');
});

gameLoop();
