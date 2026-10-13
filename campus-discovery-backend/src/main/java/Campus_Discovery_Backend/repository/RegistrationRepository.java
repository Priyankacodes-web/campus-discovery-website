package Campus_Discovery_Backend.repository;

import Campus_Discovery_Backend.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {
}