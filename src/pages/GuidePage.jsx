import Logo from '../components/Logo'

const features = [
  {
    title: 'Recherche et location',
    text: 'Les utilisateurs peuvent rechercher des maisons, voitures, motos et quads selon le lieu, la categorie et la disponibilite.',
  },
  {
    title: 'Espace proprietaire',
    text: 'Les proprietaires peuvent creer un compte, ajouter leurs biens, modifier leurs annonces et demander une publication.',
  },
  {
    title: 'Administration',
    text: 'L administrateur peut verifier les proprietaires, valider les dossiers, gerer les annonces et controler les statuts de publication.',
  },
  {
    title: 'Gestion des statuts',
    text: 'Les annonces peuvent etre publiees, mises en attente, rejetees ou marquees comme plus disponibles.',
  },
]

const legalItems = [
  'Chaque utilisateur doit fournir des informations exactes lors de la creation de compte.',
  'Les proprietaires restent responsables de la veracite des annonces, des prix, des photos et des disponibilites.',
  'La plateforme peut suspendre, rejeter ou retirer un compte ou une annonce en cas de contenu trompeur, incomplet ou non conforme.',
  'Les demandes de reservation doivent respecter les conditions indiquees par le proprietaire et les regles de la plateforme.',
]

export default function GuidePage({ onNavigate }) {
  return (
    <main className="guide-page">
      <header className="guide-hero">
        <div className="guide-hero__top">
          <Logo />
          <button type="button" className="guide-back" onClick={() => onNavigate('landing')}>
            Retour
          </button>
        </div>
        <div className="guide-hero__content">
          <span className="guide-eyebrow">Guide du site</span>
          <h1>Comprendre la plateforme avant de commencer</h1>
          <p>
            Cette page explique les principales fonctionnalites du site, les roles des utilisateurs,
            les conditions legales de base et le contact administrateur.
          </p>
        </div>
      </header>

      <section className="guide-section">
        <div className="guide-section__header">
          <span>01</span>
          <h2>Fonctionnalites principales</h2>
        </div>
        <div className="guide-grid">
          {features.map((feature) => (
            <article key={feature.title} className="guide-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section__header">
          <span>02</span>
          <h2>Roles disponibles</h2>
        </div>
        <div className="guide-roles">
          <article>
            <strong>Utilisateur normal</strong>
            <p>Consulte les annonces, filtre les biens et effectue des demandes de reservation.</p>
          </article>
          <article>
            <strong>Proprietaire</strong>
            <p>Publie ses biens, gere ses annonces et suit les statuts de verification.</p>
          </article>
          <article>
            <strong>Administrateur</strong>
            <p>Supervise la plateforme, valide les proprietaires et controle les annonces.</p>
          </article>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section__header">
          <span>03</span>
          <h2>Conditions legales</h2>
        </div>
        <ul className="guide-legal">
          {legalItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="guide-contact">
        <div>
          <span className="guide-eyebrow">Contact administrateur</span>
          <h2>Besoin d aide ou de validation ?</h2>
          <p>
            Pour contacter l administrateur du site, envoyer une demande a cette adresse email.
          </p>
        </div>
        <a href="mailto:tahiendrazazidane@gmail.com">tahiendrazazidane@gmail.com</a>
      </section>
    </main>
  )
}
