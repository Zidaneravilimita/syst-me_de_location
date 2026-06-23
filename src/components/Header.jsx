import { useState } from 'react'
import Logo from './Logo'

export default function Header({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#annonces', label: 'Offres' },
    { href: '#services', label: 'Services' },
    { href: '#avantages', label: 'Avantages' },
    { href: '#contact', label: 'Contact' },
  ]



  const handleNavigate = (target) => {
    setMenuOpen(false)
    onNavigate?.(target)
  }

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              onClick={(event) => {
                if (link.target) {
                  event.preventDefault()
                  handleNavigate(link.target)
                  return
                }
                setMenuOpen(false)
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#connexion"
            className="btn btn--primary nav__cta"
            onClick={(event) => {
              event.preventDefault()
              handleNavigate('login')
            }}
          >
            Connexion
          </a>
          <a
            href="#inscription"
            className="nav__link"
            onClick={(event) => {
              event.preventDefault()
              handleNavigate('register')
            }}
          >
            Inscription
          </a>

        </nav>


        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
