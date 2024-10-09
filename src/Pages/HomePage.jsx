import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillCloudUploadFill } from "react-icons/bs";

const HomePage = () => {
  return (
    <div>
      HomePage
      <Link className='absolute bottom-10 right-10 w-16 h-16 rounded-full shadow-lg p-3 bg-blue-600 text-white place-content-center' to={`/upload-song`}>
        <BsFillCloudUploadFill className='w-full h-full text-xl'/>
      </Link>
    </div>
  )
}

export default HomePage