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

// Build the tooltip template with the specific id and content
const displayTooltip = (content, id) => {
  let html = `<div class="sttip" id="x_${id}" style="position: absolute;">
  <button class="close""></button>
         <div class="tooltip in">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-arrow second-arrow"></div>
          <div class="popover-inner" id="close_${id}" style="background-color: aliceblue; padding: 20px; opacity: 0.7; font-size: 17px;">
                   ${content}
                   <button  onClick="closeToolTip(${id})" style="width: 50px; height: 30px; float: right; background-color: white; border-radius: 4px; text-align: center;">Close</button>
              </div>
        </div>
    </div>`;
  return html;
};

// Close tooltips with button on each tooltip
const closeToolTip = (id) => {
  if (id == 1) {
    $("#close_1").css({ visibility: "hidden" });
  }
  if (id == 3) {
    $("#close_3").css({ visibility: "hidden" });
  }
  if (id == 4) {
    $("#close_4").css({ visibility: "hidden" });
  }
  if (id == 5) {
    $("#close_5").css({ visibility: "hidden" });
  }
};

// JSONP endpoint URL
const url =
  "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

function getData() {
  // Perfoming an asynchronous HTTP request using Ajax
  $.ajax({
    url: url,
    dataType: "JSONP",
    success: (data) => {
      const jsonData = data.data.structure.steps;
      jsonData.forEach((step) => {
        if (JSON.stringify(step.action.contents) === undefined) {
          return;
        }
        // Transform the recieved data to a string and take the right string using split and slice methods
        let content = JSON.stringify(step.action.contents)
          .split(":")[1]
          .slice(0, -4)
          .slice(1);

        // Take the right content and built HTML template for it, then append it to the HTML body tag
        const html = displayTooltip(content, step.id);
        const div = document.createElement("div");
        div.innerHTML = html;
        const body = document.body;
        body.append(div);

        // Positioning the right messages in the right places on the page using css properties
        if (content.includes("Welcome")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 1000,
            top: 155,
          });
        }

        if (content.includes("Images")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 330,
            top: 60,
          });
        }

        if (content.includes("ENTER")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 520,
            top: 345,
          });
        }

        if (content.includes("to search")) {
          $(`#x_${step.id}`).css({
            display: "block",
            right: 1320,
            top: 440,
          });
        }
      });
    },
  });
}

getData();
