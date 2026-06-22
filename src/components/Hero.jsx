import SearchForm from './SearchForm'
import { serviceTypes } from '../data/listings'

export default function Hero({ search, onSearchChange, onSearch }) {
  return (
    <section className="hero">
      <div className="hero__bg"></div>
      <div className="hero__content">
        <h1 className="hero__title">
          Louez tout ce dont<br />
          <span>vous avez besoin</span>
        </h1>
        <p className="hero__subtitle">
          Maisons, voitures, motos et quads — une seule plateforme pour toutes vos locations.
          Réservation simple, prix transparents, assistance 24h/24.
        </p>

        <div className="hero__services">
          {serviceTypes.filter((s) => s.id !== 'all').map((service) => (
            <div key={service.id} className="hero__service-tag">
              <span>{service.icon}</span>
              {service.label}
            </div>
          ))}
        </div>

        <SearchForm
          search={search}
          onSearchChange={onSearchChange}
          onSubmit={(e) => {
            e.preventDefault()
            onSearch()
          }}
        />

        <div className="hero__stats">
          <div className="hero__stat">
            <strong>800+</strong>
            <span>Offres</span>
          </div>
          <div className="hero__stat">
            <strong>4</strong>
            <span>Services</span>
          </div>
          <div className="hero__stat">
            <strong>4.8★</strong>
            <span>Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  )
}
