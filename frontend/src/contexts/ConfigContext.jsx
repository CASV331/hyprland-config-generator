import { createContext, useContext, useState } from "react";

const defaultConfig = {
    statusBar: {
        background: "#80b4f4",
        backgroundOpacity: 0.8,
        borderColor: "#89b4fa",
        borderOpacity: 0.8,
        borderWidth: 1,
        textColor: "#cdd6f4",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    },
    terminal: {
        backgroundColor: "#1e1e2e",
        textColor: "#cdd6f4",
        borderColor: "#89b4fa",
        opacity: 0.8
    },
    window: {
        borderColor: "#89b4fa",
        borderWidth: 2,
        borderRadius: 8,
        gap: 4
    }
};

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
    const [config, setConfig] = useState(defaultConfig);

    const updateConfig = (section, key, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            }
        }))
    }

    return (
        <ConfigContext.Provider value={{ config, updateConfig }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    return useContext(ConfigContext);
}