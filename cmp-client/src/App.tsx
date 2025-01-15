import './App.css'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <div className='bg-bgLight dark:bg-bgDark text-bgLight dark:text-darkText font-openSans'>
        {/* NAVBAR WILL BE ADDED HERE */}
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App
