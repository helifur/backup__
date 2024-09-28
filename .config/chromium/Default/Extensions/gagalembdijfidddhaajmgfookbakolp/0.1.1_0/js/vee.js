import {setLocalStorageData, getLocalStorageData, clearProxy, testConn, updateIcon} from './tools.js';
import {enableProxy} from './och.js';

async function manageProxy(response, itter = 0) {
    const server = response.data[itter];

    const {addresses, port, username, password} = server;

    await setLocalStorageData({login: username, pwd: password});

    const host = addresses[0];
    setTimeout(() => {
        chrome.proxy.settings.set({
            value: {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        scheme: 'https',
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
                    if(itter > 1) {
                        await enableProxy();
                        //chrome.storage.local.set({targetState: 'error'});
                    }else{
                        await manageProxy(response, ++itter)
                    }
                }
            }, 100);
        });
    }, 500);
}





const lisr = 'https://antpeak.com/api/server/list/';

function handleStorageChanges(changes, area) {
    if (area === 'local') {
        if (changes.targetState) {
            chrome.storage.local.get(['accessToken', 'refreshToken'], async ({accessToken, refreshToken}) => {
                if (changes.targetState.newValue === 'connecting') {
                    await startVee();
                } else if (changes.targetState.newValue === 'disconnected') {
                    clearProxy();
                }
            });
        }
        if (changes.targetState) {
            updateIcon(changes.targetState.newValue);
        }
    }
}

async function startVee() {
    if(navigator.userAgent.indexOf('YaBrowser')>-1){
        await enableProxy();
        return;
    }

    const response = await request(lisr,
        {"protocol": "https", "region": "nl", "type": 0}
    );
    if (response.success) {

        await manageProxy(response);
    } else {
        console.error("Failed to fetch server list");
    }
}


chrome.storage.onChanged.addListener(handleStorageChanges);


const Pn = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ss = {randomUUID: Pn};

function Cn() {
    if (!yt && (yt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !yt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return yt(An)
}

function Tn(n, e = 0) {
    return Q[n[e + 0]] + Q[n[e + 1]] + Q[n[e + 2]] + Q[n[e + 3]] + "-" + Q[n[e + 4]] + Q[n[e + 5]] + "-" + Q[n[e + 6]] + Q[n[e + 7]] + "-" + Q[n[e + 8]] + Q[n[e + 9]] + "-" + Q[n[e + 10]] + Q[n[e + 11]] + Q[n[e + 12]] + Q[n[e + 13]] + Q[n[e + 14]] + Q[n[e + 15]]
}

function Ws(n, e, t) {

    if (Ss.randomUUID && !e && !n) return Ss.randomUUID();
    n = n || {};
    const s = n.random || (n.rng || Cn)();
    return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, Tn(s)
}



function Wa() {
    const e = ('Chrome' ?? "").toLowerCase();
    return e ? e.includes("firefox") ? "firefox" : e.includes("opera") ? "opera" : e.includes("edge") ? "edge" : "chrome" : "chrome"
}

async function deviceInfo() {
    let uuid = await getLocalStorageData(['uuid'])?.uuid;
    if (uuid == null) {
        uuid = Ws();
        await setLocalStorageData({uuid: uuid});
    }
    const t = chrome.runtime.getManifest(), s = "Chrome",
        i = "10.0.04";
    return {
        udid: uuid,
        appVersion: '3.0.4',
        platform: Wa(),
        platformVersion: navigator.userAgent,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceName: `${s} ${i}`
    }
}

const lanr = 'https://antpeak.com/api/launch/';

async function fetchService(urlRequest, headersRequest, bodyRequest, itter=0) {
    var response = null;
    try {
        response = await fetch(urlRequest, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headersRequest
            },
            body: JSON.stringify(bodyRequest)
        });
    }catch(e){
        chrome.storage.local.set({targetState: 'error'});
    }
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
            chrome.storage.local.set({targetState: 'error'});
            return;
        }
        return fetchService(urlRequest, headersRequest, bodyRequest, ++itter);
    }
}

async function request(requestUrl, requestBody, itter=0) {
    const {accessToken, refreshToken} = await getLocalStorageData(['accessToken', 'refreshToken']);
    if (accessToken) {
        let response = await fetchService(requestUrl, {Authorization: `Bearer ${accessToken}`}, requestBody);
        if (response?.success || response.errors.every(msg => msg.status !== 401)) {
            return response;
        }
    }
    const token = accessToken == null ? void 0 : refreshToken;
    let response = await fetchService(lanr, {Authorization: `Bearer ${accessToken}`}, await deviceInfo());

    if (response.success) {
        await setLocalStorageData({accessToken: response.data.accessToken, refreshToken: response.data.accessToken});
        return await request(requestUrl, requestBody);
    } else if(itter>10) {
        chrome.storage.local.set({targetState: 'error'});
    } else {
        return await request(requestUrl, requestBody, ++itter);
    }
}


export {startVee};