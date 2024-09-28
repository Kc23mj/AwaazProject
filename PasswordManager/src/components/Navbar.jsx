import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-3 h-14">
      <div className="logo font-bold text-2xl" >
        <span  className='text-green-500'>&times; </span><span>Ba</span><span className='text-green-500'>LoMo</span> <span className='text-green-500'>&times;</span>
        
        </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='/'>About</a>
            <a className='hover:font-bold' href='/'>Contact</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
