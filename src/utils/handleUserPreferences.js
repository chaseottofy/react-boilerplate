import { useLocal } from "../hooks";

const handleUserPreferences = () => {
  const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? "theme__light" : "theme__dark";
  const language = window.navigator.language;
  const root = document.documentElement;
  const meta = document.getElementsByName("color-scheme")[0];
  if (!useLocal.has("theme") || useLocal.get("theme") === undefined) {
    useLocal.set("theme", theme);
    root.setAttribute("class", theme);
    meta.setAttribute("content", theme.slice(7));
  } else {
    const localTheme = useLocal.get("theme");
    root.setAttribute("class", localTheme);
    meta.setAttribute(
      "content",
      localTheme === "theme__medium" || localTheme === "theme__dark"
        ? "dark"
        : "light"
    );
  }
  // some SEO people say it's better to localize the lang attribute with 'en-US', 'en-GB', etc. instead of just 'en'. 
  // Hard to find concrete SEO answers sometimes...
  // simple fix if you believe I've been misinformed -- 
  // language = language.split("-")[0];
  if (!useLocal.get("language") !== language || root.getAttribute("lang") !== language) {
    useLocal.set("language", language);
    root.setAttribute("lang", language);
  }
};
export default handleUserPreferences;