import { serviceTypes } from '../data/listings'

export default function ListingCard({ listing, onBook }) {
  const unitLabel = listing.priceUnit === 'nuit' ? '/ nuit' : '/ jour'

  return (
    <article className="listing-card">
      <div className="listing-card__image-wrap">
        <img
          src={listing.image}
          alt={listing.name}
          className="listing-card__image"
          loading="lazy"
        />
        {!listing.available && (
          <span className="listing-card__badge listing-card__badge--unavailable">
            Indisponible
          </span>
        )}
        <span className="listing-card__service">
          {serviceTypes.find((s) => s.id === listing.serviceType)?.icon}
          {serviceTypes.find((s) => s.id === listing.serviceType)?.label}
        </span>
      </div>

      <div className="listing-card__body">
        <div className="listing-card__header">
          <h3 className="listing-card__name">{listing.name}</h3>
          <div className="listing-card__rating">★ {listing.rating}</div>
        </div>

        <p className="listing-card__location">📍 {listing.location}</p>

        <div className="listing-card__specs">
          {listing.specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>

        <div className="listing-card__features">
          {listing.features.slice(0, 2).map((f) => (
            <span key={f} className="listing-card__feature">{f}</span>
          ))}
        </div>

        <div className="listing-card__footer">
          <div className="listing-card__price">
            <strong>{listing.price} Ar</strong>
            <span>{unitLabel}</span>
          </div>
          <button
            type="button"
            className="btn btn--primary btn--sm listing-card__btn"
            disabled={!listing.available}
            onClick={() => onBook(listing)}
          >
            {listing.available ? 'Réserver' : 'Indisponible'}
          </button>
        </div>
      </div>
    </article>
  )
}
