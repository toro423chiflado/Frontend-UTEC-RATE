import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 md:ml-72">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
          <Outlet />
        </div>
      </main>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>
    </div>
  )
}

export default Layout
