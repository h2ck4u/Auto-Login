document.getElementById("addConfig").onclick = function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "getDomain"
    }, function (domain) {
      getStorageData('data').then(function (data) {
        updateStroageData(data, domain);
      });
    });
  });
}

document.getElementById("labelId").onclick = function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "getIdInput"
    }, function (response) {
      console.log(response);
    });
  });
}

document.getElementById("labelPw").onclick = function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "getPwInput"
    }, function (response) {
      console.log(response);
    });
  });
}

document.getElementById("addConfig").onclick = function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "getDomain"
    }, function (domain) {
      getStorageData('data').then(function (data) {
        updateStroageData(data, domain);
      });
    });
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

function updateStroageData(value, domain) {
  if (!!domain) {
    let id = document.getElementById('id').value;
    let pw = document.getElementById('pw').value;
    let keys = Object.keys(value || {}) || [];
    let updataData = {};
    keys.forEach(key => {
      updataData[key] = value[key];
    });
    updataData[domain] = {
      id: id,
      pw: pw
    }
    chrome.storage.sync.set({
      "data": updataData
    });
  }
}

document.getElementById("option").onclick = function () {
  window.open(chrome.runtime.getURL('options.html'));
};