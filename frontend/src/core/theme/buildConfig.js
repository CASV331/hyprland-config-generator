import { defaultTheme } from "./themeTokens"

export function buildConfigFromTokens(tokens = defaultTokens, wallpaperUrl = "/assets/wallpapers/anime_girl_white_hair.png") {

    return {
        colors: {
            primary: tokens.primary,
            secondary: tokens.secondary,
            tertiary: tokens.tertiary,
            surface: tokens.surface,
            surfaceVarian: tokens.surfaceVarian,
            background: tokens.background,
            onSurface: tokens.onSurface,
            onBackground: tokens.onBackground,
            outline: tokens.outline
        },
        wallpaper: {
            url: wallpaperUrl
        },
        statusBar: {
            background: tokens.background,
            backgroundOpacity: 0.8,
            borderColor: tokens.primary,
            borderOpacity: 0.8,
            borderWidth: 2,
            textColor: tokens.onSurface,
            fontSize: 12
        },
        terminal: {
            background: tokens.background,
            backgroundOpacity: 0.8,
            borderColor: tokens.primary,
            borderOpacity: 0.8,
            borderWidth: 2,
            textColor: tokens.onSurface,
            fontSize: 12
        },
        window: {
            borderColor: tokens.primary,
            borderColorUnfocused: tokens.outline,
            borderWidth: 1,
            borderRadius: 8,
            gap: 4
        }
    }
}