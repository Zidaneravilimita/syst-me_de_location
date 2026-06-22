# LocHub — Plateforme de location multi-services

Site web de location de maisons, voitures, motos et quads.

## Fonctionnalités

- **4 types de services** : maisons, voitures, motos, quads
- **Filtres** : par type de service et sous-catégorie (appartement, SUV, sport, etc.)
- **Recherche** : type, lieu, dates d'arrivée et de départ
- **18 offres** : catalogue varié avec photos, specs et prix
- **Réservation** : modal de confirmation avec calcul automatique du prix
- **Design responsive** : adapté mobile, tablette et desktop

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Build production

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── SearchForm.jsx
│   ├── ListingCard.jsx
│   ├── ListingList.jsx
│   ├── Features.jsx        # Avantages + showcase services
│   ├── HowItWorks.jsx
│   ├── Footer.jsx
│   └── BookingModal.jsx
├── data/listings.js        # Données des offres et catégories
├── App.jsx
└── index.css
```
