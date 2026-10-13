package Campus_Discovery_Backend.controller;

import Campus_Discovery_Backend.entity.Registration;
import Campus_Discovery_Backend.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService) {

        this.registrationService = registrationService;
    }


    @PostMapping
    public Registration createRegistration(
            @RequestBody Registration registration) {

        return registrationService.createRegistration(registration);
    }


    @GetMapping
    public List<Registration> getAllRegistrations() {

        return registrationService.getAllRegistrations();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(
            @PathVariable Long id) {

        registrationService.deleteRegistration(id);

        return ResponseEntity.noContent().build();
    }
}
