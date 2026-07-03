
const wallpapers = import.meta.glob("/assets/wallpapers/*.{jpg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default"
})

export const BUILTIN_WALLPAPERS = Object.entries(wallpapers).map(([path, url]) => {
    const filename = path.split("/").pop()
    const name = filename.split(".")[0].replace(/-/g, " ")
    return { id: filename, name, url, source: "builtin" }
})