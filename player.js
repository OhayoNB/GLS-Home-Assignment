// Import jQuery
let jQueryUrl = "https://code.jquery.com/jquery-3.6.0.min.js";
let script = document.createElement("script");
script.src = jQueryUrl;
script.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);

// Import attched JSONP endpoint
const url =
  "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

// Append JSONP endpoint to body
checkIfLoaded = () => {
  if (window.jQuery) {
    let jsonScript = document.createElement("script");
    jsonScript.src = url;
    document.body.appendChild(jsonScript);
  } else {
    window.setTimeout(checkIfLoaded, 100);
  }
};

// Import attached CSS file
let link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href =
  "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";
document.head.appendChild(link);
