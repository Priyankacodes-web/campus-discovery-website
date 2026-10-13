package Campus_Discovery_Backend.service;

import Campus_Discovery_Backend.entity.Club;
import Campus_Discovery_Backend.repository.ClubRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {

    private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    // Get all clubs
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    // Get club by ID
    public Optional<Club> getClubById(Long id) {
        return clubRepository.findById(id);
    }

    // Create club
    public Club createClub(Club club) {
        return clubRepository.save(club);
    }

    // Update club
    public Club updateClub(Long id, Club clubDetails) {

        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        club.setName(clubDetails.getName());
        club.setCategory(clubDetails.getCategory());
        club.setDescription(clubDetails.getDescription());
        club.setCoordinator(clubDetails.getCoordinator());
        club.setMeetingDay(clubDetails.getMeetingDay());
        club.setMeetingTime(clubDetails.getMeetingTime());
        club.setVenue(clubDetails.getVenue());

        return clubRepository.save(club);
    }

    // Delete club
    public void deleteClub(Long id) {
        clubRepository.deleteById(id);
    }
}