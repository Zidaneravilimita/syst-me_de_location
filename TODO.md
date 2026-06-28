# TODO - Modification Admin “Gestion des annonces” (properties)

- [x] Mettre en place backend Express + endpoint properties (GET /properties, PUT/PATCH /properties/:id)
- [x] Ajouter stockage JSON backend/src/data/properties.json + store
- [x] Créer validation + service/controller/routes backend

- [x] Mettre à jour AdminDashboard.jsx pour :
  - [x] Charger la liste depuis GET /properties
  - [x] Modifier (statut + champ available) et afficher les contenus des annonces
  - [x] Appeler PUT/PATCH pour persister
- [ ] Tester manuellement : fetch, édition, persistance après refresh



