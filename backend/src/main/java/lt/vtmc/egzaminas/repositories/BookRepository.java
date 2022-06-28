package lt.vtmc.egzaminas.repositories;

import lt.vtmc.egzaminas.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
