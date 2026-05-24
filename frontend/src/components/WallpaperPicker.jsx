import { useConfig } from "../contexts/ConfigContext";

export function WallpaperPicker() {
    const { setWallpaperTheme } = useConfig();

    const handleChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        await setWallpaperTheme(file);
    };

    return (
        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0]
                if (file) setWallpaperTheme(file)
            }}
        />
    );
}