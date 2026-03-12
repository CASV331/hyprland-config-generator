import { useMemo } from "react";
import { useConfig } from "../../../../contexts/ConfigContext"

const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function Terminal() {
    const { config } = useConfig()
    const {
        background,
        backgroundOpacity,
        borderColor,
        borderOpacity,
        borderWidth,
        textColor,
        fontSize
    } = config.terminal

    const bgColor = useMemo(
        () => hexToRgba(background, backgroundOpacity),
        [background, backgroundOpacity]
    );

    const borderColorRgba = useMemo(
        () => hexToRgba(borderColor, borderOpacity),
        [borderColor, borderOpacity]
    );
    return (
        <div className="flex-1 flex gap-4 ">
            <div
                className="flex-1 flexrounded-lg p-3 rounded-lg"
                style={{
                    backgroundColor: bgColor,
                    border: `${borderWidth}px solid ${borderColorRgba}`,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                }}
            >
                <div className=" text-gray-300">
                    <div className="font-mono text-green-400/90 space-y-1">
                        <p><span className="text-[#89b4fa]">user@hyprland</span><span className="text-gray-400">:</span><span className="text-[#cba6f7]">~</span><span className="text-gray-400">$</span> neofetch</p>
                        <p className="text-gray-300">OS: Arch Linux</p>
                        <p className="text-gray-300">WM: Hyprland</p>
                        <p className="text-gray-300">Terminal: Kitty</p>
                        <p className="mt-2"><span className="text-[#89b4fa]">user@hyprland</span><span className="text-gray-400">:</span><span className="text-[#cba6f7]">~</span><span className="text-gray-400">$</span> <span className="animate-pulse">▋</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}