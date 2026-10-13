package Campus_Discovery_Backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import Campus_Discovery_Backend.entity.User;
import Campus_Discovery_Backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // REGISTER USER
    // =========================
    public User registerUser(User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // New users are students by default
        if (user.getRole() == null ||
                user.getRole().isEmpty()) {

            user.setRole("STUDENT");
        }

        return userRepository.save(user);
    }

    // =========================
    // LOGIN USER
    // =========================
    public User loginUser(String email, String password) {

        Optional<User> user =
                userRepository.findByEmail(email);

        if (user.isPresent()) {

            User existingUser = user.get();

            if (existingUser.getPassword().equals(password)) {
                return existingUser;
            }
        }

        throw new RuntimeException("Invalid email or password");
    }

    // =========================
    // RESET PASSWORD
    // =========================
    public void resetPassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Email not registered")
                );

        user.setPassword(newPassword);

        userRepository.save(user);
    }

    // =========================
    // UPDATE USER
    // =========================
    public User updateUser(Long id, User userDetails) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setDepartment(userDetails.getDepartment());

        // Student ID and password are not changed here

        return userRepository.save(user);
    }

    // =========================
    // GET USER BY ID
    // =========================
    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);
    }

    // =========================
    // GET USER BY EMAIL
    // =========================
    public Optional<User> getUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }
}