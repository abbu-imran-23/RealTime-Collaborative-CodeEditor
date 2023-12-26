import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editor from './pages/Editor'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Toaster
      position='top-center'>
      </Toaster>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<Editor />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App