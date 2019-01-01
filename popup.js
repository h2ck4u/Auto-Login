document.getElementById("addConfig").onclick = function() {
  var data = {};
  var id = document.getElementById('id').value;
  var pass = document.getElementById('pass').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { 
      chrome.tabs.sendMessage(tabs[0].id, {type:"getDomain"}, function(response){
        data[response] = {
          id: id,
          pass: pass
        };
        chrome.storage.sync.set({ "data" : data }, function() {
          if (chrome.runtime.error) {
            console.log("Runtime error.");
          }
        });
      });
    });
    
    // window.close();
}