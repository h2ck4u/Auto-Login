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
      var url = document.URL;
      switch(url) {
        case URL_Intra1:
          signIn_Intra1();
          break;
        case URL_WIKI:
          signIn_Wiki();
          break;
        case URL_ITS:
          singIn_Its();
          break;
      }
  }  
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
  var btnLogin = document.getElementById('login');
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
