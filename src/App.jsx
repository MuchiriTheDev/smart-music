import React from 'react'
import Navbar from './Component/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Share from './Pages/Share'
import UploadSong from './Pages/UploadSong'
import Footer from './Component/Footer'
import Profile from './Pages/Profile'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/share/:musicId' element={<Share/>}/>
        <Route path='/upload-song' element={<UploadSong/>}/>
        <Route path='/profile/:artistId' element={<Profile/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App