// Домашнее задание к занятию 3.1 «Асинхронные запросы»
// Анимация загрузки данных

let currencyListCache = [];

const exchangeRatesHTMLContainer = document.getElementById('items'),
    currencyExchangeRateTemplate = (currencyCharCode, currencyRate) => `
        <div class="item">
            <div class="item__code">
                ${currencyCharCode}
            </div>
            <div class="item__value">
                ${currencyRate}
            </div>
            <div class="item__currency">
                руб.
            </div>
        </div>
    `,
    currencyList = (json = null) => {
        if (json) {
            currencyListCache = Object.values(JSON.parse(json).response['Valute']);
        }
        return currencyListCache ?? [];
    },
    acceptCurrencyList = (json = null) => currencyList(json).forEach(
        currency => exchangeRatesHTMLContainer.insertAdjacentHTML('beforeend',
            currencyExchangeRateTemplate(currency['CharCode'], currency['Value']))
    ),
    delCurrencyList = () => exchangeRatesHTMLContainer.querySelectorAll(`.item`).forEach(
        currency => currency.remove())
;

const URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses',
    loaderWidget = document.getElementById(`loader`),
    loaderWidgetIsActive = () => loaderWidget.classList.contains(`loader_active`),
    loader = (event) => {
        const xhr = event.target;
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            if (loaderWidgetIsActive()) {
                loaderWidget.classList.remove(`loader_active`);
            }
            delCurrencyList();  // ???
            acceptCurrencyList(xhr.responseText);
        }
    };

const progress = () => document.getElementById('progress'),
    updateProgress = (event) => {
        if (event.lengthComputable) {
            if (!progress()) {
                loaderWidget.insertAdjacentHTML('afterend', `<h2 id="progress">0</h2>`);
            }
            const percentComplete = 100 * event.loaded / event.total;
            progress().textContent = percentComplete.toString() + '%';
            document.body.querySelector(`main h2`).textContent = percentComplete.toString() + '%';
            if (percentComplete > 99.99) {
                if (progress()) {
                    progress().remove();
                }
            }
        } else {
            alert(`Невозможно вычислить состояние загрузки, так как размер неизвестен`);
        }
    },
    loaderTransferFailed = (event) => {
        alert("При загрузке файла произошла ошибка!");
    }
;


acceptCurrencyList();

let xhr = new XMLHttpRequest();
// xhr.responseType = 'json';

xhr.onprogress = updateProgress;
xhr.onerror = loaderTransferFailed;

xhr.open('GET', URL, true);

xhr.addEventListener('readystatechange', loader);

xhr.send();

