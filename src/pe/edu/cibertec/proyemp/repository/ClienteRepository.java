package pe.edu.cibertec.proyemp.repository;

import java.util.List;

import javax.persistence.UniqueConstraint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sun.xml.internal.bind.v2.model.core.ID;

import pe.edu.cibertec.proyemp.model.Cliente;

@Repository
public interface ClienteRepository 

     extends CrudRepository<Cliente,Long> {
	
	

	
	@Query(" SELECT COUNT(e.id_customer) FROM Cliente e")
	public long  contador();
	

	@Query("select e from Cliente e where e.cpf_cnpj like :cpf_cnpj")
	public Cliente getClienteporDNI(@Param("cpf_cnpj") String cpf_cnpj);
	
	
}
