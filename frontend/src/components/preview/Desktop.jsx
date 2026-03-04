import { Terminal } from "./DeComponents/terminal/Terminal";
import { StatusBar } from "./DeComponents/statusBar/StatusBar";
function Preview() {
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
        <Terminal />
      </div>
    </div>
  );
}

export default Preview;