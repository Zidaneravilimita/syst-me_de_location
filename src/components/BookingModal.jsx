import { useState } from 'react'
import { getServiceLabel } from '../data/listings'

export default function BookingModal({ listing, search, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)

  if (!listing) return null

  const days = search.startDate && search.endDate
    ? Math.max(1, Math.ceil(
        (new Date(search.endDate) - new Date(search.startDate)) / (1000 * 60 * 60 * 24)
      ))
    : 1

  const total = listing.price * days
  const unitLabel = listing.priceUnit === 'nuit' ? 'nuit' : 'jour'
  const unitLabelPlural = listing.priceUnit === 'nuit' ? 'nuits' : 'jours'

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {submitted ? (
          <div className="modal__success">
            <span className="modal__success-icon">✅</span>
            <h2>Réservation confirmée !</h2>
            <p>
              Merci {form.name} ! Votre réservation pour <strong>{listing.name}</strong>
              a été enregistrée. Un email de confirmation a été envoyé à {form.email}.
            </p>
            <div className="modal__summary">
              <p><strong>Service :</strong> {getServiceLabel(listing.serviceType)}</p>
              <p><strong>Lieu :</strong> {search.location}</p>
              <p><strong>Dates :</strong> {search.startDate} → {search.endDate}</p>
              <p><strong>Total :</strong> {total}€ ({days} {days > 1 ? unitLabelPlural : unitLabel})</p>
            </div>
            <button type="button" className="btn btn--primary" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h2>Réserver — {listing.name}</h2>

            <div className="modal__listing">
              <img src={listing.image} alt={listing.name} />
              <div>
                <p className="modal__service">{getServiceLabel(listing.serviceType)}</p>
                <p className="modal__price">{listing.price}€ / {unitLabel}</p>
                <p className="modal__specs">
                  {listing.specs.join(' · ')}
                </p>
              </div>
            </div>

            <div className="modal__summary">
              <p><strong>Lieu :</strong> {search.location}</p>
              <p><strong>Arrivée :</strong> {search.startDate || '—'}</p>
              <p><strong>Départ :</strong> {search.endDate || '—'}</p>
              <p className="modal__total"><strong>Total estimé :</strong> {total}€</p>
            </div>

            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Nom complet</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Jean Dupont"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="jean@exemple.fr"
                />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Téléphone</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  placeholder="06 12 34 56 78"
                />
              </div>
              <button type="submit" className="btn btn--primary btn--full">
                Confirmer la réservation — {total}€
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
