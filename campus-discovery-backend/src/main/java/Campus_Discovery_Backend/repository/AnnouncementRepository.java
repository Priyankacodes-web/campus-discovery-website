package Campus_Discovery_Backend.repository;

import Campus_Discovery_Backend.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository
        extends JpaRepository<Announcement, Long> {
}