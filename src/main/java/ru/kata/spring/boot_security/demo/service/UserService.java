package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    User findUserById(long count);

    void deleteUser(User user);

    void updateUser(User user);

    void saveUser(User user);

    List<User> getAllUsers();

}
