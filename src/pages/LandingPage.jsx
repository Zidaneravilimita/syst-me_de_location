import { useState } from 'react'
import Logo from '../components/Logo'

const profiles = [
  {
    id: 'admin',
    icon: '🛡️',
    title: 'Administrateur',
    subtitle: 'Gérer la plateforme et superviser toutes les activités',
  },
  {
    id: 'owner',
    icon: '🏠',
    title: 'Propriétaire',
    subtitle: 'Mettez en location vos biens et gérez vos annonces',
  },
  {
    id: 'user',
    icon: '🚗',
    title: 'Utilisateur normal',
    subtitle: 'Rechercher et louer des voitures, maisons et motos',
  },
]

export default function LandingPage({ onChooseProfile }) {
  const [profilesOpen, setProfilesOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)

  return (
    <div className="landing-page">
      <div className="landing-page__glow landing-page__glow--one" />
      <div className="landing-page__glow landing-page__glow--two" />
      <div className="landing-page__grid" />

      <section className="landing-page__hero">
        <div className="landing-page__brand">
          <Logo />
        </div>

        <h1 className="landing-page__title">
          Une page d’accueil adaptée à chaque type d’utilisateur
        </h1>
        <p className="landing-page__subtitle">
          Commencez par choisir votre profil, puis découvrez une expérience claire, fluide et pensée pour votre rôle.
        </p>

        <div className="landing-page__actions">
          <button
            type="button"
            className="btn btn--primary landing-page__cta"
            onClick={() => setProfilesOpen((prev) => !prev)}
          >
            {profilesOpen ? 'Masquer les profils' : 'Choisir le type d’utilisateur'}
          </button>
          <button
            type="button"
            className="btn landing-page__secondary"
            onClick={() => setProfilesOpen(true)}
          >
            En savoir plus
          </button>
        </div>

        {profilesOpen && (
          <div className="landing-page__profiles" aria-label="Choix du type d'utilisateur">
            {profiles.map((profile) => {
              const isActive = selectedProfile === profile.id
              return (
                <button
                  key={profile.id}
                  type="button"
                  className={`profile-card ${isActive ? 'profile-card--active' : ''}`}
                  onClick={() => {
                    setSelectedProfile(profile.id)
                    onChooseProfile?.(profile.id)
                  }}
                >
                  <span className="profile-card__icon">{profile.icon}</span>
                  <span className="profile-card__title">{profile.title}</span>
                  <span className="profile-card__subtitle">{profile.subtitle}</span>
                </button>
              )
            })}
          </div>
        )}

        {selectedProfile && (
          <div className="landing-page__selection" aria-live="polite">
            Profil sélectionné :{' '}
            <strong>
              {profiles.find((profile) => profile.id === selectedProfile)?.title}
            </strong>
          </div>
        )}
      </section>
    </div>
  )
}
