package com.poly;

import java.util.List;
import com.poly.Person;
public interface PersonService {

    boolean addPerson(Person p);

    boolean deletePerson(int id);

    boolean updatePerson(Person p);

    Person getPerson(int id);

    List<Person> getAllPersons();
    List<Person> getPersonsByName(String name);

}
