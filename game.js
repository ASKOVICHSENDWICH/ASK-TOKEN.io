const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 320; // Уменьшен размер холста для мобильных устройств
canvas.height = 480; // Уменьшен размер холста для мобильных устройств

canvas.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Предотвращаем действия по умолчанию, чтобы избежать выделения текста
    if (!isPaused) {
        helicopter.velocity = helicopter.lift;
    }
});

canvas.addEventListener('touchstart', function(event) {
    event.preventDefault(); // Предотвращаем действия по умолчанию, чтобы избежать скроллинга
    if (!isPaused) {
        helicopter.velocity = helicopter.lift;
    }
});


let helicopter = {
    x: 50,
    y: 150,
    width: 50,
    height: 30,
    gravity: 0.3, // Уменьшено значение гравитации
    lift: -8,    // Уменьшено значение подъема
    velocity: 0
};

let buildings = [];
let buildingWidth = 60;
let buildingGap = 200;
let frame = 0;
let score = 0;
let tokens = 0; // Переменная для токенов
let isPaused = true; // Переменная для контроля паузы

let passedBuildings = 0; // Счетчик пройденных препятствий

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
    ctx.font = '24px Arial';
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
    if (frame % 80 === 0) { // Изменено значение с 150 на 100
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
            if (passedBuildings % 5 === 0) { // Проверяем каждое 5 пройденное препятствие
                buildingGap -= 2; // Уменьшаем расстояние между препятствиями
                buildings.forEach(building => {
                    building.x -= 2; // Ускоряем препятствия
                });
            }
        }
        // Проверка, прошел ли вертолет между небоскребами
        if (!buildings[i].passed && buildings[i].x + buildingWidth < helicopter.x) {
            buildings[i].passed = true;
            tokens++; // Начисление токенов
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
    tokens = 0; // Сброс токенов при перезапуске игры
    isPaused = true; // Пауза при перезапуске игры
    passedBuildings = 0; // Сброс счетчика пройденных препятствий
    buildingGap = 200; // Сброс расстояния между препятствиями
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHelicopter();
    buildings.forEach(drawBuilding);
    drawScore();
    drawTokens(); // Отображение токенов
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
