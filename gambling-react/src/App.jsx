import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Games from './pages/Games'
import Support from './pages/Support'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juegos" element={<Games />} />
        <Route path="/soporte" element={<Support />} />
      </Routes>
      <Footer />
    </>
  )
}
