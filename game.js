document.getElementById('tasksTab').addEventListener('click', function() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('tasksContent').style.display = 'block';
    document.getElementById('referralContent').style.display = 'none';
});

document.getElementById('mainTab').addEventListener('click', function() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('tasksContent').style.display = 'none';
    document.getElementById('referralContent').style.display = 'none';
});

document.getElementById('referralTab').addEventListener('click', function() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('tasksContent').style.display = 'none';
    document.getElementById('referralContent').style.display = 'block';
});

let mainScore = 0;
let earningScore = 0;
let isFarming = false;
let farmingInterval;
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
        farmingInterval = setInterval(() => {
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
        clearInterval(farmingInterval); // Останавливаем текущий интервал фарминга
    }
});

// Обновляем счетчики при загрузке страницы
updateMainScore();
updateEarningScore();
checkCollectButton();
