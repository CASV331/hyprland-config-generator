import Header from './components/layout/header/Header.jsx';
import Sidebar from './components/layout/sidebar/Sidebar.jsx';
import Preview from './components/preview/desktopPreview/DesktopPreview.jsx';
import './index.css';
function App() {

  return (
    <>
    <Header />
    <div className='flex justify-between bg-gray-900 min-h-screen text-white'>
      <Preview />
      <Sidebar />
    </div>
    </>
  )
}

export default App
