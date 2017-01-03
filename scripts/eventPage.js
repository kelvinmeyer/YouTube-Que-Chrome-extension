/*
* Kelvin Meyer
* Dec 2016
*/
var q = new que();
/*
* The current vid is in the front of the que
* the top vid is poped
* the tab goes to the url of the new top vid
*/


chrome.tabs.onCreated.addListener(function() {
  chrome.tabs.query({url: "*://www.youtube.com/watch?v=*", active: false}, function(tabs){
    // the for each loop gives index values NB!!!!!!
      for (t in tabs){
        q.add(tabs[t].url);
        chrome.tabs.remove(tabs[t].id);
      }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.reqType === "getQ"){
    sendResponse(JSON.stringify(q));
  }
  else if(request.reqType === "vidOver"){
    nextVid();
  }
  else if(request.reqType === "clearQ"){
    q.nuke();
  }
  else if(request.reqType === "start"){
    chrome.tabs.create({url: q.peek()});
  }
  else if(request.reqType === "toYT") {
    chrome.tabs.create({url: "https://www.youtube.com"});
  }
});

function nextVid(){
  q.pop();
  if(q.length > 0){
    chrome.tabs.query({url: "*://www.youtube.com/watch?v=*", active: true}, function(tabs){
      var tab = tabs[0];
      chrome.tabs.update(tabs[0].id, {url: q.peek()});
    })
  }
}
