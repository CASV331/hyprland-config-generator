const THEME_KEY = "wm_theme"

export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme)
}

export function loadSavedTheme() {
    return localStorage.getItem(THEME_KEY)
}