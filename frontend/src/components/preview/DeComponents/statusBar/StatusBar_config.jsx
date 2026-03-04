import { useConfig } from "../../../../contexts/ConfigContext"

export default function StatusBarConfig() {
    const { config, updateConfig } = useConfig();
    const {
        background,
        backgroundOpacity,
        borderColor,
        borderOpacity,
        borderWidth,
        textColor,
        fontSize,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight
    } = config.statusBar;

    return (
        <div className="flex flex-col gap-4">
            <div>
                <div className="flex flex-col gap-2 p-4 backgroundContainer">
                    <div>
                        <label className="text-gray-400 text-xs font-black">Background Color:</label>
                        <input
                            type="color"
                            value={background}
                            onChange={(e) => updateConfig("statusBar", "background", e.target.value)}
                            className="w-full h-8 rounded-md border border-gray-900 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <label className="text-gray-400 text-xs font-black">Background opacity:</label>
                            <span className="w-10">{backgroundOpacity}</span>
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

                <div className="flex flex-col gap-2 p-4 borderContainer">
                    <div>
                        <label className="text-gray-400 text-xs font-black">Border Color:</label>
                        <input
                            type="color"
                            value={borderColor}
                            onChange={(e) => updateConfig("statusBar", "borderColor", e.target.value)}
                            className="w-full h-8 rounded-md border border-gray-900 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <label className="text-gray-400 text-xs font-black">Border opacity:</label>
                            <span className="w-10">{borderOpacity}</span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                placeholder="0"
                                value={borderOpacity ?? 0}
                                onChange={(e) => updateConfig("statusBar", "borderOpacity", parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-5 p-4 text-center">
                    <div className="flex flex-col w-1/2">
                        <label className="text-gray-400 text-xs font-black">Border width:</label>
                        <input
                            type="number"
                            value={borderWidth}
                            min={0}
                            max={10}
                            onChange={(e) => {
                                updateConfig("statusBar", "borderWidth", e.target.value)
                            }}
                            className="w-full h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-gray-400 text-xs font-black">Font Size</label>
                        <input
                            type="number"
                            value={fontSize}
                            min={5}
                            max={20}
                            onChange={(e) => updateConfig("statusBar", "fontSize", e.target.value)}
                            className="w-full h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-gray-400 text-xs font-black">Text Color</label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => updateConfig("statusBar", "textColor", e.target.value)}
                            className="w-full h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            <div className=" p-4 marginContainer">
                <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-col items-center">
                        <label className="text-gray-400 text-xs font-black">Margin top:</label>
                        <input
                            type="number"
                            value={marginTop ?? 0}
                            max={20}
                            onChange={(e) => {
                                if (e.target.value >= 0) { updateConfig("statusBar", "marginTop", parseInt(e.target.value)) }
                            }}
                            className="w-12 h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-gray-400 text-xs font-black">Margin Bottom:</label>
                        <input
                            type="number"
                            value={marginBottom ?? 0}
                            max={20}
                            onChange={(e) => {
                                if (e.target.value >= 0) { updateConfig("statusBar", "marginBottom", parseInt(e.target.value)) }
                            }}
                            className="w-12 h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-gray-400 text-xs font-black">Margin Right:</label>
                        <input
                            type="number"
                            max={20}
                            value={marginRight ?? 0}
                            onChange={(e) => {
                                if (e.target.value >= 0) { updateConfig("statusBar", "marginRight", parseInt(e.target.value)) }
                            }}
                            className="w-12 h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-gray-400 text-xs font-black">Margin Left:</label>
                        <input
                            type="number"
                            max={20}
                            value={marginLeft ?? 0}
                            onChange={(e) => {
                                if (e.target.value >= 0) { updateConfig("statusBar", "marginLeft", parseInt(e.target.value)) }
                            }}
                            className="w-12 h-8 rounded-md border border-gray-700 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}