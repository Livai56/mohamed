
# Taslim Ecole Mobile

Application Expo de suivi scolaire pour les directions, enseignants et parents.

## Lancer le projet

Installer les dependances avec `npm install`, puis demarrer Expo avec `npx expo start`.
Pour connecter Django, definir `EXPO_PUBLIC_API_URL` vers la base de l'API, par exemple:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.20:8000/api npx expo start
```

Pour aligner automatiquement la version Expo du stockage securise: `npx expo install expo-secure-store`.

## Contrat Django utilise

- `POST /auth/login/` avec `{ "email": "...", "password": "..." }`, retour `{ "user": {...}, "access": "..." }` ou `{ "token": "..." }`.
- `GET /students/` avec `Authorization: Bearer <token>` pour la direction et les enseignants.
- `GET /children/` avec `Authorization: Bearer <token>` pour les parents.
- `GET /messages/` avec `Authorization: Bearer <token>`.
- `POST /auth/password-reset/` avec `{ "email": "..." }`.

Le modele utilisateur renvoye peut utiliser `firstName`/`schoolName` ou les noms Django `first_name`/`school_name`. Le role accepte `ADMIN`, `DIRECTEUR`, `ENSEIGNANT`, `TEACHER` ou `PARENT`. Les ecrans utilisent des donnees de demonstration tant qu'un endpoint n'est pas joignable, ce qui permet de parcourir l'interface avant le branchement du backend.
