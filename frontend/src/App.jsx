import Header from './components/layout/header/Header.jsx';
import Sidebar from './components/layout/sidebar/Sidebar.jsx';
import Preview from './components/preview/Desktop.jsx';
import { ConfigProvider } from './contexts/ConfigContext.jsx';
import './index.css';
import './styles/globals.css';
function App() {

  return (
    <>
      <ConfigProvider>
        <Header />
        <div className='flex flex-col items-center gap-6 lg:gap-4 p-4 bg-gray-900 min-h-[96vh] text-white lg:flex-row lg:items-start'>
          <Preview />
          <Sidebar />
        </div>
      </ConfigProvider>
    </>
  )
}

export default App
