import { useState, useEffect } from "react";

export function StatusBar() {

    const [activeDesktop, setActiveDesktop] = useState(1);

    const desktops = [1, 2, 3, 4];

    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const formattedTime = time.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })
    return (
        <div className="border-2 border-[#89b4fa] rounded-lg flex gap-1 space-between items-center text-xs text-gray-300">
            <div className="flex-1">
                {desktops.map(desktop => (
                    <button key={desktop} onClick={() => setActiveDesktop(desktop)} className={`px-2 py-1 text-xs border-gray-800/50 border rounded-lg ${activeDesktop === desktop ? "bg-blue-500/70" : "bg-gray-800/50"}`}>
                        {desktop}
                    </button>
                ))}
            </div>
            <div className="flex-1">
                {formattedTime}
            </div>
            <div className="flex-1">
                system tray
            </div>

        </div>
    )
}