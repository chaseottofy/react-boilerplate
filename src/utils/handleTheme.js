import { useLocal } from "../hooks";
const handleTheme = ({ setTheme }) => {
  const root = document.documentElement;
  // temporarily disable transitions during swap to avoid flash.
  // root comes preloaded with a class "theme__preload" that should help prevent flash as well. It really will only be visible on the first load during development. Production builds very rarely have a flash.
  const swap = (add, metaArg) => {
    root.setAttribute("class", `${add} disable-transitions`);
    setTheme(add);
    useLocal.set("theme", add);
    document.getElementsByName("color-scheme")[0].setAttribute("content", metaArg);
    setTimeout(() => {
      root.classList.remove("disable-transitions");
    }, 25);
  };

  if (root.classList.contains("theme__dark")) {
    swap("theme__light", "light");
  } else if (root.classList.contains("theme__light")) {
    swap("theme__medium", "dark light");
  } else {
    swap("theme__dark", "dark");
  }
};


export default handleTheme;