const steps = [
  {
    number: '01',
    title: 'Recherchez',
    description: 'Choisissez votre lieu, dates et type de véhicule parmi notre catalogue.',
  },
  {
    number: '02',
    title: 'Réservez',
    description: 'Sélectionnez votre véhicule et confirmez votre réservation en ligne.',
  },
  {
    number: '03',
    title: 'Prenez en charge',
    description: 'Récupérez votre véhicule à l\'agence ou optez pour la livraison.',
  },
  {
    number: '04',
    title: 'Partez !',
    description: 'Profitez de votre trajet. Retournez le véhicule à la date convenue.',
  },
]

export default function HowItWorks() {
  return (
    <section id="comment" className="how-it-works">
      <div className="section-header">
        <h2>Comment ça marche ?</h2>
        <p>4 étapes simples pour louer votre véhicule</p>
      </div>

      <div className="steps">
        {steps.map((step, index) => (
          <div key={step.number} className="step">
            <div className="step__number">{step.number}</div>
            {index < steps.length - 1 && <div className="step__connector"></div>}
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
