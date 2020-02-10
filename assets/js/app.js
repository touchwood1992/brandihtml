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
  const setUpwayPoint = function(item) {
    //const { selector, offset, effect } = item;

    const selector = item.selector;
    const offset = item.offset;
    const effect = item.effect;

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
  const setInit = function() {
    allUi.forEach(function(item, index) {
      controller.setPoint(item);
    });
  };
  return {
    init: setInit
  };
})(uiElements, uiController);

appController.init();
