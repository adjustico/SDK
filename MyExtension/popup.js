// Update the relevant fields with the new data
function setDOMInfo(info) {
  if (info !== undefined && info.showprod) {
    document.getElementById("header").textContent = info.header;
    document.getElementById("prodasin").innerHTML =
      "Product Asin : " + info.prodasin;
    document.getElementById("asins").innerHTML = info.asins;
    document.getElementById("sprAsins").innerHTML = info.sprasins;
    // for (let i = 0; i < info.prodinfo.length; i++) {
    //   document.getElementById("prodinfo").innerHTML +=
    //     info.prodinfo[i] + "<br>";
    // }
  } else {
    document.getElementById("header").textContent = "This is not Product Page";
  }
}

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", function() {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        setDOMInfo
      );
    }
  );
});
