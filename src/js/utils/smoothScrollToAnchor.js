const smoothScrollToAnchor = () => {
  const links = [...document.querySelectorAll('a[href^="#"]')];
  if (!links.length) return false;

  links.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const id = this.getAttribute('href');
      if (id !== undefined && id.length > 2) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        if(target.classList.contains('has-offset')) {
          var elementPosition = target.offsetTop;
          window.scrollTo({
            top: elementPosition - 100,
            behavior: "smooth"
          });
        } else {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

export default smoothScrollToAnchor;
