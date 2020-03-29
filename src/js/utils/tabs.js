const initTabs = () => {
  $(".flat__nav-link").on("click", function(e) {
    const isActive = $(this).hasClass("active");
    if (!isActive) {
      $(".flat__nav-link.active").removeClass("active");
      $(this).addClass("active");
      const tabId = $(this).data("tab");
      $(".flat__image.active").removeClass("active");
      $("#" + tabId).addClass("active");
    }
    e.preventDefault();
  });

  $(".complex__tabs-item").on("click", function(e) {
    const isActive = $(this).hasClass("active");
    if (!isActive) {
      $(".complex__tabs-item.active").removeClass("active");
      $(this).addClass("active");
      const tabId = $(this).data("tab");
      $(".complex__appartments-tab.active").removeClass("active");
      $("#complex-flats-" + tabId).addClass("active");
    }
    e.preventDefault();
  });

  $(".complex__images-nav").on("click", function(e) {
    const isActive = $(this).hasClass("active");
    if (!isActive) {
      $(".complex__images-nav.active").removeClass("active");
      $(this).addClass("active");
      const tabId = $(this).data("tab");
      $(".complex__slider-tab.active").removeClass("active");
      const tab = document
        .getElementById("complex-slider-" + tabId)
        .closest(".complex__slider-tab")
      tab.classList.add("active");
    }
    e.preventDefault();
  });

  $(".calculators__navs-item").on("click", function(e) {
    const isActive = $(this).hasClass("active");
    if (!isActive) {
      $(".calculators__navs-item.active").removeClass("active");
      $(this).addClass("active");
      const tabId = $(this).data("tab");
      console.log(tabId);
      $(".calculators__tab.active").removeClass("active");
      const tab = document.getElementById("calc-" + tabId)
      tab.classList.add("active");
    }
    e.preventDefault();
  });

  $(".complex__view-item").on("click", function(e) {
    const isActive = $(this).hasClass("active");
    if (!isActive) {
      $(".complex__view-item.active").removeClass("active");
      $(this).addClass("active");
      const type = $(this).data("view");
      const prevType = type === "table" ? "cards" : "table";
      $(`.complex__appartments.view-${prevType}`).removeClass(
        `view-${prevType}`
      );
      $(".complex__appartments").addClass(`view-${type}`);
    }
    e.preventDefault();
  });
};

export default initTabs;
