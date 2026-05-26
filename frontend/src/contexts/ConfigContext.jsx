import { useReducer } from "react";
import { createContext, useContext, useState } from "react";
import { generateThemeFromImage } from "../system/theme/generateTheme.js";
import { applyTheme } from "../system/theme/applyTheme.js";
import { desktopReducer } from "./reducers/desktopReducer.js"

const defaultConfig = {
    statusBar: {
        background: "#80b4f4",
        backgroundOpacity: 0.6,
        borderColor: "#89b4fa",
        borderOpacity: 0.8,
        borderWidth: 0,
        textColor: "#cdd6f4",
        fontSize: 11,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    },
    terminal: {
        background: "#1e1e2e",
        backgroundOpacity: 0.8,
        borderColor: "#89b4fa",
        borderOpacity: 0.8,
        borderWidth: 1,
        textColor: "#cdd6f4",
        fontSize: 11,
    },
    window: {
        borderColor: "#89b4fa",
        borderWidth: 2,
        borderRadius: 8,
        gap: 4
    },
    wallpaper: {
        url: "/sunset-anime.jpg",
        dominant: "1e1e2e"
    }
};

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

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(defaultConfig);
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

    const setWallpaperTheme = async (imgFile) => {
        const url = URL.createObjectURL(imgFile)

        const generatedTheme = await generateThemeFromImage(imgFile)

        setConfig(prev => ({
            ...prev,
            wallpaper: { url },
            statusBar: { ...prev.statusBar, ...generatedTheme.statusBar },
            terminal: { ...prev.terminal, ...generatedTheme.terminal },
            window: { ...prev.window, ...generatedTheme.window },
        }))
    };


    return (
        <ConfigContext.Provider value={{
            // Appearance config
            config,
            updateConfig,
            // Desktop state
            desktopState,
            // Desktop actions
            openWindow,
            //closeWindow,
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