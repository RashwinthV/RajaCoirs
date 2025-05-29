import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import ImageUpload from './components/imageUpload'

function App() {

  return (
    <>
    <Routes>
      <Route path='/'element={<ImageUpload/>}/>
    </Routes>
     
    </>
  )
}

export default App
