package com.poly;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.poly.Person;
import com.poly.PersonServiceImpl;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RestRouter {

    PersonServiceImpl personService = new PersonServiceImpl();

    // ➕ Ajouter une personne
    @POST
    @Path("/add")
    public boolean addPerson(Person p) {
        return personService.addPerson(p);
    }

    // ❌ Supprimer une personne
    @DELETE
    @Path("/delete/{id}")
    public boolean deletePerson(@PathParam("id") int id) {
        return personService.deletePerson(id);
    }

    // ✏️ Modifier une personne
    @PUT
    @Path("/update")
    public boolean updatePerson(Person p) {
        return personService.updatePerson(p);
    }

    // 🔍 Récupérer une personne par id
    @GET
    @Path("/{id}")
    public Person getPerson(@PathParam("id") int id) {
        return personService.getPerson(id);
    }

    // 📋 Récupérer toutes les personnes
    @GET
    @Path("/all")
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }
 // 🔍 Rechercher par nom
    @GET
    @Path("/search/{name}")
    public List<Person> searchByName(@PathParam("name") String name) {
        return personService.getPersonsByName(name);
    }
}
