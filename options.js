function save_options() {
    //TBD
}

function delete_options() {
    //TBD
}
  
function restore_options() { 
    chrome.storage.sync.get("data", function(signInfo) {
        if (!chrome.runtime.error) {
            appendSelect(signInfo);
        }
    });
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

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('delete').addEventListener('click', delete_options);