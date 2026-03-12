import { useRef, useState, useEffect } from "react"
import { useConfig } from "../contexts/ConfigContext"

export function Window({ windowData, children }) {
    const { config, focusWindow, closeFocusedWindow, moveWindow } = useConfig()
    const { borderColor, borderWidth, borderRadius } = config.window

    const { id, position, size, isFocused } = windowData
    const [pos, setPos] = useState(position)
    const isDragging = useRef(false)
    const dragOffset = useRef({ x: 0, y: 0 })

    // Listen to Alt button
    const isModPressed = useRef(false)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "z") isModPressed.current = true
        }
        const handleKeyUp = (e) => {
            if (e.key === "z") isModPressed.current = false
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    const handleMouseDown = (e) => {
        // Focus window on click
        focusWindow(id);

        // Drag if mod is pressed
        if (!isModPressed.current) return;

        e.preventDefault();
        isDragging.current = true

        dragOffset.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        }


        const handleMouseMove = (e) => {
            if (!isDragging.current) return
            const newPos = {
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            }
            setPos(newPos)
        }

        const handleMouseUp = () => {
            isDragging.current = false;
            // Sync final position with context
            moveWindow(id, pos)
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

    }

    const handleActions = (e) => {
        if (isModPressed & e.key === "q") console.log("openWindo")
    }

    document.addEventListener("keypress", handleActions)



    return (
        <div
            className={`absolute overflow-hidden transition-shadow ${isFocused ? "shadow-lg shadow-[#89b4fa]/20" : "opacity-80"}
        ${isFocused.current ? "cursor-grab" : "cursor-default"}
        `}
            style={{
                left: pos.x,
                top: pos.y,
                width: size.width,
                height: size.height,
                zIndex: isFocused ? 10 : 1,
                border: `${borderWidth}px solid ${isFocused ? borderColor : "#4a4a6a"}`,
                borderRadius: `${borderRadius}px`
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    )
}