document.querySelectorAll('[data-locale]').forEach(elem => {
    elem.innerHTML = chrome.i18n.getMessage(elem.dataset.locale) || elem.innerText;
});
if(!(navigator.language == "ru" || navigator.language == "ru-RU")){
    $('.title svg').hide();
    $('.title .title2').attr('style','display:flex;');
}

var intervalConnecting = null;

let initProccess = true;

let allright = false;

function updateButtonState(currentState) {
    clearInterval(intervalConnecting);
    intervalConnecting = null;

    if(initProccess==false && currentState == "disconnected"){
        if(localStorage.getItem('rate_pin_wrapper') !== "disabled"){
            $('.rate_pin_wrapper').attr('style','display:flex;');
        }
    }

    const button = $(".main_button");
    const stateClasses = {
        connected: "status1",
        connecting: "status2",
        error: "status3",
        disconnected: ""
    };

    button.removeClass("status1 status2 status3").addClass(stateClasses[currentState] || '');

    const buttonTexts = {
        connected: chrome.i18n.getMessage('connected'),
        disconnected: chrome.i18n.getMessage('disconnected'),
        connecting: chrome.i18n.getMessage('connecting'),
        error: chrome.i18n.getMessage('error')
    };
    
    if(currentState == "connecting" && (navigator.language == "ru" || navigator.language == "ru-RU")){
        if(!intervalConnecting){
            const phrases = [
                "Подождите...",
                "Подключаемся",
                "Процесс в работе...",
                "Проверяем соединение",
                "Оставайтесь на связи",
                "Скоро Вас подключим",
                "Идет загрузка...",
                "Проверяем статус...",
                "Установка Подключения",
                "Обновляем данные...",
                "оставайтесь с нами...",
                "Загрузка информации..",
                "Установка соединения",
                "Ведем подготовку...",
                "Обрабатываем запрос...",
                "Проверка сервера..."
            ];

            intervalConnecting = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * phrases.length);
                $(".main_button .small_circle span").text(phrases[randomIndex]);
            }, 2000);
        }
    }

    $(".main_button .small_circle span").text(buttonTexts[currentState] || chrome.i18n.getMessage('disconnected'));
    initProccess=false;
}

function initializePopupState() {

    $(".allright").on("click", function () {
        allright = true;
        $('.alert_brw').hide();
        $('.main_button').removeClass('off')
    });
    $(".main_button").on("click", function () {
        chrome.storage.local.get("targetState", ({targetState}) => {

            chrome.proxy.settings.get({incognito: false}, function (details) {
                if (targetState=="disconnected" && !allright && details.levelOfControl == "controlled_by_other_extensions") {
                    console.log("Сейчас используется прокси:", details.value);
                    $('.alert_brw').show();
                    $('.main_button').addClass('off').removeClass("status1 status2 status3");
                } else {
                    console.log("Прокси не установлен или используется прямое соединение.", targetState);
                    const newState = targetState !== "connected" ? 'connecting' : 'disconnected';
                    chrome.storage.local.set({targetState: newState});
                }
            });
        });
    });

    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && 'targetState' in changes) {
            updateButtonState(changes.targetState.newValue);
        }
    });

    chrome.storage.local.get('targetState', (result) => {
        let state = result.targetState || 'disconnected';
        if(state == "error" || state == "connecting"){
            state = "disconnected";
        }
        updateButtonState(state);
    });

    $('.rate_pin_wrapper .block .cross').on('click', function(){
        $('.rate_pin_wrapper').hide();
    });

    $('.rate_pin_wrapper .block .but').on('click', function(){
        localStorage.setItem('rate_pin_wrapper', 'disabled');
    });
}

$(document).ready(initializePopupState);

$('.whydidntwork').on('click', function(){
    $('.cloud-wrapper').toggle();
});
$('.cloud-wrapper .close_but').on('click', function(){
    $('.cloud-wrapper').hide();
});