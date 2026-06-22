import { serviceTypes } from '../data/listings'

const features = [
  {
    icon: '💰',
    title: 'Prix transparents',
    description: 'Aucun frais caché. Le prix affiché est le prix final.',
  },
  {
    icon: '🔄',
    title: 'Annulation flexible',
    description: 'Annulez gratuitement jusqu\'à 24h avant la date de début.',
  },
  {
    icon: '🛡️',
    title: 'Assurance incluse',
    description: 'Toutes nos offres sont couvertes par une assurance adaptée.',
  },
  {
    icon: '📱',
    title: 'Réservation en ligne',
    description: 'Réservez en quelques clics depuis votre ordinateur ou mobile.',
  },
  {
    icon: '🕐',
    title: 'Assistance 24h/24',
    description: 'Notre équipe est disponible jour et nuit pour vous accompagner.',
  },
  {
    icon: '✨',
    title: 'Large choix',
    description: 'Maisons, voitures, motos et quads — tout sur une seule plateforme.',
  },
]

export default function Features() {
  return (
    <section id="avantages" className="features">
      <div className="section-header">
        <h2>Pourquoi choisir LocHub ?</h2>
        <p>Une expérience de location simple, fiable et sans stress</p>
      </div>

      <div className="features__grid">
        {features.map((feature) => (
          <div key={feature.title} className="feature-card">
            <span className="feature-card__icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ServiceShowcase() {
  const services = serviceTypes.filter((s) => s.id !== 'all')

  const descriptions = {
    maison: 'Appartements, villas, studios et chalets pour vos vacances ou séjours professionnels.',
    voiture: 'Citadines, SUV, utilitaires et véhicules de luxe pour tous vos trajets.',
    moto: 'Sport, trail, scooters et custom — équipement et assurance inclus.',
    quad: 'Quads sport, utilitaires et modèles enfants pour vos aventures outdoor.',
  }

  return (
    <section id="services" className="services-showcase">
      <div className="section-header">
        <h2>Nos services de location</h2>
        <p>Quatre catégories pour répondre à tous vos besoins</p>
      </div>

      <div className="services-showcase__grid">
        {services.map((service) => (
          <a key={service.id} href="#annonces" className="service-card">
            <span className="service-card__icon">{service.icon}</span>
            <h3>{service.label}</h3>
            <p>{descriptions[service.id]}</p>
            <span className="service-card__link">Voir les offres →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
