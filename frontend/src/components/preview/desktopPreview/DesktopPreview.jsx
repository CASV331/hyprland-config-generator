function Preview() {
  return (
    <div className="w-full max-w-4xl max-h-96 p-2 border-4 rounded-lg border-gray-700">
      <div
      className="w-full h-full p-2 rounded-lg desktop-preview"
      style={{
        backgroundImage: "url('/AsaDen.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      <div className="w-full h-full rounded-lg border-4 border-amber-400 ">
      <div className="w-full h-full p-2 bg-gray-800 opacity-80">
      <div className="text-sm">
        <strong>[username ~ ]$ </strong>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Preview;