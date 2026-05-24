import { useConfig } from "../../contexts/ConfigContext";
import { Window } from "../Window";
import { Terminal } from "./DeComponents/terminal/Terminal";
import { StatusBar } from "./DeComponents/statusBar/StatusBar";
import { useEffect, useRef, useState, useMemo } from "react";
import { calculateLayout, buildTree } from "../Tiling";

function Preview() {
  const { desktopState, openWindow, closeFocusedWindow, focusWindow, switchDesktop, switchWindowDesktop } = useConfig()
  const { activeDesktop, desktops } = desktopState
  const currentWindows = desktops[activeDesktop].windows

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const containerRef = useRef(null)

  const moveFocus = (direction) => {
    const focused = currentWindows.find((win) => win.isFocused === true)
    if (!focused) return

    const focusedLayout = layout[focused.id]
    if (!focusedLayout) return

    const focusedCenter = {
      x: focusedLayout.x + focusedLayout.width / 2,
      y: focusedLayout.y + focusedLayout.height / 2
    }

    const candidates = currentWindows.filter(win => {
      if (win.id === focused.id) return false //Exclude the focused
      const winLayout = layout[win.id]
      if (!winLayout) return false
      const winCenter = { x: winLayout.x + winLayout.width / 2, y: winLayout.y + winLayout.height / 2 }

      if (direction === "right") return winCenter.x > focusedCenter.x
      if (direction === "left") return winCenter.x < focusedCenter.x
      if (direction === "up") return winCenter.y < focusedCenter.y
      if (direction === "down") return winCenter.y > focusedCenter.y
    })

    if (candidates.length === 0) return

    const closest = candidates.reduce((nearest, win) => {
      const winCenter = {
        x: layout[win.id].x + layout[win.id].width / 2,
        y: layout[win.id].y + layout[win.id].height / 2
      }

      const nearestCenter = {
        x: layout[nearest.id].x + layout[nearest.id].width / 2,
        y: layout[nearest.id].y + layout[nearest.id].height / 2
      }

      const distanceToCurrent = Math.hypot(winCenter.x - focusedCenter.x, winCenter.y - focusedCenter.y)
      const distanceToNearest = Math.hypot(nearestCenter.x - focusedCenter.x, nearestCenter.y - focusedCenter.y)

      return distanceToCurrent < distanceToNearest ? win : nearest
    })
    focusWindow(closest.id)
  }

  const moveFocusRef = useRef(moveFocus)

  useEffect(() => {
    moveFocusRef.current = moveFocus
  }, [moveFocus])
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
  }, [currentWindows, containerSize])

  const isModPressed = useRef(false)
  const isShiftPressed = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "p") {
        isShiftPressed.current = true
      }
      if (e.key === "z") {
        isModPressed.current = true
      }
      if (isModPressed.current) {
        if (e.key === "q") {
          e.preventDefault()
          openWindow("terminal")
        }
        if (e.key === "w") {

          closeFocusedWindow()
        }

        if (e.key === "ArrowRight") moveFocusRef.current("right")
        if (e.key === "ArrowLeft") moveFocusRef.current("left")
        if (e.key === "ArrowUp") moveFocusRef.current("up")
        if (e.key === "ArrowDown") moveFocusRef.current("down")

        const num = parseInt(e.key)

        if (num >= 1 && num < 9) {
          e.preventDefault()
          if (isShiftPressed.current) {
            switchWindowDesktop(num)
          } else {
            switchDesktop(num)
          }
        }
      }
    }
    const handleKeyUp = (e) => {
      if (e.key === "z") {
        isModPressed.current = false
        isShiftPressed.current = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [openWindow, closeFocusedWindow, moveFocus])

  return (
    <div className="w-full aspect-video z-10 p-2 border-4 rounded-xl border-gray-700 desktop-preview-container sticky top-0 bg-gray-900">
      <div
        className="flex flex-col relative w-full h-full overflow-hidden group"
        style={{
          backgroundImage: `url(${config.wallpaper.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <StatusBar />

        <div ref={containerRef} className="relative flex-1 w-full mt-5">
          {currentWindows.map(win => (
            <Window key={win.id} windowData={{
              ...win,
              position: { x: layout[win.id]?.x ?? 0, y: layout[win.id]?.y ?? 0 },
              size: {
                width: layout[win.id]?.width ?? 300,
                height: layout[win.id]?.height ?? 200
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