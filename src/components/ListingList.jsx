import { serviceTypes, subcategories } from '../data/listings'
import ListingCard from './ListingCard'

export default function ListingList({
  listings,
  activeService,
  activeSubcategory,
  onServiceChange,
  onSubcategoryChange,
  onBook,
}) {
  const currentSubcategories = activeService !== 'all'
    ? subcategories[activeService]
    : null

  const serviceLabel = activeService === 'all'
    ? 'nos offres'
    : serviceTypes.find((s) => s.id === activeService)?.label?.toLowerCase() ?? ''

  return (
    <section id="annonces" className="listings">
      <div className="section-header">
        <h2>Nos offres de location</h2>
        <p>
          Maisons, voitures, motos et quads — trouvez l&apos;offre idéale pour votre besoin
        </p>
      </div>

      <div className="service-filter">
        {serviceTypes.map((service) => (
          <button
            key={service.id}
            type="button"
            className={`service-btn ${activeService === service.id ? 'service-btn--active' : ''}`}
            onClick={() => onServiceChange(service.id)}
          >
            <span className="service-btn__icon">{service.icon}</span>
            {service.label}
          </button>
        ))}
      </div>

      {currentSubcategories && (
        <div className="category-filter">
          {currentSubcategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-btn ${activeSubcategory === cat.id ? 'category-btn--active' : ''}`}
              onClick={() => onSubcategoryChange(cat.id)}
            >
              <span className="category-btn__icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {listings.length === 0 ? (
        <div className="listings__empty">
          <p>Aucune offre trouvée pour cette sélection.</p>
        </div>
      ) : (
        <>
          <p className="listings__count">
            {listings.length} offre{listings.length > 1 ? 's' : ''} — {serviceLabel}
          </p>
          <div className="listings__grid">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onBook={onBook} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
