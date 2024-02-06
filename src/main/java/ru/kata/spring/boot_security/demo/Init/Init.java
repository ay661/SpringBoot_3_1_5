package ru.kata.spring.boot_security.demo.Init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.HashSet;
import java.util.Set;

@Component
public class Init implements ApplicationListener<ContextRefreshedEvent> {

    private final RoleServiceImpl roleServiceImpl;
    private final UserServiceImpl userServiceImpl;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public Init(RoleServiceImpl roleServiceImpl, UserServiceImpl userServiceImpl, PasswordEncoder passwordEncoder) {
        this.roleServiceImpl = roleServiceImpl;
        this.userServiceImpl = userServiceImpl;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Role userRole = new Role(1L, "USER");
        if (roleServiceImpl.getByName("ROLE_USER") == null) {
            roleServiceImpl.save(userRole);
        }
        Role adminRole = new Role(2L, "ADMIN");
        if (roleServiceImpl.getByName("ROLE_ADMIN") == null) {
            roleServiceImpl.save(adminRole);
        }

        if (userServiceImpl.findByUsername("admin") == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin");
            admin.setAge(33L);
            admin.setEmail("admin@mail.ru");
            Set<Role> role = new HashSet<>();
            role.add(adminRole);
            admin.setRoles(role);
            userServiceImpl.saveUser(admin);
        }

        if (userServiceImpl.findByUsername("user") == null) {
            User user = new User();
            user.setUsername("user");
            user.setPassword("user");
            user.setAge(25L);
            user.setEmail("user@mail.ru");
            Set<Role> role = new HashSet<>();
            role.add(userRole);
            user.setRoles(role);
            userServiceImpl.saveUser(user);
        }

        if (userServiceImpl.findByUsername("1") == null) {
            User user = new User();
            user.setUsername("1");
            user.setPassword("1");
            user.setAge(1L);
            user.setEmail("test@mail.ru");
            Set<Role> role = new HashSet<>();
            role.add(userRole);
            user.setRoles(role);
            userServiceImpl.saveUser(user);
        }
    }
}
