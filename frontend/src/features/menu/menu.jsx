import { useState, useEffect, useRef, useMemo } from "react";
import { useConfig } from "../../contexts/ConfigContext";
import { BUILTIN_WALLPAPERS } from "../wallpapers/wallpaper";
import { loadUserWallpapers } from "../../core/theme/themeStorage";

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function WallpaperDmenu({ isOpen, onClose }) {
  const { config, setWallpaperTheme } = useConfig()

  const {
    background,
    backgroundOpacity,
    borderColor,
    borderOpacity,
    borderWidth,
    textColor,
    fontSize
  } = config.terminal

  const inputRef = useRef(null)

  const [query, setQuery] = useState("")
  const [userWallpapers, setUserWallpapers] = useState(loadUserWallpapers)

  const allWallpapers = [...BUILTIN_WALLPAPERS, ...userWallpapers]


  const filtered = allWallpapers.filter(w =>
    w.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    await setWallpaperTheme(file, file.name)
    setUserWallpapers(loadUserWallpapers())
    // const url = URL.createObjectURL(file)
    // const newWallpaper = { id: Date.now(), name: file.name, url, source: "user" }
    // setUserWallpapers(prev => [...prev, newWallpaper])

    // setWallpaperTheme(file, file.name)
    onClose()
  }

  const bgColor = useMemo(
    () => hexToRgba(background, backgroundOpacity),
    [background, backgroundOpacity]
  );

  const borderColorRgba = useMemo(
    () => hexToRgba(borderColor, borderOpacity),
    [borderColor, borderOpacity]
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setUserWallpapers(loadUserWallpapers())
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center pt-12">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel flotante */}
      <div
        className="relative w-1/2 max-w-md rounded-lg overflow-hidden border"
        style={{
          backgroundColor: bgColor,
          borderColor,
        }}
      >
        {/* Barra de búsqueda estilo dmenu */}
        <div className="flex items-center gap-2 p-2 border-b" style={{ borderColor }}>
          <span className="text-xs" style={{ color: textColor }}>
            wallpaper:
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="buscar..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: config.colors.onSurface }}
          />

          {/* Botón para subir wallpaper nuevo */}
          <label
            className="text-xs cursor-pointer px-2 py-1 rounded hover:opacity-80 shrink-0"
            style={{ backgroundColor: borderColor, color: textColor }}
          >
            + Add
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setWallpaperTheme(file)
                  onClose()
                }
              }}
            />
          </label>
        </div>

        {/* Lista de resultados */}
        <div className="max-h-64 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="p-3 text-xs text-center" style={{ color: config.colors.onSurface }}>
              Sin resultados
            </div>
          )}

          {filtered.map(wallpaper => (
            <button
              key={wallpaper.id}
              onClick={() => {
                setWallpaperTheme(wallpaper.url)
                onClose()
              }}
              className="w-full flex items-center gap-3 p-2 hover:opacity-80 text-left transition-opacity"
            >
              <img
                src={wallpaper.url}
                className="w-14 h-9 rounded object-cover shrink-0"
              />
              <span className="text-sm capitalize" style={{ color: config.colors.onSurface }}>
                {wallpaper.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
