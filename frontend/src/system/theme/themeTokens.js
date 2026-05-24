export function createThemeTokens(colors) {
    return {
        // Main
        background: colors.background,
        surface: colors.surface,
        surface2: colors.surface2,

        // Accent
        accent: colors.accent,
        accent2: colors.accent2,

        // Text
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,

        // Window
        border: colors.border,
        shadow: colors.shadow,

        // Effects
        blur: colors.blur,
    };
}