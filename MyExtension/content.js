// Inform the background page that this tab should have a page-action
chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction"
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  // First, validate the message's structure
  var domInfo;
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    //Check if the current page is product page
    let PPUrl = window.location.href;
    const showproductpage = PPUrl.toString().includes("/dp/");

    if (showproductpage) {
      console.log("Inside product page");

      // The Product Name
      const prodheader = document.getElementById("productTitle");
      // The Product ASINS
      const prodASIN = document
        .querySelector("#title_feature_div > span")
        .getAttribute("data-edp-asin");

      // Collect all asins's from sponsored products related to this item and from sponsored products related
      let ASINS = document
        .getElementById("sp_detail")
        .getAttribute("data-a-carousel-options");
      ASINS = ASINS.substring(ASINS.indexOf("[") + 1, ASINS.indexOf("]")).split(
        ","
      );
      for (let i = 0; i < ASINS.length; i++) {
        ASINS[i] = ASINS[i].replace(/['"]+/g, "");
      }

      let ASINSfromSPR = document
        .getElementById("sp_detail2")
        .getAttribute("data-a-carousel-options");
      ASINSfromSPR = ASINSfromSPR.substring(
        ASINSfromSPR.indexOf("[") + 1,
        ASINSfromSPR.indexOf("]")
      ).split(",");

      for (let i = 0; i < ASINSfromSPR.length; i++) {
        ASINSfromSPR[i] = ASINSfromSPR[i].replace(/['"]+/g, "");
      }

      // Name of the item from the search bar
      const searchItem = document.getElementById("twotabsearchtextbox").value;

      domInfo = {
        showprod: showproductpage,
        header: prodheader.textContent.replace(/\s+/g, " ").trim(),
        prodasin: prodASIN,
        asins: ASINS,
        sprasins: ASINSfromSPR
      };
    } else {
      //All asins from Search result page ( Sponsored )
      let SponsoredAsinSearchPage = document.querySelectorAll(
        "#s-results-list-atf>li.AdHolder"
      );
      for (let i = 0; i < SponsoredAsinSearchPage.length; i++) {
        let index = SponsoredAsinSearchPage[i].getAttribute("id");
        index = index.substring(index.indexOf("_") + 1, index.length);
        console.log(
          index,
          ":",
          SponsoredAsinSearchPage[i].getAttribute("data-asin")
        );
      }

      // Asins's from Brend
      const brendAsins = document.querySelectorAll(
        "#pdagDesktopSparkleAsinsContainer>div>div> .asinImage"
      );
      for (let i = 0; i < brendAsins.length; i++) {
        console.log(i, ":", brendAsins[i].getAttribute("data-asin"));
      }

      //Sponsored By ( from the brend line )
      let sponsoredBrendBy;
      if (document.getElementById("hsaSponsoredByBrandName") != null) {
        sponsoredBrendBy = document.getElementById("hsaSponsoredByBrandName")
          .innerText;
        console.log("Sponsored By : ", sponsoredBrendBy);
      }

      // Headline
      let headLine;
      if (document.getElementById("pdagDesktopSparkleHeadline") != null) {
        headLine = document.getElementById("pdagDesktopSparkleHeadline")
          .innerText;
        console.log("headline : ", headLine);
      }

      domInfo = {
        showprod: false
      };
    }
    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});

// Getting all Product Information and adding it to productinfo array
// let json = {
//   productinfo: []
// };
// document
//   .querySelectorAll(
//     "#productDetails_detailBullets_sections1 th.prodDetSectionEntry"
//   )
//   .forEach((ele, i) => {
//     json.productinfo.push(ele.textContent.replace(/\s+/g, " ").trim());
//   });
// document.querySelectorAll("td.a-size-base").forEach((ele, j) => {
//   if (j == 8 || j == 0) {
//     return;
//   }
//   json.productinfo[j - 1] +=
//     ":" + ele.textContent.replace(/\s+/g, " ").trim();
// });

// Display all Product names from Sponsored products carousel
// for (
//   let i = 0;
//   i <
//   document.getElementsByClassName(
//     "sponsored-products-truncator-truncated"
//   ).length;
//   i++
// ) {
//   console.log(
//     document.getElementsByClassName(
//       "sponsored-products-truncator-truncated"
//     )[i].textContent
//   );
// }

//Getting all images from Sponsored products carousel
// for (let i = 0; i < json.productinfo.length; i++) {
//   let currectASIN = ASINS[i].replace(/['"]+/g, "");
//  console.log(document.querySelector('#sp_detail_' + currectASIN + '>a>img').getAttribute('src'));
// }
