const THEME_KEY = "theme";

export function getTheme() {
    return localStorage.getItem(THEME_KEY) ?? "default";
}

export function setTheme(theme: string) {
    localStorage.setItem(THEME_KEY, theme);
}

export function applyTheme(theme: string) {
    switch (theme) {
        case "default":
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) applyTheme("dark");
            else applyTheme("light");
            break;
        case "light":
            document.documentElement.classList.remove("dark");
            break;
        case "dark":
            document.documentElement.classList.add("dark");
            break;
    }
}
