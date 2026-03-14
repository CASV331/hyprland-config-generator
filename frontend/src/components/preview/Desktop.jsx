import { useConfig } from "../../contexts/ConfigContext";
import { Window } from "../Window";
import { Terminal } from "./DeComponents/terminal/Terminal";
import { StatusBar } from "./DeComponents/statusBar/StatusBar";
import { useEffect, useRef } from "react";

function Preview() {
  const { desktopState, openWindow, closeWindow } = useConfig()
  const { activeDesktop, desktops } = desktopState
  const currentWindows = desktops[activeDesktop].windows

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
        <button
          onClick={() => openWindow("terminal")}
          className="p-2 bg-slate-800"
        ></button>
        <div>
          {currentWindows.map(win => (
            <Window key={win.id} windowData={win}>
              {win.type === "terminal" && <Terminal />}
            </Window>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;