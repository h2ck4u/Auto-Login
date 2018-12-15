
// 아이디와 패스워드를 셋팅 해야함. 입력받도록 수정하기.
var myId = '';
var myPass = '';

var URL_Intra1 = 'http://intra1.synap.co.kr/login.ss?cmd=loginForm';
var URL_WIKI = 'http://wiki.synap.co.kr/login.action?os_destination=%2Fdashboard.action&permissionViolation=true';
var URL_ITS = 'http://its.synap.co.kr/secure/Dashboard.jspa';

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