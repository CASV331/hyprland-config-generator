import { useConfig } from "../../../contexts/ConfigContext"

export function BackgroundColor(section, option, value) {
    return (
        <div>
            <label className="text-gray-400 text-xs">`{option} Color:`</label>
            <input
                type="color"
                value={value}
                onChange={(e) => updateConfig(`${section}`, `${option}`, e.target.value)}
                className="w-full h-8 rounded-md border border-gray-900 cursor-pointer"
            />
        </div>
    )
}