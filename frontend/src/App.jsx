import { useState, useEffect } from 'react';
import Header from './components/layout/header/Header.jsx';
import Sidebar from './components/layout/sidebar/Sidebar.jsx';
import Preview from './components/preview/Desktop.jsx';
import { WallpaperPicker } from './components/WallpaperPicker.jsx';
import { ConfigProvider } from './contexts/ConfigContext.jsx';
// import { initializeTheme } from './core/theme/themeStorage.js';
import './index.css';
import './styles/globals.css';
function App() {
  // const [initialConfig, setInitialConfig] = useState(null)

  // useEffect(() => {
  //   initializeTheme("/anime_girl_white_hair.png").then(theme => {
  //     setInitialConfig(buildConfigFromTheme(theme))
  //   })
  // }, [])

  return (
    <ConfigProvider>
      <Header />
      <div className='flex flex-col items-center gap-6 lg:gap-4 p-4 bg-gray-900 min-h-[96vh] text-white lg:flex-row lg:items-start'>
        <Preview />
      </div>
      <WallpaperPicker />
    </ConfigProvider>
  )
}

export default App
