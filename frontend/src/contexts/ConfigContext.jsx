import { createContext, useContext, useState } from "react";

const defaultConfig = {
    statusBar: {
        background: "#80b4f4",
        backgroundOpacity: 0.8,
        borderColor: "#89b4fa",
        borderOpacity: 0.8,
        borderWidth: 1,
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
    }
};

const defaultDesktopState = {
    activeDesktop: 1,
    desktops: {
        1: { windows: [] }
    }
}
// // Una ventana se ve así:
// {
//   id: "win_1",
//   type: "terminal",  // en el futuro: "browser", "filemanager", etc.
//   position: { x: 50, y: 50 },
//   size: { width: 400, height: 300 },
//   isMinimized: false,
//   isFocused: true,
//   history: [],       // comandos ejecutados
// }

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(defaultConfig);
    const [desktopState, setDesktopState] = useState(defaultDesktopState)

    const updateConfig = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            }
        }))
    }
    // Action for opening a window
    const openWindow = (type) => {
        const newWindow = {
            id: `win_${Date.now()}`,
            type,
            position: { x: 50 + Math.random() * 100, y: 50 + Math.random() * 50 },
            size: { width: 400, height: 300 },
            isMinimized: false,
            isFocused: true,
            history: []
        }

        setDesktopState(prev => ({
            ...prev,
            desktops: {
                ...prev.desktops,
                [prev.activeDesktop]: {
                    windows: [...prev.desktops[prev.activeDesktop].windows.map(w => ({
                        ...w,
                        isFocused: false
                    })),
                        newWindow]
                }
            }
        }))
    }
    // // Close a window and asign focus to the closest one
    const closeFocusedWindow = () => {
        setDesktopState(prev => {
            const windows = prev.desktops[prev.activeDesktop].windows
            const focusedIndex = windows.findIndex(w => w.isFocused)

            if (focusedIndex === -1) return prev

            const remaining = windows.filter((_, i) => i !== focusedIndex)

            const nextFocusIndex = focusedIndex > 0 ? focusedIndex - 1 : 0

            const updatedWindows = remaining.map((w, i) => ({
                ...w,
                isFocused: i === nextFocusIndex
            }))

            return {
                ...prev,
                desktops: {
                    ...prev.desktops,
                    [prev.activeDesktop]: {
                        windows: updatedWindows
                    }
                }
            }
        })
    }
    // Action for focus a window
    const focusWindow = (windowId) => {
        setDesktopState(prev => ({
            ...prev,
            desktops: {
                ...prev.desktops,
                [prev.activeDesktop]: {
                    windows: prev.desktops[prev.activeDesktop].windows.map(w => ({
                        ...w,
                        isFocused: w.id === windowId
                    }))
                }
            }
        }))
    }
    // Action for moving a window
    const moveWindow = (windowId, newPosition) => {
        setDesktopState(prev => ({
            ...prev,
            desktops: {
                ...prev.desktops,
                [prev.activeDesktop]: {
                    windows: prev.desktops[prev.activeDesktop].windows.map(w => w.id === windowId ? { ...w, position: newPosition } : w)
                }
            }
        }))
    }
    // Switch between desktops
    const switchDesktop = (desktopNumber) => {
        setDesktopState(prev => ({ ...prev, activeDesktop: desktopNumber }))
    }

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
            moveWindow
        }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    return useContext(ConfigContext);
}