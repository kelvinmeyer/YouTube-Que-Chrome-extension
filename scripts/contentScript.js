var vid = document.getElementsByTagName("video")[0];
if (vid) {
  //go full screen
  vid.addEventListener("ended", function(){
      chrome.runtime.sendMessage({reqType: "vidOver"});
  });
  vid.addEventListener("playing", function(){
    $(".ytp-fullscreen-button").click();
  });
}
