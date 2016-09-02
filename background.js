chrome.runtime.onMessage.addListener(function(message) {
  if(message && message.type === "generating"){
    chrome.notifications.clear("1");
    chrome.notifications.create(
      "1",
      {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icon.png"),
        title : "Generating shortlink...",
        message : "",
        isClickable: true
      },
      function() {
        console.log(chrome.runtime.lastError);
      }
    );
  }
  else if (message && message.type === "generated") {
    var input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = message.text;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();

    chrome.notifications.clear("1");
    chrome.notifications.create(
      "1",
      {
        type:"basic",
        iconUrl:chrome.runtime.getURL("icon.png"),
        title : "Copied shortlink to clipboard!",
        message : "URL: " + message.text,
        isClickable: true
      },
      function() {
        console.log(chrome.runtime.lastError);
      }
    );
  }
  else if (message && message.type === "error") {
    chrome.notifications.clear("1");
    chrome.notifications.create(
      "1",
      {
        type:"basic",
        iconUrl:chrome.runtime.getURL("icon.png"),
        title : "There was an error :(",
        message : message.text,
        isClickable: true
      },
      function() {
        console.log(chrome.runtime.lastError);
      }
    );
  }

  else if(message && message.type == "none"){
    chrome.notifications.clear("1");
    chrome.notifications.create(
      "1",
      {
        type:"basic",
        iconUrl:chrome.runtime.getURL("icon.png"),
        title : "Can't extract URL",
        message : "",
        isClickable: true
      },
      function() {
        console.log(chrome.runtime.lastError);
      }
    );
  }
});