'use strict';

window.$ = jQuery;

// Document ready function
$(() => {
    handleMatchHeight();
});

function handleMatchHeight() {
  const elementsToMatch = [
    { element: (".views-view-responsive-grid .views-field-title"), options: {} },
    { element: (".views-view-responsive-grid .views-field-body"), options: {} },
  ];

  const applyMatchHeight = () => {
    elementsToMatch.forEach(item => {
      $(item.element).matchHeight(item.options);
    });
  };

  let windowWidth = $(window).width();

  applyMatchHeight();

  $(window).on('resize', function () {
    if ($(window).width() != windowWidth) {
      // Update the window width for next time
      windowWidth = $(window).width();

      applyMatchHeight();
    }
  })
}