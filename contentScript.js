let myId = '';
let myPass = '';
setSignInInfo().then(function (success) {
  signIn(success);
});
const URL_Intra1 = 'http://intra1.synap.co.kr/login.ss?cmd=loginForm';
const URL_WIKI = 'http://wiki.synap.co.kr/login.action?os_destination=%2Fdashboard.action&permissionViolation=true';
const URL_ITS = 'http://its.synap.co.kr/secure/Dashboard.jspa';

function setSignInInfo() {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get("data", function (signInfo) {
      if (!chrome.runtime.error) {
        const domain = document.domain;
        if (signInfo.data[domain]) {
          myId = signInfo.data[domain].id;
          myPass = signInfo.data[domain].pw
        }
      }
      resolve();
    });
  });
}

function signIn() {
  if (!!myId && !!myPass) {
    const target = getTargetFromDomain(document.URL);

    switch (target) {
      case 'intra':
        signIn_Intra1();
        break;
      case 'wiki':
        signIn_Wiki();
        break;
      case 'its':
        singIn_Its();
        break;
    }
  }
}

function getTargetFromDomain(domain) {
  let target;

  if (domain.indexOf('intra1.synap.co.kr/login.') > -1) {
    target = 'intra';
  } else if (domain.indexOf('wiki.synap.co.kr/login') > -1) {
    target = 'wiki';
  } else if (domain.indexOf('its.synap.co.kr/') > -1) {
    target = 'its';
  }

  return target;
}

function signIn_Intra1() {
  const id = document.getElementById('id');
  const pass = document.getElementById('password');
  const btnLogin = document.getElementsByTagName('input')[2];
  id.value = myId;
  pass.value = myPass;
  btnLogin.click();
}

function singIn_Its() {
  const id = document.getElementById('login-form-username');
  const pass = document.getElementById('login-form-password');
  const btnLogin = document.getElementById('login-form-submit') || document.getElementById('login');
  id.value = myId;
  pass.value = myPass;
  btnLogin.click();
}

function signIn_Wiki() {
  const id = document.getElementById('os_username');
  const pass = document.getElementById('os_password');
  const btnLogin = document.getElementById('loginButton');
  id.value = myId;
  pass.value = myPass;
  btnLogin.click();
}

function getInputFromPoint() {
  let event = window.event;
  let pointX = event.x;
  let pointY = event.y;
  return document.elementsFromPoint(pointX, pointY).filter(el => {return el.nodeName === 'INPUT'});
}

document.addEventListener('click', getInputFromPoint);
chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    const domain = document.domain;
    console.log(message.type);
    switch (message.type) {
      case "getDomain":
        sendResponse(domain);
        break;
<<<<<<< Updated upstream
=======
      case "getIdInput":
        console.log('1111',getInputFromPoint());
        sendResponse(1);
        break;
      case "getPwInput":
        console.log('2222',getInputFromPoint());
        sendResponse(2);
        break;
>>>>>>> Stashed changes
    }
  }
);