import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#annonces', label: 'Offres' },
    { href: '#services', label: 'Services' },
    { href: '#avantages', label: 'Avantages' },
    { href: '#comment', label: 'Comment ça marche' },
    { href: '#contact', label: 'Contact' },
  ]

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
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#annonces" className="btn btn--primary nav__cta" onClick={() => setMenuOpen(false)}>
            Réserver
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
