package Campus_Discovery_Backend.repository;

import Campus_Discovery_Backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}