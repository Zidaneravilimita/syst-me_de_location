import { useMemo, useState, useEffect } from 'react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { getCategoryLabel, getServiceLabel } from '../data/listings'
import { fetchProperties, updateProperty } from '../api/backendClient'


const ownerStatuses = [
  { value: 'validated', label: 'Valide', badge: 'success' },
  { value: 'verification', label: 'En verification', badge: 'warning' },
  { value: 'paused', label: 'En pause', badge: 'muted' },
  { value: 'rejected', label: 'Rejete', badge: 'danger' },
]

const listingStatuses = [
  { value: 'published', label: 'Publie', badge: 'success' },
  { value: 'pending', label: 'En attente', badge: 'warning' },
  { value: 'rejected', label: 'Rejete', badge: 'danger' },
  { value: 'unavailable', label: 'Plus disponible', badge: 'muted' },
]

const initialOwners = [
  {
    id: 1,
    name: 'Claire Martin',
    email: 'claire.martin@example.com',
    phone: '+33 6 12 45 78 90',
    status: 'validated',
    listings: [1, 5, 8],
  },
  {
    id: 2,
    name: 'Karim Benali',
    email: 'karim.benali@example.com',
    phone: '+33 6 32 18 44 21',
    status: 'verification',
    listings: [2, 7, 11, 15],
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    phone: '+33 7 21 66 84 10',
    status: 'validated',
    listings: [3, 6, 12, 16],
  },
  {
    id: 4,
    name: 'Hugo Bernard',
    email: 'hugo.bernard@example.com',
    phone: '+33 6 88 10 34 52',
    status: 'paused',
    listings: [4, 9, 13, 17, 18],
  },
]

const menuItems = [
  { id: 'overview', label: 'Vue globale', icon: 'grid' },
  { id: 'owners', label: 'Proprietaires', icon: 'users' },
  { id: 'listings', label: 'Annonces', icon: 'list' },
  { id: 'bookings', label: 'Reservations', icon: 'calendar' },
  { id: 'settings', label: 'Parametres', icon: 'settings' },
]

function getStatusMeta(items, value) {
  return items.find((item) => item.value === value) ?? items[0]
}

function getInitialListingStatus(listing, index) {
  if (!listing.available) return 'unavailable'
  if (index % 7 === 0) return 'pending'
  return 'published'
}

function MenuIcon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </>
    ),
    settings: (
      <>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.52a2 2 0 0 1-1 1.72l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.52a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  }

  return <svg {...common}>{paths[name]}</svg>
}

function StatCard({ label, value, detail }) {
  return (
    <article className="admin-stat">
      <span className="admin-stat__label">{label}</span>
      <strong>{value}</strong>
      <span className="admin-stat__detail">{detail}</span>
    </article>
  )
}

function StatusBadge({ meta }) {
  return <span className={`admin-badge admin-badge--${meta.badge}`}>{meta.label}</span>
}

export default function AdminDashboard({ onNavigate }) {
  const { user, logout } = useAuth()
  const [activeMenu, setActiveMenu] = useState('overview')
  const [owners, setOwners] = useState(initialOwners)
  const [properties, setProperties] = useState([])
  const [query, setQuery] = useState('')
  const [loadingListings, setLoadingListings] = useState(false)

  useEffect(() => {
    let mounted = true
    setLoadingListings(true)
    fetchProperties()
      .then((items) => {
        if (!mounted) return
        setProperties(items)
      })
      .catch(() => {
        if (!mounted) return
        setProperties([])
      })
      .finally(() => {
        if (!mounted) return
        setLoadingListings(false)
      })

    return () => {
      mounted = false
    }
  }, [])


  const enrichedListings = useMemo(
    () =>
      properties.map((property, index) => ({
        ...property,
        id: property.id,
        // compat UI existing fields
        name: property.title,
        adminStatus: property.status,
        priceUnit: property.priceUnit || 'nuit',
        owner: owners[index % owners.length],
        statusMeta: getStatusMeta(listingStatuses, property.status),
      })),
    [properties, owners],
  )


  const filteredListings = enrichedListings.filter((listing) => {
    const searchText = `${listing.name} ${listing.location} ${listing.owner.name}`.toLowerCase()
    return searchText.includes(query.toLowerCase())
  })

  const publishedCount = enrichedListings.filter((listing) => listing.adminStatus === 'published').length
  const pendingCount = enrichedListings.filter((listing) => listing.adminStatus === 'pending').length
  const rejectedCount = enrichedListings.filter((listing) => listing.adminStatus === 'rejected').length
  const unavailableCount = enrichedListings.filter((listing) => listing.adminStatus === 'unavailable').length

  const ownerPendingCount = owners.filter((owner) => owner.status === 'verification').length

  const [savingId, setSavingId] = useState(null)

  const handleUpdateProperty = async (propertyId, patch) => {
    setSavingId(propertyId)
    try {
      await updateProperty(propertyId, patch)
      const items = await fetchProperties()
      setProperties(items)
    } finally {
      setSavingId(null)
    }
  }

  const handleUpdateField = (listing, field, value) => {
    // no-op helper for future enhancements
    void listing
    void field
    void value
  }


  const updateOwnerStatus = (ownerId, status) => {

    setOwners((prev) =>
      prev.map((owner) => (owner.id === ownerId ? { ...owner, status } : owner)),
    )
  }

  const handleLogout = () => {
    logout()
    onNavigate('landing')
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Logo />
          <span>Administration</span>
        </div>

        <nav className="admin-menu" aria-label="Menu administrateur">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-menu__item ${activeMenu === item.id ? 'admin-menu__item--active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <MenuIcon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__account">
          <span>{user?.name ?? 'Administrateur'}</span>
          <button type="button" onClick={handleLogout}>
            Deconnexion
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-eyebrow">Espace administrateur</span>
            <h1>Dashboard</h1>
          </div>
          <button type="button" className="btn btn--primary" onClick={() => onNavigate('home')}>
            Voir le site
          </button>
        </header>

        <section className="admin-stats" aria-label="Indicateurs de la plateforme">
          <StatCard label="Proprietaires" value={owners.length} detail={`${ownerPendingCount} en verification`} />
          <StatCard label="Annonces" value={enrichedListings.length} detail={`${publishedCount} publiees`} />
          <StatCard label="A verifier" value={pendingCount} detail="annonces en attente" />
          <StatCard label="Rejetees" value={rejectedCount} detail="annonces refusees" />
          <StatCard label="Plus disponibles" value={unavailableCount} detail="annonces indisponibles" />
        </section>


        {activeMenu === 'overview' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Activite recente</h2>
                <p>Suivi rapide des proprietaires et des annonces de la plateforme.</p>
              </div>
            </div>
            <div className="admin-activity">
              {enrichedListings.slice(0, 5).map((listing) => (
                <div key={listing.id} className="admin-activity__item">
                  <img src={listing.image} alt="" />
                  <div>
                    <strong>{listing.name}</strong>
                    <span>{listing.owner.name} - {getServiceLabel(listing.serviceType)}</span>
                  </div>
                  <StatusBadge meta={listing.statusMeta} />
                </div>
              ))}
            </div>
          </section>
        )}

        {activeMenu === 'owners' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Gestion des proprietaires</h2>
                <p>Validez les requetes et dossiers, mettez un compte en pause ou rejetez-le.</p>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Proprietaire</th>
                    <th>Contact</th>
                    <th>Annonces</th>
                    <th>Statut</th>
                    <th>Edition</th>
                  </tr>
                </thead>
                <tbody>
                  {owners.map((owner) => {
                    const ownerMeta = getStatusMeta(ownerStatuses, owner.status)
                    return (
                      <tr key={owner.id}>
                        <td>
                          <strong>{owner.name}</strong>
                          <span>ID #{owner.id}</span>
                        </td>
                        <td>
                          <span>{owner.email}</span>
                          <span>{owner.phone}</span>
                        </td>
                        <td>{owner.listings.length}</td>
                        <td>
                          <StatusBadge meta={ownerMeta} />
                        </td>
                        <td>
                          <div className="admin-edit-controls">
                            <select
                              className="admin-select"
                              value={owner.status}
                              onChange={(event) => updateOwnerStatus(owner.id, event.target.value)}
                              aria-label={`Modifier le statut de ${owner.name}`}
                            >
                              {ownerStatuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                            <div className="admin-quick-actions">
                              <button type="button" className="admin-action" onClick={() => updateOwnerStatus(owner.id, 'validated')}>
                                Valider
                              </button>
                              <button type="button" className="admin-action" onClick={() => updateOwnerStatus(owner.id, 'paused')}>
                                Pause
                              </button>
                              <button type="button" className="admin-action admin-action--danger" onClick={() => updateOwnerStatus(owner.id, 'rejected')}>
                                Rejeter
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeMenu === 'listings' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Gestion des annonces</h2>
                <p>Editez le statut des annonces: publier, en attente, rejeter ou plus disponible.</p>
              </div>
              <input
                className="admin-search"
                type="search"
                placeholder="Rechercher une annonce"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="admin-listing-grid">
              {filteredListings.map((listing) => (
                <article key={listing.id} className="admin-listing">
                  <img src={listing.image} alt="" />
                  <div className="admin-listing__body">
                    <div>
                      <h3>{listing.name}</h3>
                      <p>{listing.owner.name} - {listing.location}</p>
                    </div>
                    <div className="admin-listing__meta">
                      <span>{getServiceLabel(listing.serviceType)}</span>
                      <span>{getCategoryLabel(listing.serviceType, listing.category)}</span>
                      <span>{listing.price} EUR / {listing.priceUnit}</span>
                    </div>
                    <div className="admin-listing__footer">
                      <StatusBadge meta={listing.statusMeta} />
                      <div className="admin-edit-controls">
                        <select
                          className="admin-select"
                          value={listing.adminStatus}
                          onChange={(event) => {
                            const status = event.target.value
                            handleUpdateProperty(listing.id, {
                              status,
                              available: status === 'published',
                            })
                          }}
                          aria-label={`Modifier le statut de ${listing.name}`}
                          disabled={savingId === listing.id}
                        >
                          {listingStatuses.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                        <div className="admin-quick-actions">
                          <button
                            type="button"
                            className="admin-action"
                            onClick={() => handleUpdateProperty(listing.id, { status: 'published', available: true })}
                            disabled={savingId === listing.id}
                          >
                            Publier
                          </button>
                          <button
                            type="button"
                            className="admin-action"
                            onClick={() => handleUpdateProperty(listing.id, { status: 'pending', available: false })}
                            disabled={savingId === listing.id}
                          >
                            Attente
                          </button>
                          <button
                            type="button"
                            className="admin-action admin-action--danger"
                            onClick={() => handleUpdateProperty(listing.id, { status: 'rejected', available: false })}
                            disabled={savingId === listing.id}
                          >
                            Rejeter
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeMenu === 'bookings' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Reservations</h2>
                <p>Parametres de suivi des demandes, validations et annulations.</p>
              </div>
            </div>
            <div className="admin-settings-grid">
              <div className="admin-setting">
                <strong>Validation automatique</strong>
                <span>Activee pour les proprietaires valides.</span>
              </div>
              <div className="admin-setting">
                <strong>Notifications</strong>
                <span>Email administrateur et proprietaire.</span>
              </div>
              <div className="admin-setting">
                <strong>Annulations</strong>
                <span>Controle manuel pour les reservations sensibles.</span>
              </div>
            </div>
          </section>
        )}

        {activeMenu === 'settings' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Parametres de la plateforme</h2>
                <p>Reglages generaux disponibles pour l'administration.</p>
              </div>
            </div>
            <div className="admin-settings-grid">
              <label className="admin-setting">
                <strong>Validation des nouveaux proprietaires</strong>
                <span>Revue obligatoire avant publication.</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className="admin-setting">
                <strong>Publication directe des annonces</strong>
                <span>Limiter aux comptes proprietaires valides.</span>
                <input type="checkbox" />
              </label>
              <label className="admin-setting">
                <strong>Alertes de moderation</strong>
                <span>Notifier l'administrateur en cas d'annonce indisponible.</span>
                <input type="checkbox" defaultChecked />
              </label>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
