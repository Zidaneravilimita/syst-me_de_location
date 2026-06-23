import { useMemo, useState } from 'react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { getCategoryLabel, getServiceLabel, locations, serviceTypes, subcategories } from '../data/listings'

const emptyForm = {
  name: '',
  serviceType: 'maison',
  category: 'appartement',
  location: locations[0],
  price: '',
  priceUnit: 'jour',
  specs: '',
  features: '',
  image: '',
}

const demoOwnerListings = [
  {
    id: 'owner-1',
    name: 'Studio lumineux proche centre',
    serviceType: 'maison',
    category: 'studio',
    location: 'Paris Centre',
    price: 65,
    priceUnit: 'nuit',
    specs: ['1 chambre', '30 m2', '2 personnes'],
    features: ['Wi-Fi', 'Cuisine equipee'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    status: 'published',
  },
  {
    id: 'owner-2',
    name: 'Citadine economique',
    serviceType: 'voiture',
    category: 'citadine',
    location: 'Lyon Part-Dieu',
    price: 38,
    priceUnit: 'jour',
    specs: ['5 places', 'Essence', 'Manuelle'],
    features: ['Climatisation', 'Bluetooth'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
    status: 'draft',
  },
]

function getStatusLabel(status) {
  if (status === 'published') return 'Publie'
  if (status === 'pending') return 'En verification'
  return 'Brouillon'
}

function splitTags(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function OwnerDashboard({ onNavigate }) {
  const { user, logout } = useAuth()
  const [listings, setListings] = useState(demoOwnerListings)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [activeView, setActiveView] = useState('listings')

  const visibleCategories = subcategories[form.serviceType]?.filter((item) => item.id !== 'all') ?? []
  const publishedCount = listings.filter((listing) => listing.status === 'published').length
  const pendingCount = listings.filter((listing) => listing.status === 'pending').length

  const selectedListing = useMemo(
    () => listings.find((listing) => listing.id === editingId),
    [editingId, listings],
  )

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => {
      if (name === 'serviceType') {
        const nextCategory = subcategories[value]?.find((item) => item.id !== 'all')?.id ?? ''
        return { ...prev, serviceType: value, category: nextCategory }
      }
      return { ...prev, [name]: value }
    })
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const saveListing = (status) => {
    const payload = {
      ...form,
      id: editingId ?? `owner-${Date.now()}`,
      price: Number(form.price) || 0,
      specs: splitTags(form.specs),
      features: splitTags(form.features),
      image:
        form.image ||
        'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
      status,
    }

    setListings((prev) =>
      editingId ? prev.map((listing) => (listing.id === editingId ? payload : listing)) : [payload, ...prev],
    )
    resetForm()
    setActiveView('listings')
  }

  const editListing = (listing) => {
    setEditingId(listing.id)
    setForm({
      name: listing.name,
      serviceType: listing.serviceType,
      category: listing.category,
      location: listing.location,
      price: String(listing.price),
      priceUnit: listing.priceUnit,
      specs: listing.specs.join(', '),
      features: listing.features.join(', '),
      image: listing.image,
    })
    setActiveView('create')
  }

  const updateStatus = (listingId, status) => {
    setListings((prev) =>
      prev.map((listing) => (listing.id === listingId ? { ...listing, status } : listing)),
    )
  }

  const deleteListing = (listingId) => {
    setListings((prev) => prev.filter((listing) => listing.id !== listingId))
  }

  const handleLogout = () => {
    logout()
    onNavigate('landing')
  }

  return (
    <div className="owner-shell">
      <aside className="owner-sidebar">
        <Logo />
        <nav className="owner-menu" aria-label="Menu proprietaire">
          <button
            type="button"
            className={activeView === 'listings' ? 'owner-menu__item owner-menu__item--active' : 'owner-menu__item'}
            onClick={() => setActiveView('listings')}
          >
            Mes biens
          </button>
          <button
            type="button"
            className={activeView === 'create' ? 'owner-menu__item owner-menu__item--active' : 'owner-menu__item'}
            onClick={() => {
              resetForm()
              setActiveView('create')
            }}
          >
            Publier un bien
          </button>
          <button type="button" className="owner-menu__item" onClick={() => onNavigate('home')}>
            Voir le site
          </button>
        </nav>
        <div className="owner-account">
          <strong>{user?.name ?? 'Proprietaire'}</strong>
          <span>{user?.company || user?.email}</span>
          <button type="button" onClick={handleLogout}>
            Deconnexion
          </button>
        </div>
      </aside>

      <main className="owner-main">
        <header className="owner-header">
          <div>
            <span className="admin-eyebrow">Espace proprietaire</span>
            <h1>Dashboard proprietaire</h1>
          </div>
          <button type="button" className="btn btn--primary" onClick={() => setActiveView('create')}>
            Ajouter un bien
          </button>
        </header>

        <section className="admin-stats" aria-label="Statistiques proprietaire">
          <article className="admin-stat">
            <span className="admin-stat__label">Biens</span>
            <strong>{listings.length}</strong>
            <span className="admin-stat__detail">annonces creees</span>
          </article>
          <article className="admin-stat">
            <span className="admin-stat__label">Publies</span>
            <strong>{publishedCount}</strong>
            <span className="admin-stat__detail">visibles sur la plateforme</span>
          </article>
          <article className="admin-stat">
            <span className="admin-stat__label">En verification</span>
            <strong>{pendingCount}</strong>
            <span className="admin-stat__detail">en attente admin</span>
          </article>
        </section>

        {activeView === 'listings' && (
          <section className="owner-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Mes biens</h2>
                <p>Gerez vos annonces, modifiez leurs informations et envoyez-les en publication.</p>
              </div>
            </div>
            <div className="owner-listing-grid">
              {listings.map((listing) => (
                <article key={listing.id} className="owner-listing">
                  <img src={listing.image} alt="" />
                  <div className="owner-listing__body">
                    <div>
                      <h3>{listing.name}</h3>
                      <p>{getServiceLabel(listing.serviceType)} - {getCategoryLabel(listing.serviceType, listing.category)}</p>
                    </div>
                    <div className="admin-listing__meta">
                      <span>{listing.location}</span>
                      <span>{listing.price} EUR / {listing.priceUnit}</span>
                      <span>{getStatusLabel(listing.status)}</span>
                    </div>
                    <div className="owner-listing__actions">
                      <button type="button" className="admin-action" onClick={() => editListing(listing)}>
                        Editer
                      </button>
                      <button type="button" className="admin-action" onClick={() => updateStatus(listing.id, 'pending')}>
                        Demander publication
                      </button>
                      <button type="button" className="admin-action" onClick={() => updateStatus(listing.id, 'draft')}>
                        Brouillon
                      </button>
                      <button type="button" className="admin-action admin-action--danger" onClick={() => deleteListing(listing.id)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeView === 'create' && (
          <section className="owner-panel">
            <div className="admin-panel__header">
              <div>
                <h2>{selectedListing ? 'Modifier le bien' : 'Creer une annonce'}</h2>
                <p>Completez les informations du bien, puis enregistrez en brouillon ou envoyez en verification.</p>
              </div>
            </div>

            <form className="owner-form" onSubmit={(event) => event.preventDefault()}>
              <label className="auth-field">
                <span className="auth-label">Titre du bien</span>
                <input className="auth-input" name="name" value={form.name} onChange={handleFieldChange} placeholder="Ex: Villa avec piscine" />
              </label>

              <label className="auth-field">
                <span className="auth-label">Type</span>
                <select className="admin-select" name="serviceType" value={form.serviceType} onChange={handleFieldChange}>
                  {serviceTypes.filter((service) => service.id !== 'all').map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth-field">
                <span className="auth-label">Categorie</span>
                <select className="admin-select" name="category" value={form.category} onChange={handleFieldChange}>
                  {visibleCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth-field">
                <span className="auth-label">Localisation</span>
                <select className="admin-select" name="location" value={form.location} onChange={handleFieldChange}>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth-field">
                <span className="auth-label">Prix</span>
                <input className="auth-input" name="price" type="number" min="0" value={form.price} onChange={handleFieldChange} placeholder="80" />
              </label>

              <label className="auth-field">
                <span className="auth-label">Unite</span>
                <select className="admin-select" name="priceUnit" value={form.priceUnit} onChange={handleFieldChange}>
                  <option value="jour">jour</option>
                  <option value="nuit">nuit</option>
                  <option value="heure">heure</option>
                </select>
              </label>

              <label className="auth-field owner-form__wide">
                <span className="auth-label">Caracteristiques</span>
                <input className="auth-input" name="specs" value={form.specs} onChange={handleFieldChange} placeholder="3 chambres, 85 m2, 6 personnes" />
              </label>

              <label className="auth-field owner-form__wide">
                <span className="auth-label">Equipements</span>
                <input className="auth-input" name="features" value={form.features} onChange={handleFieldChange} placeholder="Wi-Fi, Parking, Climatisation" />
              </label>

              <label className="auth-field owner-form__wide">
                <span className="auth-label">Image URL</span>
                <input className="auth-input" name="image" value={form.image} onChange={handleFieldChange} placeholder="https://..." />
              </label>

              <div className="owner-form__actions owner-form__wide">
                <button type="button" className="admin-action" onClick={() => saveListing('draft')}>
                  Enregistrer brouillon
                </button>
                <button type="button" className="btn btn--primary" onClick={() => saveListing('pending')}>
                  Envoyer en verification
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  )
}
