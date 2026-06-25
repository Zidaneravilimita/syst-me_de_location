import { useState } from 'react'
import Logo from './Logo'
import { Home, Settings, Star, Mail, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react'

import { useAuth } from '../context/AuthContext'

export default function Header({ onNavigate }) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#annonces', label: 'Offres', icon: Home },
    { href: '#services', label: 'Services', icon: Settings },
    { href: '#avantages', label: 'Avantages', icon: Star },
    { href: '#contact', label: 'Contact', icon: Mail },
  ]

  const handleNavigate = (target) => {
    setMenuOpen(false)
    onNavigate?.(target)
  }

  const handleLogout = () => {
    logout()
    onNavigate?.('landing')
    setMenuOpen(false)
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
              className="nav__link group relative flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:text-blue-600"
              onClick={(event) => {
                if (link.target) {
                  event.preventDefault()
                  handleNavigate(link.target)
                  return
                }
                setMenuOpen(false)
              }}
            >
              <link.icon className="w-2.5 h-2.5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          ))}
          {user ? (
            <a
              href="#logout"
              className="btn btn--primary nav__cta group flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={(event) => {
                event.preventDefault()
                handleLogout()
              }}
            >
              <LogOut className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-12" />
              Déconnexion
            </a>
          ) : (
            <>
              <a
                href="#connexion"
                className="btn btn--primary nav__cta group flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate('login')
                }}
              >
                <LogIn className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-12" />
                Connexion
              </a>
              <a
                href="#inscription"
                className="nav__link group relative flex items-center gap-4 transition-all duration-300 hover:scale-105 hover:text-blue-600"
                onClick={(event) => {
                  event.preventDefault()
                  handleNavigate('register')
                }}
              >
                <UserPlus className="w-3 h-3 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative">
                  Inscription
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </>
          )}



        </nav>


        <button
          type="button"
          className="menu-toggle group flex items-center justify-center p-2 transition-all duration-300 hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <Menu className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          )}
        </button>
      </div>
    </header>
  )
}
