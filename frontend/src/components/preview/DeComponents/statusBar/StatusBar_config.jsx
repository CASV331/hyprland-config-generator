import { useConfig } from "../../../../contexts/ConfigContext"

export default function StatusBarConfig() {
    const { config, updateConfig } = useConfig();
    const {
        backgroundColor,
        textColor,
        borderColor,
        backgroundOpacity,
        borderOpacity
    } = config.statusBar;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div>
                    <label className="text-gray-400 text-xs">Background Color</label>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => updateConfig("statusBar", "background", e.target.value)}
                        className="w-full h-8 rounded-md border border-gray-700 cursor-pointer"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <label className="text-gray-400 text-xs">Background opacity</label>
                        <span>{backgroundOpacity}</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            placeholder="0"
                            value={backgroundOpacity ?? 0}
                            onChange={(e) => updateConfig("statusBar", "backgroundOpacity", parseFloat(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs">Border Color</label>
                <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => updateConfig("statusBar", "borderColor", e.target.value)}
                    className="w-full h-8 rounded-md border border-gray-700 cursor-pointer"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs">Text Color</label>
                <input
                    type="color"
                    value={textColor}
                    onChange={(e) => updateConfig("statusBar", "textColor", e.target.value)}
                    className="w-full h-8 rounded-md border border-gray-700 cursor-pointer"
                />
            </div>
        </div>
    )
}