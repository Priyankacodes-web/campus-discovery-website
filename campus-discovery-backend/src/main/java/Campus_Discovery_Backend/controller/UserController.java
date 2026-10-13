package Campus_Discovery_Backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Campus_Discovery_Backend.entity.User;
import Campus_Discovery_Backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    // Constructor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // =========================
    // REGISTER USER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user) {

        try {

            User registeredUser =
                    userService.registerUser(user);

            return ResponseEntity.ok(registeredUser);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    // =========================
    // LOGIN USER
    // =========================
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody User user) {

        try {

            User loggedInUser =
                    userService.loginUser(
                            user.getEmail(),
                            user.getPassword()
                    );

            return ResponseEntity.ok(loggedInUser);

        } catch (RuntimeException e) {

            return ResponseEntity.status(401)
                    .body(e.getMessage());
        }
    }

    // =========================
    // RESET PASSWORD
    // =========================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody User user) {

        try {

            userService.resetPassword(
                    user.getEmail(),
                    user.getPassword()
            );

            return ResponseEntity.ok(
                    "Password reset successful"
            );

        } catch (RuntimeException e) {

            return ResponseEntity.status(404)
                    .body(e.getMessage());
        }
    }

    // =========================
    // UPDATE USER
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User userDetails) {

        try {

            User updatedUser =
                    userService.updateUser(
                            id,
                            userDetails
                    );

            return ResponseEntity.ok(updatedUser);

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =========================
    // GET USER BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id) {

        try {

            User user =
                    userService.getUserById(id)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "User not found"
                                    )
                            );

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // =========================
    // GET USER BY EMAIL
    // =========================
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(
            @PathVariable String email) {

        try {

            User user =
                    userService.getUserByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "User not found"
                                    )
                            );

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }
}
