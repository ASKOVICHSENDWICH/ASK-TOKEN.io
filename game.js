document.addEventListener('DOMContentLoaded', function() {
    let mainScore = 0;
    let adViewsRemaining = 10;
    const maxDailyAds = 10;
    let gameScore = 0;

    // Функция для обработки завершения просмотра рекламы и начисления токенов
    function handleAdEnded() {
        mainScore += 10;
        updateMainScore();
        adViewsRemaining--;
        updateAdViewsRemaining();
        document.getElementById('adVideo').style.display = 'none';
        document.getElementById('watchAdButton').disabled = adViewsRemaining <= 0;
    }

    // Функция для обновления основного счета
    function updateMainScore() {
        document.getElementById('tokenCount').textContent = mainScore;
        console.log("Main score updated: " + mainScore);
    }

    // Функция для обновления оставшихся просмотров рекламы
    function updateAdViewsRemaining() {
        document.getElementById('adsRemaining').textContent = adViewsRemaining;
        console.log("Ad views remaining: " + adViewsRemaining);
    }

    // Обработчик для кнопки "Смотреть рекламу"
    document.getElementById('watchAdButton').addEventListener('click', function() {
        const adVideo = document.getElementById('adVideo');
        adVideo.style.display = 'block';
        adVideo.play();

        adVideo.addEventListener('ended', handleAdEnded);
    });

    // Обработчики для вкладок
    document.getElementById('earnTab').addEventListener('click', function() {
        setActiveTab('earnTab', 'adsContent');
    });

    document.getElementById('tasksTab').addEventListener('click', function() {
        setActiveTab('tasksTab', 'tasksContent');
    });

    document.getElementById('walletTab').addEventListener('click', function() {
        setActiveTab('walletTab', 'walletContent');
    });

    document.getElementById('gameTab').addEventListener('click', function() {
        setActiveTab('gameTab', 'gameContent');
        startGame();
    });

    // Функция для установки активной вкладки
    function setActiveTab(activeTabId, contentId) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(activeTabId).classList.add('active');

        document.querySelectorAll('.content-pane').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(contentId).style.display = 'block';
    }

    // Функция для удаления задачи с анимацией
    function removeTaskWithAnimation(taskElement) {
        taskElement.style.transition = 'opacity 0.5s ease-out';
        taskElement.style.opacity = '0';
        setTimeout(() => {
            taskElement.remove();
        }, 500);
    }

    // Функция для показа анимации получения токенов
    function showTokenAnimation(taskElement) {
        const tokenAnimation = document.createElement('div');
        tokenAnimation.className = 'token-animation';
        tokenAnimation.textContent = '+25';
        taskElement.appendChild(tokenAnimation);

        setTimeout(() => {
            tokenAnimation.style.transition = 'opacity 0.5s ease-out';
            tokenAnimation.style.opacity = '0';
        }, 0);

        setTimeout(() => {
            tokenAnimation.remove();
        }, 500);
    }

    // Обработчики для кнопок проверки задач
    document.getElementById('checkTask1Button').addEventListener('click', function() {
        const answer = parseInt(document.getElementById('task1Answer').value, 10);
        const taskElement = document.getElementById('checkTask1Button').parentElement;
        if (answer === 6) { // Правильный ответ для задачи 1
            mainScore += 25; // Начисляем 25 токенов за правильный ответ
            updateMainScore();
            showTokenAnimation(taskElement);
            removeTaskWithAnimation(taskElement);
        }
    });

    document.getElementById('checkTask2Button').addEventListener('click', function() {
        const answer = parseInt(document.getElementById('task2Answer').value, 10);
        const taskElement = document.getElementById('checkTask2Button').parentElement;
        if (answer === 10) { // Правильный ответ для задачи 2
            mainScore += 25; // Начисляем 25 токенов за правильный ответ
            updateMainScore();
            showTokenAnimation(taskElement);
            removeTaskWithAnimation(taskElement);
        }
    });

    document.getElementById('checkTask3Button').addEventListener('click', function() {
        const answer = parseInt(document.getElementById('task3Answer').value, 10);
        const taskElement = document.getElementById('checkTask3Button').parentElement;
        if (answer === 15) { // Правильный ответ для задачи 3
            mainScore += 25; // Начисляем 25 токенов за правильный ответ
            updateMainScore();
            showTokenAnimation(taskElement);
            removeTaskWithAnimation(taskElement);
        }
    });

    // Мини-игра "Knife Hit"
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let appleX, appleY, knifeY;
    const appleRadius = 15;
    const knifeWidth = 5;
    const knifeHeight = 20;
    let knifeThrown = false;

    function startGame() {
        gameScore = 0;
        knifeY = canvas.height - knifeHeight;
        placeApple();
        gameLoop();
    }

    function placeApple() {
        appleX = Math.random() * (canvas.width - 2 * appleRadius) + appleRadius;
        appleY = Math.random() * (canvas.height / 2 - 2 * appleRadius) + appleRadius;
    }

    function drawApple() {
        ctx.beginPath();
        ctx.arc(appleX, appleY, appleRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();
    }

    function drawKnife() {
        ctx.beginPath();
        ctx.rect(canvas.width / 2 - knifeWidth / 2, knifeY, knifeWidth, knifeHeight);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.closePath();
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawApple();
        drawKnife();

        if (knifeThrown) {
            knifeY -= 5;
            if (knifeY < appleY + appleRadius && knifeY > appleY - appleRadius &&
                canvas.width / 2 > appleX - appleRadius && canvas.width / 2 < appleX + appleRadius) {
                gameScore++;
                adViewsRemaining++;
                updateAdViewsRemaining();
                document.getElementById('watchAdButton').disabled = adViewsRemaining <= 0;
                knifeThrown = false;
                knifeY = canvas.height - knifeHeight;
                placeApple();
            } else if (knifeY < 0) {
                knifeThrown = false;
                knifeY = canvas.height - knifeHeight;
            }
        }

        requestAnimationFrame(gameLoop);
    }

    canvas.addEventListener('click', function() {
        if (!knifeThrown) {
            knifeThrown = true;
        }
    });

    // Обновляем оставшиеся просмотры рекламы каждый день
    setInterval(function() {
        adViewsRemaining = maxDailyAds;
        updateAdViewsRemaining();
        document.getElementById('watchAdButton').disabled = adViewsRemaining <= 0;
    }, 86400000); // 24 часа в миллисекундах

    updateMainScore();
    updateAdViewsRemaining();
});
