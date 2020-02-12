$("img.lazy").waypoint(
  function() {
    var $element = $(this.element);

    this.destroy();
    $element.on("load", function() {
      Waypoint.refreshAll();
      $(this).waypoint({
        // Whatever waypoint stuff you're doing that you haven't shared
      });
    }),
      $element.attr("src", $element.data("original"));
  },
  { offset: "100%" }
);
