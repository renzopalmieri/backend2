package pe.edu.cibertec.proyemp.model;






import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name="tb_customer_account")
public class Cliente {
	
	
	@Id
	@Column(name="id_customer", nullable = false, unique = true )
//	@GeneratedValue(strategy=GenerationType.SEQUENCE) 
	private Long  id_customer;
	
		
	@Column(name="NM_CUSTOMER", nullable = false, length = 200 )
	private String nm_cliente;	
	
	@Column(name="TIPO_DOCUMENTO", nullable = false, length = 200  )
	private String tipo_documento;	

	@Column(name="CPF_CNPJ", nullable = false, length = 8)
	private String cpf_cnpj;
	
	@Column(name="IS_ACTIVE")
	private boolean is_active;
	
	@Column(name="VL_TOTAL")
	private double vl_total;

	


	





	public Long getId_customer() {
		return id_customer;
	}





	public void setId_customer(Long id_customer) {
		this.id_customer = id_customer;
	}





	public String getNm_cliente() {
		return nm_cliente;
	}





	public void setNm_cliente(String nm_cliente) {
		this.nm_cliente = nm_cliente;
	}


	






	public String getCpf_cnpj() {
		return cpf_cnpj;
	}





	public void setCpf_cnpj(String cpf_cnpj) {
		this.cpf_cnpj = cpf_cnpj;
	}



	public double getVl_total() {
		return vl_total;
	}





	public void setVl_total(double vl_total) {
		this.vl_total = vl_total;
	}





	public String getTipo_documento() {
		return tipo_documento;
	}





	public void setTipo_documento(String tipo_documento) {
		this.tipo_documento = tipo_documento;
	}





	public Cliente() {
	}

	
	
	
	
	public Cliente(String nombre) {
		super();
		this.nm_cliente = nombre;
	}













	public boolean isIs_active() {
		return is_active;
	}





	public void setIs_active(boolean is_active) {
		this.is_active = is_active;
	}







}
