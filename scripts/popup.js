// moving the stuff

var tempq = new que();

chrome.runtime.sendMessage({reqType: "getQ"}, function(response){
  tempq.overloadConstructor(JSON.parse(response));
  for(i = 0; i<tempq.length; i++){
      addHTMLViews(tempq.popVidId());
   }
});

$("Document").ready(function(){
  //put callback fubntion for vids here so no load time
  $("#next").on("click", function(){
      //chrome.runtime.sendMessage({reqType: "vidOver"});
      $.getJSON('https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=vISPbjWqFiU&format=json', function(data){
        console.log(data.title);
      });

      //ui refresh on the que in the popup
  });
  $("#clearQ").on("click", function(){
    chrome.runtime.sendMessage({reqType: "clearQ"});
  });
  $("#start").on("click", function(){
    chrome.runtime.sendMessage({reqType: "start"});
  })
});

function createHTML(i, id){
    return "<div class=\"listItem\">"+
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
