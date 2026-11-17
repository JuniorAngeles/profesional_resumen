export const THEME_STORAGE_KEY = "theme"

// Se ejecuta en <head> antes del primer pintado para evitar el parpadeo del tema.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`
