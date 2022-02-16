chrome.browserAction.onClicked.addListener(function(activeTab){
    var newURL = "/popup/main.html";
    chrome.tabs.create({ url: newURL });
  });
  chrome.tabs.getAllInWindow(null,function(tabs){
    for (let i = 0;i < tabs.length;i++){
      console.log(tabs[i]);
    }
  })