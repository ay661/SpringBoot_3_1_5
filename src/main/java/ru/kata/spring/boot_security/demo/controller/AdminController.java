package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserServiceImpl userServiceImpl;
    private final RoleServiceImpl roleServiceImpl;


    @Autowired
    public AdminController(UserServiceImpl userServiceImpl, RoleServiceImpl roleServiceImpl) {
        this.userServiceImpl = userServiceImpl;
        this.roleServiceImpl = roleServiceImpl;
    }

    @GetMapping()
    public String showAll(ModelMap model, Principal principal) {
        model.addAttribute("users", userServiceImpl.getAllUsers());
        model.addAttribute("loginUser", userServiceImpl.findByUsername(principal.getName()));
        model.addAttribute("roles", roleServiceImpl.findAllRoles());
        model.addAttribute("userNew", new User());
        return "admin/showAll";
    }


    @PostMapping
    public String create(@ModelAttribute("user") User user) {
        userServiceImpl.saveUser(user);
        return "redirect:/admin";
    }


    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") User user, @PathVariable("id") long id) {
        userServiceImpl.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") long id) {
        userServiceImpl.deleteUser(userServiceImpl.findUserById(id));
        return "redirect:/admin";
    }
}
