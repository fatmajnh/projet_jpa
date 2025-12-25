# Projet Frontend REST – Gestion des Personnes

## 1-Description du projet

Ce projet consiste à développer le frontend d’une application web permettant de consommer un backend RESTful JEE déjà réalisé lors de TP4.
Le backend a été développé avec JAX-RS et JPA (Hibernate) et expose des services REST pour la gestion des personne(Person).  
Le frontend permet d’interagir avec ces services via des requêtes HTTP et d’afficher dynamiquement les données côté client.

---

## Objectif du projet

- Concevoir une interface web frontend
- Consommer des services REST existants
- Respecter l’architecture **Client / Serveur**
- Utiliser exclusivement les services REST (aucun accès direct à la base de données)

---

## Architecture globale
[ Frontend ]
HTML / CSS / JavaScript
        |
        |  (Fetch API – JSON)
        |
[ Backend REST ]
JAX-RS (Jersey) + JPA (Hibernate)
        |
[ Base de données ]
MySQL

---
## Technologies utilisées

### Backend
- Java JDK 1.8
- JAX-RS (Jersey)
- JPA (Hibernate)
- MySQL
- Maven
- Apache Tomcat 9.0

### Frontend
- HTML5
- CSS3
- Bootstrap
- JavaScript
- Fetch API
- JSON

---

## Structure du projet
tp_jpa
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── poly
│   │   │           ├── Person.java
│   │   │           ├── PersonService.java
│   │   │           ├── PersonServiceImpl.java
│   │   │           ├── RestRouter.java
│   │   │           └── Test.java
│   │   └── resources
│   │       ├── META-INF
│   │       │   └── persistence.xml
│   │       └── com
│   │           └── poly
│   │               └── config
│   └── test
│       └── java
├── target
│   ├── generated-sources
│   ├── m2e-wtp
│   ├── maven-archiver
│   ├── maven-status
│   └── tp_jpa-0.0.1-SNAPSHOT
│       ├── tp_jpa-0.0.1-SNAPSHOT.war
│       └── WEB-INF
│           ├── classes
│           └── lib
├── WebContent
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── app.js
│   ├── META-INF
│   ├── WEB-INF
│   │   └── web.xml
│   └── index.html
└── (JAX-WS, Java Resources, JavaScript Resources, Deployed Resources, Libraries sont des vues IDE, non physiques)

---

## Endpoints REST utilisés

| Méthode | URL | Description |
|-------|-----|------------|
| GET | `/tp_jpa/rest/persons/all` | Liste des personnes |
| GET | `/tp_jpa/rest/persons/{id}` | Personne par ID |
| GET | `/tp_jpa/rest/persons/{name}` | Personne par Nom |
| POST | `/tp_jpa/rest/persons/add` | Ajouter une personne |
| PUT | `/tp_jpa/rest/persons/update` | Modifier une personne |
| DELETE | `/tp_jpa/rest/persons/delete/{id}` | Supprimer une personne |

---

## Fonctionnalités réalisées

### Liste des personnes
- Affichage dynamique sous forme de tableau
- Données récupérées depuis le backend REST

### Ajouter une personne
- Formulaire avec validation
- Envoi des données via POST

### Modifier une personne
- Pré-remplissage du formulaire
- Mise à jour via PUT

### Supprimer une personne
- Bouton de suppression
- Confirmation avant suppression

### ✔️ Recherche
- Recherche par ID et Nom
- Affichage du résultat côté client

---

## Instructions d’exécution

### Backend
1. Importer le projet Maven dans Eclipse
2. Créer la base de données MySQL :
   ```sql
   CREATE DATABASE jpa_bd;
3. Vérifier la configuration dans persistence.xml
4. Déployer le projet sur Tomcat 9
5. Tester : http://localhost:8080/tp_jpa/rest/persons/all

### Frontend
1. Le frontend est intégré dans le projet (WebContent)
2. Accéder à l’application : http://localhost:8080/tp_jpa/

---
### Vidéo de démonstration
 Lien de la vidéo : vid_projet

### La vidéo présente :
1. L’architecture globale
2. Les services REST
3. Les fonctionnalités (CRUD + recherche)
4. Une explication du code frontend 
 
 
  ----

### Dépôt GitHub

Lien GitHub : https://github.com/fatmajnh/projet_jpa.git

Le dépôt contient :
1. Le code de projet (backend et frontend)
2. Le fichier README.md

 ----

### Auteur

## Nom : Fatma Ezzahra Jenayah (tp7 li3)

## Module : JEE – Services REST

## Projet : Frontend et  Backend REST (JAX-RS + JPA)


-----
### Conclusion

Ce projet respecte les exigences pédagogiques :

Architecture Client / Serveur

Consommation REST uniquement

Code structuré et lisible

Compatible avec JDK 1.8 et Tomcat 9
