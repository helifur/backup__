import {clearProxy, getLocalStorageData, updateIcon} from './tools.js';
clearProxy();

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.tabs.create({url: "https://youtubik-app.hooly.info/install"});
    }
});

chrome.runtime.setUninstallURL('https://youtubik-app.hooly.info/uninstall', function () {});


chrome.webRequest.onAuthRequired.addListener(async (details, callback) => {
    const {login, pwd} = await getLocalStorageData(['login', 'pwd']);
    const {host, port} = details.challenger;
    callback({
        authCredentials: {
            username: login,
            password: pwd
        }
    });
}, {urls: ["http://*/*", "https://*/*"]}, ['asyncBlocking']);


import './vee.js';

function initializeExtension() {
    chrome.proxy.settings.get({ incognito: false }, function(details) {
        if (details.levelOfControl == "controlled_by_other_extensions") {
            chrome.storage.local.set({targetState: 'disconnected'});
        } else {
            clearProxy();
            chrome.storage.local.get(["targetState"], async ({targetState}) => {
                if (targetState == "connected") {
                    chrome.storage.local.set({targetState: 'connecting'});
                }else if(targetState == "connecting" || targetState == "error"){
                    chrome.storage.local.set({targetState: 'disconnected'});
                }
            });
        }
    });
}
initializeExtension();

chrome.alarms.create(`ami`, { periodInMinutes: 5 / 60 });
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "init") {
        initializeExtension();
    }else if(alarm.name =="ami"){
        chrome.proxy.settings.get({}, function(details) {
            if(details.levelOfControl=="controlled_by_other_extensions"){
                chrome.storage.local.get("targetState", ({targetState}) => {
                    if(targetState == "connected") {
                        chrome.storage.local.set({targetState: 'disconnected'});
                    }
                });
            }
        });
    }
});

