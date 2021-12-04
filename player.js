// Load jQuery asynchronously
async function loadJquery() {
  let script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
  document.getElementsByTagName("head")[0].appendChild(script);

  // Ensure that jQuery loaded successfully
  while (
    typeof window.jQuery === undefined ||
    typeof window.$ === undefined ||
    typeof $.ajax !== "function"
  ) {
    await sleep(1000);
  }
}

// Sleep function for 1 second if jQuery not yet loaded
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await loadJquery();

// Import attached CSS file
const importCSS = () => {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";
  document.head.appendChild(link);
};

importCSS();
