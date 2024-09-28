function clearProxy() {
    chrome.proxy.settings.clear({scope: 'regular'}, () => {
        const newState = chrome.runtime.lastError ? 'error' : 'disconnected';
        chrome.storage.local.set({currentState: newState});
    });
}


async function getLocalStorageData(keys) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result);
            }
        });
    });
}

async function setLocalStorageData(data) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(data, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(); // Успешное завершение
            }
        });
    });
}

async function testConn(){
    try {
        const response = await fetch("https://hooly.info", {
            "headers": {
                "accept": "application/json"
            },
            "body": null,
            "method": "GET",
            "credentials": "omit"
        });
        if (response.status === 200) {
            return true;
        }
    }catch(e){
        return false;
    }
}

function updateIcon(currentState) {
    const icon = currentState === 'connected' ? '/imgs/youtubik128.png' : '/imgs/youtubik128_grey.png';
    chrome.action.setIcon({path: icon});
}

export {setLocalStorageData, getLocalStorageData, clearProxy, testConn, updateIcon};