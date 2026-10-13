package Campus_Discovery_Backend.service;

import Campus_Discovery_Backend.entity.Registration;
import Campus_Discovery_Backend.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;

    public RegistrationService(
            RegistrationRepository registrationRepository) {

        this.registrationRepository = registrationRepository;
    }


    public Registration createRegistration(
            Registration registration) {

        return registrationRepository.save(registration);
    }


    public List<Registration> getAllRegistrations() {

        return registrationRepository.findAll();
    }


    public void deleteRegistration(Long id) {

        registrationRepository.deleteById(id);
    }
}