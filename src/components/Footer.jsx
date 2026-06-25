import { serviceTypes } from '../data/listings'
import Logo from './Logo'
import { Phone, Mail, MapPin, Mailbox, Home, Car, Bike, Zap } from 'lucide-react'

const serviceIcons = {
  maison: Home,
  voiture: Car,
  moto: Bike,
  quad: Zap,
}

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
            {services.map((s) => {
              const Icon = serviceIcons[s.id]
              return (
                <li key={s.id}><a href="#annonces"><Icon size={16} /> {s.label}</a></li>
              )
            })}
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Contact</h4>
          <ul>
            <li><Phone size={16} /> +261 32 68 792 14</li>
            <li><Mail size={16} /> tahiendrazazidane@gmail.com</li>
            <li><MapPin size={16} /> Rue Mahavoky Mahajanga</li>
            <li><Mailbox size={16} /> 401 Madagascar</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 LocHub. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
