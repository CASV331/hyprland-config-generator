import { useConfig } from "../../contexts/ConfigContext";
import { Window } from "../Window";
import { Terminal } from "./DeComponents/terminal/Terminal";
import { StatusBar } from "./DeComponents/statusBar/StatusBar";

function Preview() {
  const { desktopState, openWindow, closeWindow } = useConfig()
  const { activeDesktop, desktops } = desktopState
  const currentWindows = desktops[activeDesktop].windows

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