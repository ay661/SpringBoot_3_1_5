package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/getRoles")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.OK);
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam("id") Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = userService.getById(id).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/update")
    public ResponseEntity<Void> updateUser(@RequestBody User user, @RequestParam("id") Long id) {
        if (id == null || userService.getById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.updateUser(id, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam("id") Long id) {
        if (id == null || userService.getById(id).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}