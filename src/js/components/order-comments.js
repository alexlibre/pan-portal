const initOrderComments = () => {
  const step_comments = [
    ...document.querySelectorAll(".order-history__step-comments")
  ];
  if (!step_comments.length) return;
  
  const hide_comments = document.getElementById("order-comments-hide");
  const section = document.getElementById("order-comments");

  let active_step = 0;
  let show = false;
  let comments_toggler;

  const showComments = () => {
    show = true;
    section.classList.add("show");
    comments_toggler.classList.add("active");
    hide_comments.classList.add("active");
  };

  const hideComments = () => {
    show = false;
    section.classList.remove("show");
    comments_toggler.classList.remove("active");
    hide_comments.classList.remove("active");
  };

  const toggleComments = event => {
    if (comments_toggler) comments_toggler.classList.remove("active")

    comments_toggler = event.target;
    let key = comments_toggler.dataset.key;
    if (key === undefined) {
      comments_toggler = comments_toggler.closest(
        ".order-history__step-comments"
      );
      key = comments_toggler.dataset.key;
      if (key === undefined) return;
    }

    // if the same step comments clicked -> toggle, else show
    show = active_step === key ? !show : true;
    active_step = key;

    section.setAttribute("data-index", active_step);
    if (show) showComments(comments_toggler);
    else hideComments(comments_toggler);
  };

  step_comments.forEach(el => el.addEventListener("click", toggleComments));
  hide_comments.addEventListener("click", hideComments);
};

export default initOrderComments;
