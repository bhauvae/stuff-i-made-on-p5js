import p5 from "./node_modules/p5/lib/p5.esm.js";

// 1) Grab path: "/Physarum" → "Physarum"
const raw = window.location.pathname.split("/")[1];
const sketchName = raw && raw.length ? raw : "template";

// 2) Set the **browser tab** title:
document.title = `${sketchName}`;

// 3) Import & mount the sketch:
import(`./sketches/${sketchName}/sketch.js`)
  .then((mod) => new p5(mod.default, "sketch"))
  .catch((err) => {
    console.error(`Could not load sketch “${sketchName}”`, err);
    document.getElementById("sketch-container").textContent =
      "Sketch not found!";
  });
