package Campus_Discovery_Backend.service;

import Campus_Discovery_Backend.entity.Announcement;
import Campus_Discovery_Backend.repository.AnnouncementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(
            AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public Optional<Announcement> getAnnouncementById(Long id) {
        return announcementRepository.findById(id);
    }

    public Announcement createAnnouncement(
            Announcement announcement) {
        return announcementRepository.save(announcement);
    }

    public Announcement updateAnnouncement(
            Long id,
            Announcement announcementDetails) {

        Announcement announcement =
                announcementRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Announcement not found"));

        announcement.setTitle(
                announcementDetails.getTitle());

        announcement.setCategory(
                announcementDetails.getCategory());

        announcement.setDescription(
                announcementDetails.getDescription());

        announcement.setDate(
                announcementDetails.getDate());

        return announcementRepository.save(announcement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }
}