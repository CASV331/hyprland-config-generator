import { useReducer } from "react";
import { createContext, useContext, useState } from "react";
import { generateThemeFromImage } from "../core/theme/generateTheme.js";
// import { applyTheme } from "../core/theme/applyTheme.js";
import { desktopReducer } from "./reducers/desktopReducer.js"
import { buildConfigFromTokens } from "../core/theme/buildConfig.js";
import { defaultTokens } from "../core/theme/themeTokens.js"
import { fileToBase64, loadTheme, saveTheme, saveUserWallpaper } from "../core/theme/themeStorage.js"

// const initialConfig = buildConfigFromTheme(defaultTokens)
const defaultDesktopState = {
    activeDesktop: 1,
    desktops: {
        1: { windows: [] },
        2: { windows: [] },
        3: { windows: [] },
        4: { windows: [] },
        5: { windows: [] },
        6: { windows: [] },
        7: { windows: [] },
        8: { windows: [] },
        9: { windows: [] }

    }
}

const ConfigContext = createContext(null);

function getInitialConfig() {
    const saved = loadTheme()

    if (saved) {
        return buildConfigFromTokens(
            saved.colors ?? defaultTokens,
            saved.wallpaperURL
        )
    }

    return buildConfigFromTokens(defaultTokens)
}

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(getInitialConfig);
    const [desktopState, dispatch] = useReducer(desktopReducer, defaultDesktopState)

    const updateConfig = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            }
        }))
    }

    const openWindow = (type) => dispatch({
        type: "WINDOW_OPEN",
        payload: { type }
    })

    const closeFocusedWindow = () => dispatch({
        type: "WINDOW_CLOSE"
    })

    const focusWindow = (windowId) => dispatch({
        type: "WINDOW_FOCUS",
        payload: { windowId }
    })

    const moveWindow = (windowId, position) => dispatch({
        type: "MOVE_WINDOW",
        payload: { windowId, position }
    })

    const switchWindowDesktop = (desktopNumber) => dispatch({
        type: "WINDOW_SWITCH_DESKTOP",
        payload: { desktopNumber }
    })

    const switchDesktop = (desktopNumber) => dispatch({
        type: "DESKTOP_SWITCH",
        payload: { desktopNumber }
    })

    const setWallpaperTheme = async (source, name) => {
        try {
            let url
            if (source instanceof File) {
                url = await fileToBase64(source)
                saveUserWallpaper(name ?? source.name, url)
            } else {
                url = source
            }

            const generatedTheme = await generateThemeFromImage(url)

            saveTheme(generatedTheme, url)

            setConfig(prev => ({
                ...prev,
                wallpaper: { url },
                statusBar: { ...prev.statusBar, ...generatedTheme.statusBar },
                terminal: { ...prev.terminal, ...generatedTheme.terminal },
                window: { ...prev.window, ...generatedTheme.window },
                colors: { ...prev.colors, ...generatedTheme.colors }
            }))
        } catch (error) {
            console.error("Theme generation failed: ", error)
        }
    };


    return (
        <ConfigContext.Provider value={{
            // Appearance config
            config,
            updateConfig,
            // defaultConfig,
            // Desktop state
            desktopState,
            // Desktop actions
            openWindow,
            closeFocusedWindow,
            focusWindow,
            switchDesktop,
            moveWindow,
            switchWindowDesktop,
            setWallpaperTheme
        }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    return useContext(ConfigContext);
}