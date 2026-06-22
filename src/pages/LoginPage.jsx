import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function LoginPage({ onNavigate }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    try {
      login(form)
      onNavigate('home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--simple">
        <div className="auth-logo">
          <Logo />
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Connexion</h1>
          <p className="auth-subtitle">Accédez à votre compte pour continuer</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">
              Adresse email
            </label>
            <input
              id="login-email"
              className="auth-input"
              type="email"
              name="email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">
              Mot de passe
            </label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="btn btn--primary btn--full auth-submit"
            disabled={loading}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-switch">
          Pas encore de compte ?{' '}
          <button
            id="go-to-register-btn"
            type="button"
            className="auth-link"
            onClick={() => onNavigate('register')}
          >
            Créer un compte
          </button>
        </p>

        <button type="button" className="auth-back" onClick={() => onNavigate('home')}>
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  )
}
