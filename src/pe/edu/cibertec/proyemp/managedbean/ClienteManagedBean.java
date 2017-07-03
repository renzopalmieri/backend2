 	package pe.edu.cibertec.proyemp.managedbean;

 	import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import org.joda.time.JodaTimePermission;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.eclipse.persistence.descriptors.SelectedFieldsLockingPolicy;
import org.springframework.data.auditing.CurrentDateTimeProvider;

import com.google.common.collect.Lists;

import pe.edu.cibertec.proyemp.model.Cliente;


import pe.edu.cibertec.proyemp.service.ClienteService;


@ManagedBean
@SessionScoped
public class ClienteManagedBean {
	
	private Cliente cliente  = new Cliente();	
	
	


	boolean bandera = false;

	
	//private Vendedor vendedor = new Vendedor();
		
	
	
	private List<Cliente> clientes = new ArrayList<Cliente>();
	
	//private Sucursal Sucursal = new Sucursal();
	



	
	



	@ManagedProperty(value="#{clienteService}")
	private ClienteService clienteService;
	
	
	
	
	
	
	
	public Cliente getCliente() {
		return cliente;
	}


	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}


	public List<Cliente> getClientes() {
		
		clientes = Lists.newArrayList(clienteService.getClienteRepository().findAll());		

		return clientes;
	}


	public void setClientes(List<Cliente> clientes) {
		this.clientes = clientes;
	}


	public ClienteService getClienteService() {
		return clienteService;
	}


	public void setClienteService(ClienteService clienteService) {
		this.clienteService = clienteService;
	}


	public String registrar(){
		clienteService.getClienteRepository().save(this.cliente);
		double vltotal = cliente.getVl_total();
		int codigo = cliente.getId_customer().intValue();
		double promedio1 = 0;
		int contador = 0;
		
		if(codigo>=1500 && codigo<=2700){
			
			if(vltotal>560){
				System.out.println("Ingreso ultimo codigo");
				promedio1 += vltotal; 
				contador+=1;
				bandera = true;
			}
			
		}
		
		
		if(bandera == true){		
	
		for(Cliente cli: clientes){
			System.out.println("Ingreso");

			int codigo2 = cli.getId_customer().intValue();
			System.out.println("codigo:" + "" + codigo2);

			if(codigo2>=1500 && codigo2<=2700){
				
				if(cli.getVl_total()>560){
					promedio1 +=cli.getVl_total(); 
					contador+=1;
				}
				
			}
			
		}
		
		double resultado = promedio1/contador;
		
		System.out.println("La Media total :" + "" + resultado);
		}
		
		if(bandera == false){
			System.out.println("La Media total :" + "" + vltotal);

		}

		
		
	
//	cliente = new Cliente();
		
		
			
		
		
		return null;
		
		
}
	
	

	
	public String registro1(){
		

		clienteService.getClienteRepository().save(cliente);
		cliente = new Cliente();		
		
		return "clientes";
}
	
	
	
	
	
//	public void modificar(ActionEvent ae) {
		
		
		
		
		/*
		
		Integer codigo = Integer.valueOf(ae.getComponent().getAttributes().get("codigo").toString());
		this.vendedor = VendedorService.findById(codigo);
		
		
		*/
//	}
	
	public String modificar(){
		
		
		
		//String dni = this.cliente.getCli_numero();
		
		
		
		this.cliente = this.clienteService.getClienteRepository().getClienteporDNI(this.cliente.getCpf_cnpj());
		
		//this.cliente = this.clienteService.getClienteRepository().getClienteporDNI(dni);
		
		
		//cliente = new Cliente();		
		
		
		return "modificarCliente";
		
		
	}
	
	
	public String eliminar(){
		
		clienteService.getClienteRepository().delete(this.cliente);

		return "clientes";
		
		
	}
	
	
	
	
	
/*	public void eliminar(ActionEvent ae) {

		String result = "";
		
		try {
			result = VendedorService.eliminar();

			if (result == "1") {
				result = "Se elimino los datos del vendedor";
			} else {
				result = "No elimino los datos del vendedor";
			}
		} catch (Exception e) {
			result = e.getMessage();
		}
		FacesContext.getCurrentInstance().addMessage("Suceso",
				new FacesMessage(FacesMessage.SEVERITY_INFO, result, ""));
	}*/






	
	



	

	
	
	
}
