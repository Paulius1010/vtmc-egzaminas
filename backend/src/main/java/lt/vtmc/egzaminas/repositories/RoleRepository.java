package lt.vtmc.egzaminas.repositories;

import lt.vtmc.egzaminas.models.ERole;
import lt.vtmc.egzaminas.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(ERole name);

}
