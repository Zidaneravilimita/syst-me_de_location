import { serviceTypes } from '../data/listings'
import Logo from './Logo'

export default function Footer() {
  const services = serviceTypes.filter((s) => s.id !== 'all')

  return (
    <footer id="contact" className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>
            Votre plateforme de location multi-services en France :
            maisons, voitures, motos et quads.
          </p>
        </div>

        <div className="footer__links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#annonces">Offres</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#avantages">Avantages</a></li>
            <li><a href="#comment">Comment ça marche</a></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>Services</h4>
          <ul>
            {services.map((s) => (
              <li key={s.id}><a href="#annonces">{s.icon} {s.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <ul>
            <li>📞 01 23 45 67 89</li>
            <li>📧 contact@lochub.fr</li>
            <li>📍 15 rue de la République, Paris</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 LocHub. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
