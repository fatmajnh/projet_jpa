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

    const person = { id, name, age };
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
    }).then(loadPersons);
}

// Modifier
function editPerson(id) {
    fetch(API_URL + "/" + id)
        .then(res => res.json())
        .then(p => {
            document.getElementById("id").value = p.id;
            document.getElementById("name").value = p.name;
            document.getElementById("age").value = p.age;
        });
}

// Recherche par ID
function searchPerson() {
    const id = document.getElementById("searchId").value;
    if (!id) return loadPersons();

    fetch(API_URL + "/" + id)
        .then(res => res.json())
        .then(p => {
            const table = document.getElementById("personTable");
            table.innerHTML = `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                    <td>-</td>
                </tr>
            `;
        });
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


// Reset formulaire
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
}

// Initialisation
loadPersons();
