$(() => {
  const navColorChange = () => {
    if (window.innerWidth < 1024 && window.scrollY >= 430) {
      $("nav").addClass("scrolled");
    } else {
      $("nav").removeClass("scrolled");
    }
  };
  $(document).on("scroll", () => {
    navColorChange();
  });
  $(window).on("resize", () => {
    navColorChange();
  });

});