let mainScore = 0;
let earningScore = 0;
let isFarming = false;
const earningsPerSecond = 2; // Количество очков в секунду
const maxEarningScore = 60; // Максимальное количество очков заработка
const updateInterval = 1000; // 1 секунда

function updateMainScore() {
    document.getElementById('mainScore').innerText = mainScore;
}

function updateEarningScore() {
    document.getElementById('earningScore').innerText = earningScore;
}

function checkCollectButton() {
    const collectButton = document.getElementById('collectButton');
    if (earningScore >= maxEarningScore) {
        collectButton.disabled = false;
    } else {
        collectButton.disabled = true;
    }
}

document.getElementById('farmButton').addEventListener('click', function() {
    if (!isFarming) {
        isFarming = true;
        this.disabled = true; // Делаем кнопку "ФАРМИТЬ" неактивной
        const farmingInterval = setInterval(() => {
            if (earningScore < maxEarningScore) {
                earningScore += earningsPerSecond;
                if (earningScore > maxEarningScore) {
                    earningScore = maxEarningScore;
                }
                updateEarningScore();
                checkCollectButton();
            } else {
                clearInterval(farmingInterval); // Останавливаем фарминг, когда достигнуто 60 очков
            }
        }, updateInterval);
    }
});

document.getElementById('collectButton').addEventListener('click', function() {
    if (earningScore >= maxEarningScore) {
        mainScore += earningScore;
        earningScore = 0;
        updateMainScore();
        updateEarningScore();
        document.getElementById('farmButton').disabled = false; // Делаем кнопку "ФАРМИТЬ" активной
        this.disabled = true; // Делаем кнопку "СОБРАТЬ" неактивной
        isFarming = false; // Сбрасываем состояние фарминга
    }
});

// Обновляем счетчики при загрузке страницы
updateMainScore();
updateEarningScore();
checkCollectButton();
