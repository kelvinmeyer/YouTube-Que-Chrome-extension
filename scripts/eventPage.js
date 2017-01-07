/*
* Kelvin Meyer
* Dec 2016
*/
var q = new que();
var watchingTabId;
var power = true;
chrome.storage.sync.get("power", function(p){
  power = p.power;
});
/*
* The current vid is in the front of the que
* the top vid is poped
* the tab goes to the url of the new top vid
*/


chrome.tabs.onCreated.addListener(function() {
  if(power){
    chrome.tabs.query({url: "*://www.youtube.com/watch?v=*", active: false}, function(tabs){
      // the for each loop gives index values NB!!!!!!
        for (t in tabs){
          var temp = new video(tabs[t].url, q.length, false);
          q.add(temp);
          chrome.tabs.remove(tabs[t].id);
        }
    });
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(power){
    if(watchingTabId == tabId){
      q.peek().setActive();
    }
  }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.reqType === "getQ"){
    sendResponse(JSON.stringify(q));
  }
  else if(request.reqType === "vidOver"){
    if(power){
      nextVid();
    }
  }
  else if(request.reqType === "clearQ"){
    if(power){
      q.nuke();
    }
  }
  else if(request.reqType === "start"){
    if(power){
      q.peek().setActive();
      chrome.tabs.create({url: q.peek().url}, function(tab){
        watchingTabId = tab.id;
      });
    }
  }
  else if(request.reqType === "on"){
    power = true;
    chrome.storage.sync.set({"power": power});
    chrome.browserAction.setIcon({
    path: {
      19: "img/logo-off.png",
      38: "img/logo-off-hidpi.png"
    },
    tabId: tab.id
});
  }
  else if(request.reqType === "off"){
    power = false;
    chrome.storage.sync.set({"power": power});
  }
});

function nextVid(){
  q.pop();
  if(q.length > 0){
    chrome.tabs.query({url: "*://www.youtube.com/watch?v=*", active: true}, function(tabs){
      var tab = tabs[0];
      q.peek().setActive();
      chrome.tabs.update(tabs[0].id, {url: q.peek().url});
    })
  }
}
