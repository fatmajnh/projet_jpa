package com.poly;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import com.poly.Person;
public class PersonServiceImpl implements PersonService {

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("persistence");
    EntityManager entityManager = entityManagerFactory.createEntityManager();

    @Override
    public boolean addPerson(Person p) {
        entityManager.getTransaction().begin();
        try {
            entityManager.persist(p);
            entityManager.getTransaction().commit();
            entityManager.clear();
            System.out.println("Record Successfully Inserted In The Database");
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erreur add");
            return false;
        }
    }

    @Override
    public boolean deletePerson(int id) {
        entityManager.getTransaction().begin();
        try {
            entityManager.remove(entityManager.find(Person.class, id));
            entityManager.getTransaction().commit();
            entityManager.clear();
            System.out.println("Delete Successfully In The Database");
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updatePerson(Person p) {
        entityManager.getTransaction().begin();
        try {
            entityManager.merge(p);
            entityManager.getTransaction().commit();
            entityManager.clear();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Erreur update");
            return false;
        }
    }

    @Override
    public Person getPerson(int id) {
        entityManager.getTransaction().begin();
        try {
            return entityManager.find(Person.class, id);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public List<Person> getAllPersons() {
        entityManager.getTransaction().begin();
        List<Person> listp = entityManager.createQuery("SELECT p FROM Person p").getResultList();
        if (listp == null || listp.isEmpty()) {
            System.out.println("No person found.");
        } else {
            for (Person person : listp) {
                System.out.println(person.getName());
            }
        }
        return listp;
    }
    @Override
    public List<Person> getPersonsByName(String name) {
        entityManager.getTransaction().begin();
        try {
            Query query = entityManager.createQuery("SELECT p FROM Person p WHERE p.name LIKE :name");
            query.setParameter("name", "%" + name + "%"); // permet recherche partielle
            List<Person> results = query.getResultList();
            entityManager.getTransaction().commit();
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
