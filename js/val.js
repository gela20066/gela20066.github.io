let currentRateIDR = null;

function getCurrentRate() {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rateDate = new Date(data.Date).toLocaleDateString('ru-RU');
            const rate = data.Valute.IDR.Value;
            currentRateIDR = rate;

            const rateDiv = document.getElementById('rateBlock');
            rateDiv.innerHTML = `
                <p>Официальный курс ЦБ РФ на <strong>${rateDate}</strong></p>
                <div class="val-rate">1 IDR = ${rate.toFixed(6)} руб.</div>
                <div class="val-rate">1 руб. = ${(1/rate).toFixed(2)} IDR</div>
                <p style="font-size:12px;">Последний курс</p>
            `;
            drawDiagram();
        })
}

const historyData = [
    { date: "26.04", rate: 43.6372 },
    { date: "27.04", rate: 43.6372 },
    { date: "28.04", rate: 43.2967 },
    { date: "29.04", rate: 43.3591 },
    { date: "30.04", rate: 43.4216 },
    { date: "01.05", rate: 43.1779 },
    { date: "02.05", rate: 43.1779 },
    { date: "03.05", rate: 43.1779 },
    { date: "04.05", rate: 43.1779 },
    { date: "05.05", rate: 43.4105 },
    { date: "06.05", rate: 43.3814 },
    { date: "07.05", rate: 43.1705 },
    { date: "08.05", rate: 42.7925 },
    { date: "09.05", rate: 42.7925 },
    { date: "10.05", rate: 42.7925 },
    { date: "11.05", rate: 42.7925 },
    { date: "12.05", rate: 42.7925 },
    { date: "13.05", rate: 42.3703 },
    { date: "14.05", rate: 41.8762 },
    { date: "15.05", rate: 41.7600 },
    { date: "16.05", rate: 41.7537 },
    { date: "17.05", rate: 41.7537 },
    { date: "18.05", rate: 41.7537 },
    { date: "19.05", rate: 41.3521 },
    { date: "20.05", rate: 40.3558 },
    { date: "21.05", rate: 40.0423 },
    { date: "22.05", rate: 40.0284 },
    { date: "23.05", rate: 40.2925 },
    { date: "24.05", rate: 40.2925 },
    { date: "25.05", rate: 40.2925 },
    { date: "26.05", rate: 40.3827 }
];

function drawDiagram() {
    const diagramDiv = document.getElementById('diagram');
    diagramDiv.innerHTML = '';
    if (!historyData.length) return;

    const maxRate = Math.max(...historyData.map(item => item.rate));
    const maxHeight = 150;

    historyData.forEach(item => {
        const height = (item.rate / maxRate) * maxHeight;
        const barItem = document.createElement('div');
        barItem.className = 'bar-item';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = height + 'px';
        bar.textContent = item.rate.toFixed(2);
        bar.onclick = (function(date, rate) {
            return function() {
                document.getElementById('infoBlock').innerHTML = `<strong>${date}</strong> — курс: ${rate.toFixed(4)} руб. за 1 IDR`;
            };
        })(item.date, item.rate);

        const dateLabel = document.createElement('div');
        dateLabel.className = 'bar-date';
        dateLabel.textContent = item.date;

        barItem.appendChild(bar);
        barItem.appendChild(dateLabel);
        diagramDiv.appendChild(barItem);
    });

    document.getElementById('infoBlock').innerHTML = 'Кликните на столбец, чтобы увидеть точный курс';
}


function convertRubToIdr() {
    if (currentRateIDR === null) return;
    const rub = parseFloat(document.getElementById('rubInput').value) || 0;
    const idr = rub / currentRateIDR;
    document.getElementById('idrInput').value = idr.toFixed(2);
}

function convertIdrToRub() {
    if (currentRateIDR === null) return;
    const idr = parseFloat(document.getElementById('idrInput').value) || 0;
    const rub = idr * currentRateIDR;
    document.getElementById('rubInput').value = rub.toFixed(2);
}


const rubInput = document.getElementById('rubInput');
const idrInput = document.getElementById('idrInput');
if (rubInput) rubInput.addEventListener('input', convertRubToIdr);
if (idrInput) idrInput.addEventListener('input', convertIdrToRub);

getCurrentRate();