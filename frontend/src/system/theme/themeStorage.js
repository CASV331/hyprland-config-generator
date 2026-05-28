import { generateThemeFromImage } from "./generateTheme"

const THEME_KEY = "default_theme"

export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme))
}

export function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY)
    return saved ? JSON.parse(saved) : null
}

export async function initializeTheme(defaultWallpaper) {
    const saved = loadTheme()
    if (saved) return saved

    const theme = await generateThemeFromImage(defaultWallpaper)
    saveTheme(theme)
    return theme
}