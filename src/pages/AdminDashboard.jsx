import { useMemo, useState } from 'react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { getCategoryLabel, getServiceLabel, listings as initialListings } from '../data/listings'

const owners = [
  {
    id: 1,
    name: 'Claire Martin',
    email: 'claire.martin@example.com',
    phone: '+33 6 12 45 78 90',
    status: 'Validé',
    listings: [1, 5, 8],
  },
  {
    id: 2,
    name: 'Karim Benali',
    email: 'karim.benali@example.com',
    phone: '+33 6 32 18 44 21',
    status: 'En vérification',
    listings: [2, 7, 11, 15],
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    phone: '+33 7 21 66 84 10',
    status: 'Validé',
    listings: [3, 6, 12, 16],
  },
  {
    id: 4,
    name: 'Hugo Bernard',
    email: 'hugo.bernard@example.com',
    phone: '+33 6 88 10 34 52',
    status: 'Suspendu',
    listings: [4, 9, 13, 17, 18],
  },
]

const menuItems = [
  { id: 'overview', label: 'Vue globale', icon: 'grid' },
  { id: 'owners', label: 'Propriétaires', icon: 'users' },
  { id: 'listings', label: 'Annonces', icon: 'list' },
  { id: 'bookings', label: 'Réservations', icon: 'calendar' },
  { id: 'settings', label: 'Paramètres', icon: 'settings' },
]

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

export default function AdminDashboard({ onNavigate }) {
  const { user, logout } = useAuth()
  const [activeMenu, setActiveMenu] = useState('overview')
  const [listings, setListings] = useState(initialListings)
  const [query, setQuery] = useState('')

  const enrichedListings = useMemo(
    () =>
      listings.map((listing, index) => ({
        ...listing,
        owner: owners[index % owners.length],
        status: listing.available ? 'Publié' : 'Indisponible',
      })),
    [listings],
  )

  const filteredListings = enrichedListings.filter((listing) => {
    const searchText = `${listing.name} ${listing.location} ${listing.owner.name}`.toLowerCase()
    return searchText.includes(query.toLowerCase())
  })

  const publishedCount = enrichedListings.filter((listing) => listing.available).length
  const unavailableCount = enrichedListings.length - publishedCount

  const toggleListingAvailability = (listingId) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === listingId ? { ...listing, available: !listing.available } : listing,
      ),
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
            Déconnexion
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
          <StatCard label="Propriétaires" value={owners.length} detail="comptes suivis" />
          <StatCard label="Annonces" value={enrichedListings.length} detail={`${publishedCount} publiées`} />
          <StatCard label="À vérifier" value={unavailableCount} detail="annonces indisponibles" />
          <StatCard label="Réservations" value="128" detail="ce mois-ci" />
        </section>

        {activeMenu === 'overview' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Activité récente</h2>
                <p>Suivi rapide des propriétaires et des annonces de la plateforme.</p>
              </div>
            </div>
            <div className="admin-activity">
              {enrichedListings.slice(0, 5).map((listing) => (
                <div key={listing.id} className="admin-activity__item">
                  <img src={listing.image} alt="" />
                  <div>
                    <strong>{listing.name}</strong>
                    <span>{listing.owner.name} · {getServiceLabel(listing.serviceType)}</span>
                  </div>
                  <span className={`admin-badge ${listing.available ? 'admin-badge--success' : 'admin-badge--warning'}`}>
                    {listing.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeMenu === 'owners' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Gestion des propriétaires</h2>
                <p>Liste des comptes propriétaires, statut de validation et volume d'annonces.</p>
              </div>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Propriétaire</th>
                    <th>Contact</th>
                    <th>Annonces</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {owners.map((owner) => (
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
                        <span className={`admin-badge ${owner.status === 'Validé' ? 'admin-badge--success' : owner.status === 'Suspendu' ? 'admin-badge--danger' : 'admin-badge--warning'}`}>
                          {owner.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
                <p>Contrôlez la visibilité, les propriétaires et les catégories des annonces.</p>
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
                      <p>{listing.owner.name} · {listing.location}</p>
                    </div>
                    <div className="admin-listing__meta">
                      <span>{getServiceLabel(listing.serviceType)}</span>
                      <span>{getCategoryLabel(listing.serviceType, listing.category)}</span>
                      <span>{listing.price}€ / {listing.priceUnit}</span>
                    </div>
                    <div className="admin-listing__footer">
                      <span className={`admin-badge ${listing.available ? 'admin-badge--success' : 'admin-badge--warning'}`}>
                        {listing.status}
                      </span>
                      <button
                        type="button"
                        className="admin-action"
                        onClick={() => toggleListingAvailability(listing.id)}
                      >
                        {listing.available ? 'Désactiver' : 'Publier'}
                      </button>
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
                <h2>Réservations</h2>
                <p>Paramètres de suivi des demandes, validations et annulations.</p>
              </div>
            </div>
            <div className="admin-settings-grid">
              <div className="admin-setting">
                <strong>Validation automatique</strong>
                <span>Activée pour les propriétaires validés.</span>
              </div>
              <div className="admin-setting">
                <strong>Notifications</strong>
                <span>Email administrateur et propriétaire.</span>
              </div>
              <div className="admin-setting">
                <strong>Annulations</strong>
                <span>Contrôle manuel pour les réservations sensibles.</span>
              </div>
            </div>
          </section>
        )}

        {activeMenu === 'settings' && (
          <section className="admin-panel">
            <div className="admin-panel__header">
              <div>
                <h2>Paramètres de la plateforme</h2>
                <p>Réglages généraux disponibles pour l'administration.</p>
              </div>
            </div>
            <div className="admin-settings-grid">
              <label className="admin-setting">
                <strong>Validation des nouveaux propriétaires</strong>
                <span>Revue obligatoire avant publication.</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className="admin-setting">
                <strong>Publication directe des annonces</strong>
                <span>Limiter aux comptes propriétaires validés.</span>
                <input type="checkbox" />
              </label>
              <label className="admin-setting">
                <strong>Alertes de modération</strong>
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
