// moving the stuff

var tempq = new que();

chrome.runtime.sendMessage({reqType: "getQ"}, function(response){
  tempq.overloadConstructor(JSON.parse(response));
  if(tempq.length == 0){
    $(".mainText").text("No videos in the Queue");
    console.log("do we get here");
  }
  else{
    console.log("or here");
    for(i = 0; i<tempq.length; i++){
        addHTMLViews(tempq.popVidId());
     }
   }
});

function refreshUi(){
  //clear away old vids
  $("#mainDiv").html("<p class=\"mainText\"></P><div class=\"lastLine\"></div>");
  //refresh queue and set it again
  chrome.runtime.sendMessage({reqType: "getQ"}, function(response){
    tempq.overloadConstructor(JSON.parse(response));
    if(tempq.length == 0){
      $(".mainText").text("No videos in the Queue");
      console.log("do we get here");
    }
    else{
      console.log("or here");
      for(i = 0; i<tempq.length; i++){
          addHTMLViews(tempq.popVidId());
       }
     }
  });
}

$("Document").ready(function(){
  //put callback fubntion for vids here so no load time
  $("#next").on("click", function(){
      chrome.runtime.sendMessage({reqType: "vidOver"});
      refreshUi();
  });
  $("#clearQ").on("click", function(){
    chrome.runtime.sendMessage({reqType: "clearQ"});
    refreshUi();
  });
  $("#start").on("click", function(){
    if(tempq.length === 0){
      chrome.runtime.sendMessage({reqType: "toYT"});
    }
    else {
      chrome.runtime.sendMessage({reqType: "start"});
    }
  });
});

function createHTML(i, id){
    return "<div class=\"listItem card\">"+
              "<img src=\"https://img.youtube.com/vi/"+id+"/default.jpg\" class=\"ytThubnail\">"+
              "<div class=\"vidInfo\">"+
                  "<h1>"+i.title+"</h1>"+//video name
                  "<h2>"+i.author_name+"</h2>"+//channel name
              "</div></div>";
}

function addHTMLViews(vid){
  $.getJSON('https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v='+vid+'&format=json', function(data){
    $(".lastLine").after(createHTML(data, vid));
    $(".lastLine").removeClass('lastLine').addClass('lineAccent');
    $("<div class=\"lastLine\"></div>").appendTo("#mainDiv");
  });
}


/*
<div>
  <img src="http://placehold.it/100x100" style="display: inline-block; ">
  <div style="display: inline-block; vertical-align:top;">
    <h1 style="display: block; margin: 0; vertical-align:top;">Video Name</h1>
    <h2 style="display: block; margin: 0; vertical-align:bottom;">Channel Name</h2>
    <h3 style="display: block; margin: 0; vertical-align:bottom;">Time</h3>
  </div>
</div>
*/
