import { defaultConfig } from "../../contexts/ConfigContext"

export function buildConfigFromTheme(theme) {
    if (!theme) return defaultConfig

    return {
        ...defaultConfig,
        wallpaper: {
            url: theme.wallpaper?.url ?? defaultConfig.wallpaper.url
        },
        colors: {
            ...defaultConfig.colors,
            ...theme.colors
        },
        statusbar: {
            ...defaultConfig.statusbar,
            ...theme.statusBar
        },
        terminal: {
            ...defaultConfig.terminal,
            ...theme.terminal
        },
        window: {
            ...defaultConfig.window,
            ...theme.window
        }
    }
}