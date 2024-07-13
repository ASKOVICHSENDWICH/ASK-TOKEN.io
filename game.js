document.addEventListener('DOMContentLoaded', function() {
    let mainScore = 0; // Инициализация основного счета здесь
    let adViewsToday = 0; // Количество просмотренных реклам за сегодня
    const maxAdViewsPerDay = 10; // Максимальное количество реклам за день

    // Функция для обработки завершения просмотра рекламы и начисления токенов
    function handleAdEnded() {
        mainScore += 10; // Например, 10 токенов за просмотр
        updateMainScore();
        document.getElementById('adContainer').style.display = 'none';
    }

    // Функция для обновления основного счета
    function updateMainScore() {
        document.getElementById('tokenCount').textContent = mainScore;
        console.log("Main score updated: " + mainScore);
    }

    // Обработчик для кнопки "Смотреть рекламу"
    document.getElementById('watchAdButton').addEventListener('click', function() {
        if (adViewsToday < maxAdViewsPerDay) {
            const adContainer = document.getElementById('adContainer');
            if (!adContainer.querySelector('ins.adsbygoogle')) { // Проверяем, есть ли уже реклама в контейнере
                adContainer.style.display = 'block';
                (adsbygoogle = window.adsbygoogle || []).push({});
                adViewsToday += 1;
                console.log("Ads viewed today: " + adViewsToday);
            } else {
                console.log("Already has ads in the container.");
            }
        } else {
            alert('Сегодня вы уже посмотрели максимальное количество реклам.');
        }
    });


    // Обработчики для вкладок (пример)
    document.getElementById('earnTab').addEventListener('click', function() {
        setActiveTab('earnTab', 'adsContent');
    });

    document.getElementById('tasksTab').addEventListener('click', function() {
        setActiveTab('tasksTab', 'tasksContent');
    });

    document.getElementById('walletTab').addEventListener('click', function() {
        setActiveTab('walletTab', 'walletContent');
    });

    // Функция для установки активной вкладки (пример)
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

    // Обработчик для кнопки подписки
    document.getElementById('subscribeButton').addEventListener('click', function() {
        window.open("https://t.me/frogask", "_blank"); // Замените URL на URL вашего Telegram канала
    });

    // Обработчик для кнопки проверки подписки
    document.getElementById('checkSubscriptionButton').addEventListener('click', function() {
        const taskElement = document.getElementById('checkSubscriptionButton').parentElement;
        mainScore += 25; // Начисляем 25 токенов за подписку
        updateMainScore();
        showTokenAnimation(taskElement);
        removeTaskWithAnimation(taskElement);
    });

    // Инициализация
    updateMainScore();
});
