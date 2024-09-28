import {setLocalStorageData, getLocalStorageData, clearProxy, testConn} from './tools.js';


async function manageProxy(response, itter = 0) {
    const server = response[itter];

    clearProxy();

    if(!server){
        chrome.storage.local.set({targetState: 'error'});
        return;
    }
    const {username, password} = !server?.credentials ? [null, null] : server.credentials;

    const {host, ip, port, schema} = server.nodes[0];

    if(!username) {
        return;
    }

    await setLocalStorageData({login: username, pwd: password});

    setTimeout(() => {
        chrome.proxy.settings.set({
            value: {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: schema.toLowerCase(),
                        host: host,
                        port: Number(port)
                    }
                }
            },
            scope: "regular"
        }, () => {
            const newState = chrome.runtime.lastError ? 'error' : 'connected';
            setTimeout(async () => {
                let resp = await testConn();
                if(resp) {
                    chrome.storage.local.set({targetState: newState});
                }else{
                    clearProxy();
                    await manageProxy(response, ++itter)
                }
            }, 100);
        });
    }, 1500);
}

async function getList(itter = 0){
    let response;
    try {
        response = await fetch("https://1clickvpn.net/api/v1/servers/", {
            "method": "GET"
        });
    }catch(e){
        chrome.storage.local.set({targetState: 'error'});
    }

    console.warn(response);
    try {
        return await response?.json();
    }catch(e){
        chrome.proxy.settings.clear(
            {},
            function() {
                console.log('Настройки прокси успешно удалены');
            }
        );
        if(itter > 10){
            return;
        }
        return getList(++itter);
    }
}

async function enableProxy(itter=0) {
    if (itter > 3) {
        chrome.storage.local.set({targetState: 'error'});
        console.log('stop');
        return;
    }
    console.log("Enabling proxy...");

    const list = await getList();

    if(!list){
        chrome.storage.local.set({targetState: 'error'});
        return;
    }

    manageProxy(list);
}

export {enableProxy};