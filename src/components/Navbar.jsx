import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      <Link to="/" className="logo">
        <span>🎲</span> GAMBLINGGGGG
      </Link>
      <nav>
        <ul>
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/juegos">Juegos</NavLink></li>
          <li><NavLink to="/soporte">Soporte</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
