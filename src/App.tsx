import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Character from './pages/Character'
import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navBrand}>Rick & Morty</Link>
      </nav>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App