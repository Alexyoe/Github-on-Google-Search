// ==UserScript==
// @name         Github search on Google
// @version      2.0.5
// @description  Adds a button to search github.com with Google
// @author       Alexyoe
// @namespace    https://github.com/Alexyoe/Github-on-Google-Search
// @license      MIT
// @include      http*://www.google.*/search*
// @include      http*://google.*/search*
// @run-at       document-end
// ==/UserScript==

// Settings
const settings = {
  iconVisible: true, // Toggle icon visibility
  nameVisible: true, // Toggle name visibility
  btnPosition: "default", // Options: "start", "end", "default"
  fixSize: true, // Expands the search buttons bar
};

// Start Code
const queryRegex = /q=[^&]+/g;
const siteRegex = /\+site(?:%3A|\:).+\.[^&+]+/g;
const githubUrl = "+site%3Agithub.com";
let githubIcon =
  '<svg class="DCxYpf" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';
const isImageSearch = /[?&]tbm=isch/.test(location.search);

// Sanitize SVG if necessary
if (typeof trustedTypes !== "undefined") {
  const policy = trustedTypes.createPolicy("html", {
    createHTML: (input) => input,
  });
  githubIcon = policy.createHTML(githubIcon);
}


// Main function to run on load
(function () {
  const el = document.createElement("a");
  el.className = isImageSearch ? "NZmxZe" : "LatpMc nPDzT T3FoJb";

  const mainDiv = document.createElement("div");
  mainDiv.className = isImageSearch ? "m3kSL" : "";
  mainDiv.style.cssText = isImageSearch ? "display:inline-flex;gap:5px;" : "";

  // Create the span to wrap the icon and title
  const span = document.createElement("span");
  span.style.cssText = "display:inline-flex;gap:5px;align-items:center;"; // Ensuring vertical centering
  span.className = isImageSearch ? "m3kSL" : "YmvwI";

  if (settings.iconVisible) {
    const iconDiv = document.createElement("div");
    iconDiv.style.cssText = "height:16px;width:16px;fill:white;";
    iconDiv.innerHTML = githubIcon;
    span.appendChild(iconDiv);
  }

  if (settings.nameVisible && !isImageSearch) {
    span.appendChild(document.createTextNode("Github"));
  }

  mainDiv.appendChild(span);
  el.appendChild(mainDiv);

  if (settings.nameVisible && isImageSearch) {
    el.appendChild(document.createTextNode("Github"));
  }

  // Modify the URL to include the Github site search
  el.href = window.location.href.replace(queryRegex, (match) =>
    match.search(siteRegex) >= 0
      ? match.replace(siteRegex, githubUrl)
      : match + githubUrl
  );

  // Determine where to insert the link element
  const insertLink = (menuBar, offset) => {
    const positionMap = {
      start: () => menuBar.insertBefore(el, menuBar.children[offset]),
      end: () => menuBar.appendChild(el),
      default: () => menuBar.appendChild(el),
    };
    (positionMap[settings.btnPosition] || positionMap["default"])();
  };

  if (isImageSearch) {
    const menuBar = document.querySelector(".T47uwc");
    insertLink(menuBar, 1);
  } else {
    const menuBar = document.querySelector(".crJ18e");
    insertLink(menuBar, 0);
  }

  // Fix Sizing
  if (settings.fixSize) {
    const buttonBox = document.querySelector(".xhjkHe");
    buttonBox.style.maxWidth = "inherit";
  }
})();
