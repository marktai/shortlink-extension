var url = window.location.toString();

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4) {
    var parsedResponse = JSON.parse(this.responseText);
    if(xhttp.status == 200) {
      var shortlinkUrl = "https://marktai.com/s/" + parsedResponse["ID"];
      chrome.runtime.sendMessage({
        type: "generated",
        text: shortlinkUrl
      });
    } 
    else {
      chrome.runtime.sendMessage({
        type: "error",
        text: parsedResponse["Error"]
      });
    }
  }
};

if(url){
  chrome.runtime.sendMessage({
    type: "generating"
  });
  xhttp.open("POST", "https://www.marktai.com/s", true);

  var body = {
    "Link": url
  }

  xhttp.send(JSON.stringify(body));
}
else{
  chrome.runtime.sendMessage({
    type: "none"
  });
}