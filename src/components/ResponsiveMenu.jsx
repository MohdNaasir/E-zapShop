import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  return (
    <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
      <div>
        <div className='flex items-center justify-start gap-3'>
          <FaUserCircle size={50} />
          <div>
            <h1>Hello, Guest</h1>
            <h1 className='text-sm text-slate-500'>Premium User</h1>
          </div>
        </div>
        <nav className='mt-12'>
          <ul className='flex flex-col gap-7 text-2xl font-semibold'>
            <Link to='/' onClick={()=>setOpenNav(false)}>Home</Link>
            <Link to='/products' onClick={()=>setOpenNav(false)}>Products</Link>
            <Link to='/about' onClick={()=>setOpenNav(false)}>About</Link>
            <Link to='/contact' onClick={()=>setOpenNav(false)}>Contact</Link>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ResponsiveMenu
