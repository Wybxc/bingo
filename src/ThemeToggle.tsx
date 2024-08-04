import { createEffect, createSignal, onMount } from "solid-js";

function ThemeToggle() {
  const [theme, setTheme] = createSignal("light");

  onMount(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });

  createEffect(() => {
    if (theme() === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <button
      class="theme-toggle"
      classList={{ "theme-toggle--toggled": theme() === "dark" }}
      type="button"
      title="切换主题"
      aria-label="切换主题"
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="1em"
        height="1em"
        fill="currentColor"
        class="theme-toggle__inner-moon"
        viewBox="0 0 32 32"
      >
        <path d="M27.5 11.5v-7h-7L16 0l-4.5 4.5h-7v7L0 16l4.5 4.5v7h7L16 32l4.5-4.5h7v-7L32 16l-4.5-4.5zM16 25.4a9.39 9.39 0 1 1 0-18.8 9.39 9.39 0 1 1 0 18.8z" />
        <circle cx="16" cy="16" r="8.1" />
      </svg>
    </button>
  );
}

export default ThemeToggle;
