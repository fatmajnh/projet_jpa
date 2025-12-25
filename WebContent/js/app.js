const API_URL = "http://localhost:8080/tp_jpa/rest/persons";

// Charger toutes les personnes
function loadPersons() {
    fetch(API_URL + "/all")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("personTable");
            table.innerHTML = "";
            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.age}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editPerson(${p.id})">Modifier</button>
                            <button class="btn btn-danger btn-sm" onclick="deletePerson(${p.id})">Supprimer</button>
                        </td>
                    </tr>
                `;
            });
        });
}

// Ajouter ou modifier
function savePerson() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    if (!name || !age) {
        alert("Champs obligatoires !");
        return;
    }

    const person = { id: id || null, name, age };
    const method = id ? "PUT" : "POST";
    const url = id ? API_URL + "/update" : API_URL + "/add";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person)
    })
    .then(() => {
        resetForm();
        loadPersons();
    });
}

// Supprimer
function deletePerson(id) {
    if (!confirm("Confirmer la suppression ?")) return;

    fetch(API_URL + "/delete/" + id, {
        method: "DELETE"
    })
    .then(() => {
        loadPersons();
        resetSearchField();
    });
}

// Modifier
function editPerson(id) {
    fetch(API_URL + "/" + id)
        .then(res => res.json())
        .then(p => {
            document.getElementById("id").value = p.id;
            document.getElementById("name").value = p.name;
            document.getElementById("age").value = p.age;
            document.getElementById("searchId").value = p.id; // Afficher l'ID dans la recherche
            searchPerson(); // Actualiser l'affichage
        });
}

// Recherche par ID
function searchPerson() {
    const searchInput = document.getElementById("searchId");
    const id = searchInput.value.trim();
    
    // Si le champ est vide, afficher toutes les personnes
    if (!id) {
        loadPersons();
        return;
    }
    
    fetch(API_URL + "/" + id)
        .then(res => {
            if (!res.ok) {
                throw new Error("Personne non trouvée");
            }
            return res.json();
        })
        .then(p => {
            const table = document.getElementById("personTable");
            table.innerHTML = `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editPerson(${p.id})">Modifier</button>
                        <button class="btn btn-danger btn-sm" onclick="deletePerson(${p.id})">Supprimer</button>
                    </td>
                </tr>
            `;
        })
        .catch(error => {
            const table = document.getElementById("personTable");
            table.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-danger">
                        Aucune personne existe avec cet ID (${id})
                    </td>
                </tr>
            `;
        });
}

// Reset formulaire
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
}

// Réinitialiser le champ de recherche
function resetSearchField() {
    document.getElementById("searchId").value = "";
}
function searchByName() {
    const name = document.getElementById("searchName").value.trim();
    if (!name) return loadPersons();

    fetch(`${API_URL}/search/${encodeURIComponent(name)}`)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("personTable");
            table.innerHTML = "";
            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.age}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editPerson(${p.id})">Modifier</button>
                            <button class="btn btn-danger btn-sm" onclick="deletePerson(${p.id})">Supprimer</button>
                        </td>
                    </tr>
                `;
            });
        });
}


// Thème sombre/clair
function toggleTheme() {
    document.body.classList.toggle("dark");

    const btn = document.getElementById("themeToggle");
    btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}


// Écouter la touche Entrée dans le champ de recherche
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById("searchId");
    
    // Recherche avec la touche Entrée
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchPerson();
        }
    });
    
    // Recherche lorsque le champ est vidé
    searchInput.addEventListener('input', function() {
        if (!this.value.trim()) {
            loadPersons();
        }
    });
});

// Initialisation
loadPersons();