const uiElements = (function() {
  const el = [
    {
      selector: ".js-features-animate",
      offset: "75%",
      effect: "animated zoomIn"
    },
    {
      selector: ".js-work-animate",
      offset: "85%",
      effect: "animated fadeInRightBig"
    },
    {
      selector: ".js-team-animate",
      offset: "85%",
      effect: "animated fadeInLeftBig"
    },
    {
      selector: ".facts__item__symbol_container",
      offset: "85%",
      effect: "animated zoomInUp"
    }
  ];
  return {
    allUi: el
  };
})();

const uiController = (function() {
  const setUpwayPoint = item => {
    const { selector, offset, effect } = item;
    $(selector).waypoint(
      function(direction) {
        if (direction == "down") {
          $(this.element).addClass(effect);
        }
      },
      {
        offset: offset
      }
    );
  };
  return {
    setPoint: setUpwayPoint
  };
})();

const appController = (function(ui, controller) {
  const allUi = ui.allUi;
  const setInit = () => {
    allUi.forEach((item, index) => controller.setPoint(item));
  };
  return {
    init: setInit
  };
})(uiElements, uiController);

appController.init();
