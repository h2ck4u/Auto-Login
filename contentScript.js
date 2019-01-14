var myId = '';
var myPass = '';
setSignInInfo().then(function(success) {
  signIn(success);
});
var URL_Intra1 = 'http://intra1.synap.co.kr/login.ss?cmd=loginForm';
var URL_WIKI = 'http://wiki.synap.co.kr/login.action?os_destination=%2Fdashboard.action&permissionViolation=true';
var URL_ITS = 'http://its.synap.co.kr/secure/Dashboard.jspa';

function setSignInInfo() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get("data", function(signInfo) {
          if (!chrome.runtime.error) {
            var domain = document.domain;
            if(signInfo.data[domain]) {
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
      var target = getTargetFromDomain(document.URL);
      
      switch(target) {
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
    var target; 

    if (domain.indexOf('http://intra1.synap.co.kr/login.') > -1) {
      target = 'intra';
    } else if (domain.indexOf('http://wiki.synap.co.kr/login') > -1) {
      target = 'wiki';
    } else if (domain.indexOf('http://its.synap.co.kr/') > -1) {
      target = 'its';
    }

    return target;
}

function signIn_Intra1() {
  var id = document.getElementById('id');
  var pass = document.getElementById('password');
  var btnLogin = document.getElementsByTagName('input')[2];
  id.value = myId;
  pass.value = myPass;
  btnLogin.click(); 
}
function singIn_Its() {
  var id = document.getElementById('login-form-username');
  var pass = document.getElementById('login-form-password');
  var btnLogin = document.getElementById('login-form-submit');
  id.value = myId;
  pass.value = myPass;
  btnLogin.click(); 
}
function signIn_Wiki() {
  var id = document.getElementById('os_username');
  var pass = document.getElementById('os_password');
  var btnLogin = document.getElementById('loginButton');
  id.value = myId;
  pass.value = myPass;
  btnLogin.click(); 
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
      var domain = document.domain;
      switch(message.type) {
          case "getDomain":
              sendResponse(domain);
          break;
      }
  }
);
