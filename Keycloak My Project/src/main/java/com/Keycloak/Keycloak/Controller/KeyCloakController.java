package com.Keycloak.Keycloak.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/key-cloak")
public class KeyCloakController {

    @GetMapping("/greet")
    @PreAuthorize("hasRole('client_admin')")
    public String greet() {
        return "greet";
    }

    @GetMapping("/hello")
    @PreAuthorize("hasRole('client_user')")
    public String hello() {
        return "hello";
    }
}
