document.getElementById('tasksTab').addEventListener('click', function() {
    switchContent('tasksContent');
});

document.getElementById('mainTab').addEventListener('click', function() {
    switchContent('mainContent');
});

document.getElementById('referralTab').addEventListener('click', function() {
    switchContent('referralContent');
});

document.getElementById('settingsTab').addEventListener('click', function() {
    switchContent('settingsContent');
});

document.getElementById('aboutButton').addEventListener('click', function() {
    window.open('https://instagram.com/zaur.kam', '_blank');
});

document.getElementById('opacityRange').addEventListener('input', function() {
    const blurValue = this.value;
    const blurBackground = document.getElementById('blurBackground');
    if (blurBackground) {
        blurBackground.style.filter = `blur(${blurValue}px)`;
    } else {
        console.error('Element with id "blurBackground" not found.');
    }
});

let mainScore = 0;
let earningScore = 0;
let isFarming = false;
let farmingInterval;

const earningsPerSecond = 100;
const maxEarningScore = 1000;
const updateInterval = 1000;

function updateMainScore() {
    document.getElementById('mainScore').innerText = mainScore;
}

function updateEarningScore() {
    document.getElementById('earningScore').innerText = earningScore;
}

function updateProgressBar() {
    const progress = (earningScore / maxEarningScore) * 100;
    document.getElementById('circle').style.strokeDasharray = `${progress}, 100`;
}

function checkCollectButton() {
    const collectButton = document.getElementById('collectButton');
    collectButton.disabled = earningScore < maxEarningScore;
}

document.getElementById('farmButton').addEventListener('click', function() {
    if (!isFarming) {
        isFarming = true;
        this.disabled = true;
        farmingInterval = setInterval(() => {
            if (earningScore < maxEarningScore) {
                earningScore += earningsPerSecond;
                if (earningScore > maxEarningScore) {
                    earningScore = maxEarningScore;
                }
                updateEarningScore();
                updateProgressBar();
                checkCollectButton();
            } else {
                clearInterval(farmingInterval);
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
        updateProgressBar();
        document.getElementById('farmButton').disabled = false;
        this.disabled = true;
        isFarming = false;
        clearInterval(farmingInterval);
    }
});

function switchContent(contentId) {
    const contents = document.querySelectorAll('.content-pane');
    contents.forEach(content => {
        content.style.display = content.id === contentId ? 'block' : 'none';
    });
}

updateMainScore();
updateEarningScore();
updateProgressBar();
checkCollectButton();
