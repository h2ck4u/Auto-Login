function save_options() {
    //TBD
}

function delete_options() {
    let checkboxes = document.getElementsByTagName('input');
    Array.from(checkboxes).forEach(checkbox => {
        if (checkbox.checked) {
            getStorageData('data').then(function (data) {
                deleteStroageData(data, checkbox.id);
            });
        }
    });
}

function restore_options() {
    chrome.storage.sync.get("data", function (signInfo) {
        if (!chrome.runtime.error) {
            appendSelect(signInfo);
        }
    });
}

function deleteStroageData(data, domain) {
    if (!!domain) {
        delete data[domain];
        chrome.storage.sync.set({
            "data": data
        });
        window.location.reload();
    }
}

function appendSelect(signInfo) {
    const elSelect = document.getElementById('signInfo');
    const domains = Object.keys(signInfo.data);
    domains.forEach(domain => {
        const container = document.createElement('div');
        const str = `
            <input type="checkbox" id=${domain}> ${domain} </input> 
            <label>ID: </label> <input id="id"></input> 
            <label>PW: </label> <input id="pw" type="password"></input>`;
        container.innerHTML = str;
        container.getElementsByTagName('input')[1].value = signInfo.data[domain].id;
        container.getElementsByTagName('input')[2].value = signInfo.data[domain].pw;
        elSelect.append(container);
    });
}

function getStorageData(key) {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(key, function (signInfo) {
            if (!chrome.runtime.error) {
                resolve(signInfo.data || {});
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('delete').addEventListener('click', delete_options);