import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import PasswordToggleIcon from '../components/PasswordToggleIcon'

export default function RegisterPage({ onNavigate, canAccessLogin = true, role = 'client' }) {
  const { register } = useAuth()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Le prénom doit contenir au moins 2 caractères.'
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Veuillez saisir un email valide.'
    }
    if (role === 'owner' && !form.phone.trim()) {
      newErrors.phone = 'Veuillez saisir un numero de telephone.'
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'
    }
    return newErrors
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setGlobalError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      register({
        name: form.name.trim(),
        email: form.email,
        password: form.password,
        role,
        phone: form.phone.trim(),
        company: form.company.trim(),
      })
      onNavigate(role === 'owner' ? 'owner-dashboard' : 'home')
    } catch (err) {
      setGlobalError(err.message)
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
          <h1 className="auth-title">Inscription</h1>
          <p className="auth-subtitle">
            {role === 'owner' ? 'Creez votre compte proprietaire' : 'Créez votre compte pour continuer'}
          </p>
        </div>

        {globalError && (
          <div className="auth-error" role="alert">
            {globalError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="register-name">
              Nom complet
            </label>
            <input
              id="register-name"
              className={`auth-input ${errors.name ? 'auth-input--error' : ''}`}
              type="text"
              name="name"
              placeholder="Votre nom complet"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <span className="auth-field-error">{errors.name}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="register-email">
              Adresse email
            </label>
            <input
              id="register-email"
              className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
              type="email"
              name="email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="auth-field-error">{errors.email}</span>}
          </div>

          {role === 'owner' && (
            <>
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-phone">
                  Telephone
                </label>
                <input
                  id="register-phone"
                  className={`auth-input ${errors.phone ? 'auth-input--error' : ''}`}
                  type="tel"
                  name="phone"
                  placeholder="+261 34 00 000 00"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
                {errors.phone && <span className="auth-field-error">{errors.phone}</span>}
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-company">
                  Nom du dossier ou societe
                </label>
                <input
                  id="register-company"
                  className="auth-input"
                  type="text"
                  name="company"
                  placeholder="Ex: Location Rakoto"
                  value={form.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>
            </>
          )}

          <div className="auth-field">
            <label className="auth-label" htmlFor="register-password">
              Mot de passe
            </label>
            <div className="auth-input-wrap">
              <input
                id="register-password"
                className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Minimum 6 caractères"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                <PasswordToggleIcon visible={showPassword} />
              </button>
            </div>
            {errors.password && <span className="auth-field-error">{errors.password}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="register-confirm">
              Confirmer le mot de passe
            </label>
            <div className="auth-input-wrap">
              <input
                id="register-confirm"
                className={`auth-input ${errors.confirmPassword ? 'auth-input--error' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Répétez votre mot de passe"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-pressed={showConfirmPassword}
                aria-label={showConfirmPassword ? 'Masquer la confirmation du mot de passe' : 'Afficher la confirmation du mot de passe'}
                title={showConfirmPassword ? 'Masquer la confirmation du mot de passe' : 'Afficher la confirmation du mot de passe'}
              >
                <PasswordToggleIcon visible={showConfirmPassword} />
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="auth-field-error">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            className="btn btn--primary btn--full auth-submit"
            disabled={loading}
          >
            {loading ? 'Création du compte…' : role === 'owner' ? 'Creer mon compte proprietaire' : "S'inscrire gratuitement"}
          </button>
        </form>

        {canAccessLogin && (
          <p className="auth-switch">
            Déjà un compte ?{' '}
            <button
              id="go-to-login-btn"
              type="button"
              className="auth-link"
              onClick={() => onNavigate('login')}
            >
              Se connecter
            </button>
          </p>
        )}

        <button type="button" className="auth-forgot" onClick={() => setGlobalError('Fonction bientôt disponible.')}>
          Mot de passe oublié ?
        </button>

      </div>
    </div>
  )
}
