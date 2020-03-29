const initThemeSwitcher = () => {
  const switcher = document.querySelector("#theme-switcher");
  if (!switcher) return;

  const label = switcher
    .closest(".theme-switcher")
    .querySelector(".switch__label");
  const container = document.querySelector("#theme-container");

  let themes = ["dark", "light"];
  let active = 0;

  const handleSwitch = event => {
    let className = `${event.target.name}_${themes[active]}`;
    container.classList.remove(className);

    active = event.target.checked ? 1 : 0;
    label.innerText = active ? "На темном" : "На светлом";

    className = `${event.target.name}_${themes[active]}`;
    container.classList.add(className);
  };

  switcher.addEventListener("change", handleSwitch);
};

export default initThemeSwitcher;
