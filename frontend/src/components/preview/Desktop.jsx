import { useConfig } from "../../contexts/ConfigContext";
import { Window } from "../Window";
import { Terminal } from "./DeComponents/terminal/Terminal";
import { StatusBar } from "./DeComponents/statusBar/StatusBar";
import { useEffect, useRef, useState } from "react";
import { calculateLayout } from "../Tiling";

function Preview() {
  const { desktopState, openWindow, closeFocusedWindow } = useConfig()
  const { activeDesktop, desktops } = desktopState
  const currentWindows = desktops[activeDesktop].windows

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const { width, height } = containerRef.current.getBoundingClientRect()
    setContainerSize({ width, height })
  }, [])
  const layout = useMemo(() => {
    if (currentWindows.length === 0) return {}
    if (containerSize.width === 0) return {}

    const { width, height } = containerRef.current.getBoundingClientRect()

    const tree = buildTree(currentWindows)
    return calculateLayout(tree, 0, 0, width, height)
  }, [currentWindows])

  const isModPressed = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log("Key down")
      if (e.key === "z") {
        isModPressed.current = true
        console.log("mod")
      }
      if (isModPressed) {
        if (e.key === "q") {
          e.preventDefault()
          openWindow("terminal")
        }
        if (e.key === "w") {

          console.log("Cerrando")
          closeFocusedWindow()
        }
      }
    }
    const handleKeyUp = (e) => {
      console.log("Keyup")
      if (e.key === "z")
        isModPressed.current = false
    }

    console.log("Evento activo")
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      console.log("Removiendo evento")
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <div className="w-full aspect-video z-10 p-2 border-4 rounded-xl border-gray-700 desktop-preview-container sticky top-0 bg-gray-900">
      <div
        className="flex flex-col relative w-full h-full p-2 rounded-lg overflow-hidden group"
        style={{
          backgroundImage: "url('/sunset-anime.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <StatusBar />

        <div ref={containerRef}>
          {currentWindows.map(win => (
            <Window key={win.id} windowData={{
              ...win,
              position: { x: layout[win.id]?.x ?? 0, y: layout[win.id]?.y ?? 0 },
              size: {
                width: layout[win.id]?.width ?? 300,
                height: layout[win.id]?.width ?? 200
              }
            }}>
              {win.type === "terminal" && <Terminal />}
            </Window>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;