import "velocity-animate";

export default class Ctrl {
  constructor(el) {
    this.el = el;
    console.log("Controller module loaded");

    // Blocca lo scrolling all'inizio
    document.body.style.overflow = 'hidden';

    var width = 100,
      perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime / 500) % 60) * 100;

    var loader = document.getElementsByClassName("loader");
    var leftMask = document.getElementById("left-mask");
    var rightMask = document.getElementById("right-mask");

    window.Velocity(loader, { height: width + "%" }, time).then(function () {
      window.Velocity(leftMask, { width: width - "%" }, 300).then(function () {
        window.Velocity(rightMask, { width: width - "%" }, 300);
        window.Velocity(loader, { width: 0 }, 300).then(function() {
          // Ripristina lo scrolling alla fine dell'animazione
          document.body.style.overflow = '';
        });
      });
    });
  }
}
