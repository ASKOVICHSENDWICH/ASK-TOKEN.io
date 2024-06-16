document.addEventListener('DOMContentLoaded', () => {
    const mainScore = document.getElementById('mainScore');
    const earningScore = document.getElementById('earningScore');
    const farmButton = document.getElementById('farmButton');
    const collectButton = document.getElementById('collectButton');
    const circle = document.getElementById('circle');

    let mainCount = 0;
    let earningCount = 0;
    let isFarming = false;
    let earningProgress = 0;

    farmButton.addEventListener('click', () => {
        isFarming = true;
        farmButton.disabled = true;
        collectButton.disabled = false;

        const farmInterval = setInterval(() => {
            if (isFarming) {
                earningCount += 10; // Увеличить заработок на 10 каждую секунду
                earningProgress = (earningCount / 1000) * 100; // Обновить прогресс индикатора (1000 - максимальное значение)
                if (earningProgress > 100) earningProgress = 100; // Ограничить значение до 100%
                earningScore.textContent = earningCount;
                circle.style.strokeDasharray = `${earningProgress}, 100`;
            } else {
                clearInterval(farmInterval);
            }
        }, 1000);
    });

    collectButton.addEventListener('click', () => {
        if (isFarming) {
            mainCount += earningCount;
            mainScore.textContent = mainCount;
            earningCount = 0;
            earningScore.textContent = earningCount;
            earningProgress = 0;
            circle.style.strokeDasharray = `${earningProgress}, 100`;
            isFarming = false;
            farmButton.disabled = false;
            collectButton.disabled = true;
        }
    });

    const mainTab = document.getElementById('mainTab');
    const tasksTab = document.getElementById('tasksTab');
    const referralTab = document.getElementById('referralTab');
    const mainContent = document.getElementById('mainContent');
    const tasksContent = document.getElementById('tasksContent');
    const referralContent = document.getElementById('referralContent');

    mainTab.addEventListener('click', () => {
        mainContent.style.display = 'flex';
        tasksContent.style.display = 'none';
        referralContent.style.display = 'none';
    });

    tasksTab.addEventListener('click', () => {
        mainContent.style.display = 'none';
        tasksContent.style.display = 'flex';
        referralContent.style.display = 'none';
    });

    referralTab.addEventListener('click', () => {
        mainContent.style.display = 'none';
        tasksContent.style.display = 'none';
        referralContent.style.display = 'flex';
    });
});
