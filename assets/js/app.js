"use strict";
(function($) {
  // UI ELEMENTS
  var uiElements = (function() {
    var el = [
      {
        selector: ".js-features-animate",
        offset: "90%",
        effect: "animated zoomIn"
      },
      {
        selector: ".js-work-animate",
        offset: "90%",
        effect: "animated fadeInRightBig"
      },
      {
        selector: ".js-team-animate",
        offset: "80%",
        effect: "animated fadeInLeftBig"
      },
      {
        selector: ".facts__item__symbol_container",
        offset: "100%",
        effect: "animated zoomInUp"
      }
    ];
    var imgLazeLoadClass = "img.lazyload";
    var stickyHeader = "#site-container>header";
    var loaderContainer = ".lds-hourglass";
    var filterObj = {
      link: ".work-filter .filter-link",
      container: ".work-filter-content",
      item: ".work-filter-item"
    };
    var menuContainer = ".main-menu";

    return {
      allUi: el,
      getImgLazeLoadClass: imgLazeLoadClass,
      getHeader: stickyHeader,
      getloaderContainer: loaderContainer,
      getFilterObj: filterObj,
      getMenuContainer: menuContainer
    };
  })();

  // UI CONTROLLER
  var uiController = (function() {
    //ON scroll set way point
    var setUpwayPoint = function setUpwayPoint(item) {
      //const { selector, offset, effect } = item;
      var selector = item.selector;
      var offset = item.offset;
      var effect = item.effect;
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
    //On load image Refresh Waypoint
    var setLazyloadImages = function setLazyloadImages(selector) {
      $(selector).on("load", function() {
        Waypoint.refreshAll();
      });
    };
    //On scroll sticky header
    var makeHeaderSticky = function makeHeaderSticky(headerElement) {
      if (window.pageYOffset > 700) {
        $(headerElement).addClass("add-fix-back");
        $(headerElement).removeClass("remove-fix");
      } else if (window.pageYOffset > 1) {
        $(headerElement).removeClass("add-fix-back");
        $(headerElement).addClass("remove-fix");
      } else {
        $(headerElement).removeClass("add-fix-back");
        $(headerElement).removeClass("remove-fix");
      }
    };
    //showing loader
    var loaderContainerShow = function(loader) {
      $("body").addClass("body-loaderEnable");
    };
    //Hide loader
    var loaderContainerHide = function(loader) {
      $("body").removeClass("body-loaderEnable");
      $(loader).addClass("hide");
    };

    //Filter Now
    const callFilter = function(obj, searvVal, link) {
      const allItems = $(`${obj.container} > ${obj.item}`);

      //Remove Filter Link class and set Active class.
      $(obj.link).removeClass("active");
      $(link).addClass("active");

      //Resetting addedclasses.
      $(allItems).addClass("searching-now");
      $(allItems).removeClass("searching-animate");

      //If all selected then show every item.
      if (searvVal === "*") {
        $(allItems).removeClass("searching-now");
        setTimeout(() => {
          $(allItems).addClass("searching-animate");
        }, 1);

        return;
      }

      //Loop through every item and show it based on clicked value.
      $.each(allItems, function(index, value) {
        const itemValue = $(this).attr("data-filter-value");
        if (itemValue.split(",").indexOf(searvVal) != -1) {
          $(this).removeClass("searching-now");
          setTimeout(() => {
            $(this).addClass("searching-animate");
          }, 1);
        }
      });
    };

    const doSmoothLinks = function(menuContainer) {
      console.log(menuContainer);
      $(`${menuContainer}  a[href*="#"]`).on("click", function(e) {
        e.preventDefault();

        $("html, body").animate(
          {
            scrollTop: $($(this).attr("href")).offset().top
          },
          500,
          "linear"
        );
      });
    };

    return {
      setPoint: setUpwayPoint,
      setLazyloadImagesAction: setLazyloadImages,
      setStickyHeader: makeHeaderSticky,
      setloaderContainerShow: loaderContainerShow,
      setloaderContainerHide: loaderContainerHide,
      doFilter: callFilter,
      setSmotthLinks: doSmoothLinks
    };
  })();

  //APP CONTROLLER

  var appController = (function(ui, controller) {
    var allUi = ui.allUi;
    var getImgLazeLoadClass = ui.getImgLazeLoadClass;
    var stickyHeader = ui.getHeader;
    var filterObj = ui.getFilterObj;
    var getMenuContainer = ui.getMenuContainer;

    var setInit = function setInit() {
      //For lazyload images reset waypoint once images are loaded..
      controller.setLazyloadImagesAction(getImgLazeLoadClass);

      //Filter Work items
      $(filterObj.link).on("click", function(e) {
        e.preventDefault();
        const link = e.target;
        const searchVal = link.getAttribute("data-search");
        //Do search now

        if (link.classList.contains("active") === false) {
          controller.doFilter(filterObj, searchVal, link);
        }
      });

      //On scroll sticky menu.
      window.addEventListener("scroll", function() {
        controller.setStickyHeader(stickyHeader);
      });

      //Smooth scroll On click of top menu.
      controller.setSmotthLinks(getMenuContainer);
    };

    //Set up way pouints for elements
    var setInitWaypoints = function() {
      allUi.forEach(function(item, index) {
        controller.setPoint(item);
      });
    };

    //Loader Show
    var showLoader = function() {
      controller.setloaderContainerShow(ui.getloaderContainer);
    };

    //Loader Hide
    var hideLoader = function() {
      controller.setloaderContainerHide(ui.getloaderContainer);
    };

    return {
      init: setInit,
      initWaypoints: setInitWaypoints,
      initshowLoader: showLoader,
      inithideLoader: hideLoader
    };
  })(uiElements, uiController);

  //Document ready cann init function so that sticky header and refresh waypoint work.
  jQuery(document).ready(function() {
    appController.init();
  });

  //Showing loader on page load
  appController.initshowLoader();

  //After window load set waypoints with set timeout to prevent early waypoint.
  jQuery(window).on("load", function() {
    setTimeout(function() {
      appController.inithideLoader();
      appController.initWaypoints();
    }, 100);
  });

  //Owl Carasouls

  $(document).ready(function() {
    var heroOwl = $(".owl-heroowl");
    heroOwl.owlCarousel({
      margin: 0,
      dots: true,
      nav: false,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      animateOut: "fadeOut",
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    });
    var owl = $(".owl-carousel-team");
    owl.owlCarousel({
      margin: 30,
      dots: true,
      nav: false,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });
  });
})(jQuery);
