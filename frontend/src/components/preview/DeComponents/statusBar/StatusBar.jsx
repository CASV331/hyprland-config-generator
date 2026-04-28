import { useState, useEffect, useMemo } from "react";
import { useConfig } from "../../../../contexts/ConfigContext";

const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function StatusBar() {
    const { config, desktopState, switchDesktop } = useConfig();
    const { activeDesktop, desktops } = desktopState
    const {
        background,
        backgroundOpacity,
        textColor,
        fontSize,
        borderColor,
        borderOpacity,
        borderWidth,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight
    } = config.statusBar;

    const bgColor = useMemo(
        () => hexToRgba(background, backgroundOpacity),
        [background, backgroundOpacity]
    );

    const borderColorRgba = useMemo(
        () => hexToRgba(borderColor, borderOpacity),
        [borderColor, borderOpacity]
    );


    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div
            className="rounded-lg flex gap-1 justify-between items-center"
            style={{
                backgroundColor: bgColor,
                border: `${borderWidth}px solid ${borderColorRgba}`,
                color: textColor,
                fontSize: `${fontSize}px`,
                margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
            }}
        >
            <div className="flex-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].filter(desktop =>
                    desktops[desktop].windows.length > 0 || desktop === activeDesktop
                )
                    .map(desktop => (
                        <button
                            key={desktop}
                            onClick={() => switchDesktop(desktop)}
                            className={`px-2 py-1 border rounded-lg ${activeDesktop === desktop ? "bg-blue-500/70 border-blue-400/50" : "bg-gray-800750 border-gray-600/50"}`}
                        >
                            {desktop}
                        </button>
                    ))
                }
            </div>

            <div className="flex-1 text-center font-mono">
                {formattedTime}
            </div>

            <div className="flex-1 text-right pr-2">
                system tray
            </div>
        </div >
    );
}