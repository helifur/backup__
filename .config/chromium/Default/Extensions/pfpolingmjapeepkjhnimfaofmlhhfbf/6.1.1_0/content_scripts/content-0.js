(()=>{"use strict";setInterval((function(){try{chrome.storage.local.get("currentState",(e=>{"connected"===e.currentState&&function(){if(document.querySelector(".ytp-spinner")){const e="Пожалуйста подождите...<br>ЮБуст очень старается ускорить загрузку ❤️",t=document.querySelector(".ytp-spinner-message");t instanceof HTMLElement&&t.innerHTML!==e&&(t.innerHTML=e,t.style.marginTop="48px"),t instanceof HTMLElement&&"block"!==t.style.display&&(t.style.display="block")}}()}))}catch(e){}}),1e3)})();