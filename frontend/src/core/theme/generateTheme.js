import materialDynamicColors from "material-dynamic-colors";

export async function generateThemeFromImage(source) {
    let image = source

    if (typeof source === "string") {
        image = await loadImageFromURL(source)
    }

    const palette = await materialDynamicColors(image)

    return {
        wallpaper: {
            dominant: palette.dark.primary,
        },

        statusBar: {
            background: palette.dark.background,
            backgroundOpacity: 0.6,
            borderColor: palette.dark.primary,
            borderOpacity: 1,
            textColor: palette.dark.onBackground,
        },

        terminal: {
            background: palette.dark.background,
            backgroundOpacity: 0.8,
            borderColor: palette.dark.primary,
            borderOpacity: 1,
            textColor: palette.dark.onBackground,
        },

        window: {
            borderColor: palette.dark.primary,
            borderColorUnfocused: palette.dark.outline,
            borderWidth: 2,
            borderRadius: 8,
            gap: 4
        },

        colors: {
            primary: palette.dark.primary,
            secondary: palette.dark.secondary,
            tertiary: palette.dark.tertiary,
            surface: palette.dark.surface,
            background: palette.dark.background
        }
    };
}

function loadImageFromURL(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
    })
}
