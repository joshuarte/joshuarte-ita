/*
  Automatically instantiates modules based on data-attributes
  specifying module file-names.
*/

const modules = import.meta.glob("/src/javascripts/modules/*.js");
const moduleElements = document.querySelectorAll("[data-module]");

for (const el of moduleElements) {
  const name = el.getAttribute("data-module"); // es. "ctrl"
  const path = `/src/javascripts/modules/${name}.js`;

  if (modules[path]) {
    modules[path]().then((mod) => {
      const Module = mod.default;
      new Module(el);
    });
  } else {
    console.warn(`⚠️ Modulo "${name}" non trovato a ${path}`);
  }
}
/*
  Usage:
  ======

  html
  ----
  <button data-module="disappear">disappear!</button>

  js
  --
  // modules/disappear.js
  export default class Disappear {
    constructor(el) {
      el.style.display = none
    }
  }
*/
