export default function TerminalConfig() {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-gray-300 text-sm">Configure the terminal settings here.</p>
            <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-xs">Font Size</label>
                <input type="number" className="w-full h-8 rounded-md border border-gray-700" />
            </div>
        </div>
    )
}