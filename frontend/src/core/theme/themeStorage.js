import { generateThemeFromImage } from "./generateTheme"

const THEME_KEY = "default_theme"
const WALLPAPERS_KEY = "user_wallpapers"

export function saveTheme(theme, wallpaperURL) {
    localStorage.setItem(THEME_KEY, JSON.stringify({
        ...theme,
        wallpaperURL
    }))

}

export function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY)
    return saved ? JSON.parse(saved) : null
}

export async function initializeTheme(defaultWallpaper) {
    const saved = loadTheme()
    if (saved) return saved

    const theme = await generateThemeFromImage(defaultWallpaper)
    saveTheme(theme, defaultWallpaper)
    return { ...theme, wallpaperURL: defaultWallpaper }
}

export function saveUserWallpaper(name, url) {
    const current = loadUserWallpapers()
    const updated = [...current, { id: Date.now(), name, url, source: "user" }]
    localStorage.setItem(WALLPAPERS_KEY, JSON.stringify(updated))
}

export function loadUserWallpapers() {
    const saved = localStorage.getItem(WALLPAPERS_KEY)
    return saved ? JSON.parse(saved) : []
}

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}