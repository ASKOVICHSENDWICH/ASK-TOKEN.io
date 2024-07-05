// Функция для обработки завершения просмотра рекламы и начисления токенов
function handleAdEnded() {
    mainScore += 10; // Например, 10 токенов за просмотр
    updateMainScore();
    document.getElementById('adVideo').style.display = 'none';
}

// Функция для обновления основного счета
function updateMainScore() {
    document.getElementById('tokenCount').textContent = mainScore;
    console.log("Main score updated: " + mainScore);
}

// Инициализация основного счета
let mainScore = 0;

// Добавление обработчика события для кнопки "Смотреть рекламу"
document.getElementById('watchAdButton').addEventListener('click', function() {
    const adVideo = document.getElementById('adVideo');
    adVideo.style.display = 'block';
    adVideo.play();

    adVideo.addEventListener('ended', handleAdEnded);
});

// Обработчики вкладок
document.getElementById('earnTab').addEventListener('click', function() {
    setActiveTab('earnTab', 'adsContent');
});

document.getElementById('tasksTab').addEventListener('click', function() {
    setActiveTab('tasksTab', 'tasksContent');
});

document.getElementById('walletTab').addEventListener('click', function() {
    setActiveTab('walletTab', 'walletContent');
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

// Установка начальной вкладки как активной
setActiveTab('earnTab', 'adsContent');
