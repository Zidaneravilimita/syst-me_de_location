import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('auth_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }, [user])

  const register = ({ name, email, password }) => {
    // In a real app, this would call an API
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]')
    if (users.find((u) => u.email === email)) {
      throw new Error('Un compte avec cet email existe déjà.')
    }
    const newUser = { id: Date.now(), name, email, password }
    localStorage.setItem('registered_users', JSON.stringify([...users, newUser]))
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    return safeUser
  }

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]')
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Email ou mot de passe incorrect.')
    }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    return safeUser
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
