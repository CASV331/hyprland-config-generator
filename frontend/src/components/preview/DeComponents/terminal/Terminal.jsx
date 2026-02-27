export function Terminal() {
    return (
        <div className="flex-1 flex mt-2 gap-4 ">
            <div className="flex-1 flexrounded-lg bg-gray-800/60 backdrop-blur-sm border-2 border-[#89b4fa] p-3 rounded-lg">
                <div className="text-xs text-gray-300">
                    <div className="font-mono text-xs text-green-400/90 space-y-1">
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