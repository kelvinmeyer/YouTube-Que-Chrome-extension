//holding que
var tempq = new que();


//ui functions
// function refreshUi(){
//   //clear away old vids
//   $("#vidQueueDiv").html("");
//   //refresh queue and set it again
//   //jest a copy of the inital function
//   chrome.runtime.sendMessage({reqType: "getQ"}, function(response){
//     tempq.overloadConstructor(JSON.parse(response));
//     if(tempq.length == 0){
//       $("h2").text("No videos in the Queue");
//       console.log("do we get here");
//     }
//     else{
//       console.log("or here");
//       for(i = 0; i<tempq.length; i++){
//           addHTMLViews(tempq.popVidId());
//        }
//      }
//   });
// }

//html adding to
function createHTML(i, vid){
    if(vid.active){
      return "<div class=\"video active\" style=\"order: "+vid.num+";\">"+
        "<div class=\"activeTriangle\"><i class=\"material-icons md-18 md-red\">play_arrow</i></div>"+
        "<img class=\"thumbnail\" src=\""+vid.thumbnail+"\">"+
        "<div class=\"vidInfo\">"+
          "<h4>"+i.title+"</h4>"+
          "<h5>"+i.author_name+"</h5>"+
        "</div>"+
      "</div>"
    }
    else{
      return "<div class=\"video\" style=\"order: "+vid.num+";\">"+
        "<div class=\"activeTriangle vid-num\">"+vid.num+".</div>"+
        "<img class=\"thumbnail\" src=\""+vid.thumbnail+"\">"+
        "<div class=\"vidInfo\">"+
          "<h4>"+i.title+"</h4>"+
          "<h5>"+i.author_name+"</h5>"+
        "</div>"+
      "</div>"
  }
}
/*
<div class="video">
  <div class="activeTriangle vid-num">2.</div>
  <img class="thumbnail" src="https://i.ytimg.com/vi/0yW7w8F2TVA/hqdefault.jpg?custom=true&w=120&h=90&jpg444=true&jpgq=90&sp=68&sigh=1aZgAcdjkana70f1uXEkpsMaFIA">
  <div class="vidInfo">
    <h4>vid title</h4>
    <h5>channel</h5>
  </div>
</div>
*/

function addHTMLViews(vid){
  $.getJSON('https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v='+vid.id+'&format=json', function(data){
      $("#vidQueueDiv").append(createHTML(data, vid));
  });
}

chrome.runtime.sendMessage({reqType: "getQ"}, function(response){
  //fill the local page array
  tempq.overloadConstructor(JSON.parse(response));
  //if the array is empty then do a thing
  if(tempq.length == 0){
    //$(".mainText").text("No videos in the Queue");
  }
  else{
    //if not then add the vids to the que
    for(vid in tempq.data){
      addHTMLViews(tempq.data[vid]);
    }
   }
});

$("document").ready(function(){
  $("#start-btn").on("click", function(){
    if(tempq.length < 1){
      chrome.runtime.sendMessage({reqType: "toYT"});
    }
    else {
      chrome.runtime.sendMessage({reqType: "start"});
      //refreshUi();
    }
  });

  $('#next-btn').on("click", function(){
    chrome.runtime.sendMessage({reqType: "vidOver"});
    //refreshUi();
  });

  $('#clear-que-btn').on("click", function(){
    chrome.runtime.sendMessage({reqType: "clearQ"});
    //refreshUi();
  });

});
