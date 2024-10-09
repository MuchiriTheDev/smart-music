import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <div className='w-full h-fit px-3 sm:px-10 py-3 sm:py-5 flex justify-between items-center'>
      {/* logo */}
      <Link to={'/'} className="flex justify-center items-center gap-2 text-sm sm:text-xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill='#1d38ce'>
          <path d="M240-80 80-240l160-160 57 56-64 64h494l-63-64 56-56 160 160L720-80l-57-56 64-64H233l63 64-56 56Zm200-360v-480h80v480h-80Zm-160-80v-320h80v320h-80Zm320 0v-320h80v320h-80ZM120-620v-120h80v120h-80Zm640 0v-120h80v120h-80Z"/>
        </svg>
        <p>Smart <span className='text-blue-600'>| Music</span></p>
      </Link>

      {/* Buttons right */}
      <div className="flex justify-center items-center gap-4">
        {/* Menu icon - shown only on small screens */}
        <IoMenu onClick={() => setActive(!active)} className='text-blue-500 h-10 w-10 text-xl sm:hidden block cursor-pointer' />

        {/* Buttons for larger screens */}
        <div className="hidden sm:flex gap-4">
          <Link to={'/auth/register'} className='bg-blue-600 text-base sm:text-xs md:text-sm w-fit sm:w-fit h-2/3 sm:h-2/3 p-2 sm:px-4 sm:py-3 text-center transition-all duration-200 hover:bg-transparent hover:text-blue-600 border border-blue-600 text-white'>
            Sign up
          </Link>
          <Link to={`/auth/signing`} className='text-blue-600 border text-base sm:text-xs md:text-sm border-blue-600 w-fit sm:w-fit h-2/3 sm:h-2/3 px-4 py-3 text-center transition-all duration-200 hover:bg-blue-600 hover:text-white'>
            Sign in
          </Link>
        </div>

        {/* Conditional rendering for smaller screens */}
        <div className={`absolute sm:relative top-16 ${active ? 'right-0' : '-right-full'} transition-all duration-200 sm:w-fit w-[15em] bg-white z-10  h-fit flex flex-col gap-4 sm:hidden shadow-2xl p-3`}>
          <Link onClick={()=>setActive(false)} to={'/auth/register'} className='bg-blue-600 text-base sm:text-xs md:text-sm w-full h-1/4 p-2 sm:px-4 sm:py-3 text-center transition-all duration-200 hover:bg-transparent hover:text-blue-600 border border-blue-600 text-white'>
            Register
          </Link>
          <Link onClick={()=>setActive(false)} to={`/auth/signing`} className='text-blue-600 border text-base sm:text-xs md:text-sm border-blue-600 w-full h-1/4 px-4 py-3 text-center transition-all duration-200 hover:bg-blue-600 hover:text-white'>
            Sign in
          </Link>
        </div>

        {/* Profile image */}
        <Link className='h-10 sm:h-20 w-10 sm:w-20 rounded-full border-2 border-blue-600 overflow-hidden' to={'/profile/1233'}>
          <img className='w-full h-full object-cover' src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="Profile" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
