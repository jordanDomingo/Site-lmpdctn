import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div
      className="min-h-screen flex flex-col relative w-full overflow-x-hidden text-white"
      style={{
        background: 'linear-gradient(175deg, #3D5467 0%, #2E3F4F 35%, #1E2B35 70%, #151F28 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:ml-64 flex flex-col min-h-screen relative z-10">
        <Header setIsOpen={setSidebarOpen} />
        
        <main className="flex-grow p-6 md:p-8">
          <div className="max-w-7xl mx-auto stagger-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
