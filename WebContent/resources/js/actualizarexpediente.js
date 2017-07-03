$(function(){
	
	llenaTabla();
	
	$("#divActualizador").hide();
	$("#mensajeserver").hide();
	$("#actexpObservacion").val("");
	$("#actexpDescripcion").val("");

	$("#btnCerrar").on("click",function(){
		$("#actexpObservacion").val("");
		$("#actexpResponsable").val("");
		$("#actexpDescripcion").val("");
		$("#archivo").val("");
		$("#hidarchivo").val("");
	});
	
	$("#btnActualizarExpediente").on("click",function(e){
		
		$.ajax({
			
			type : "post",
			url  : "a_actualizaActividadXexpediente",
			data : $("#frmActualizaActExp").serialize(),
			beforeSend : function(){
				$("#mensajeserver").hide('slow');
			},
			success :function(data){
				$("#tblLstActividadesxExpediente").dataTable().fnDestroy();
				$("#tblLstActividadesxExpediente").find("tr:gt(0)").remove();
				$.each(data.lstExpAct,function(key,value){
					$('#tblLstActividadesxExpediente tbody').append("<tr>" +
							"<td>"+value.idactividad+"</td>"+	
							"<td>"+value.fecha+"</td>"+
							"<td>"+value.costocash+"</td>"+
							"<td>"+regresaEstado(value.estado)+"</td>"+
							"<td>"+value.observacion+"</td>"+
							"<td>"+value.descripciontarea+"</td>"+
							"<td>"+value.achivoname+"</td>"+
							"<td>"+value.responsableact+"</td>"+
							"<td><button type=button onClick=muestraDatos("+value.idexpedienteactividad+") class='btn btn-sm btn-primary'> Actualizar" +
							"</button></td>"+
						 "</tr>");
				});
				
				$("#actexpObservacion").val("");
				$("#actexpResponsable").val("");
				$("#actexpDescripcion").val("");
				$("#archivo").val("");
				$("#hidarchivo").val("");
				
			},
			error : function(data){
				console.log(data);
				$("#mensajeserver").html("");
				var mensajes = (data.responseJSON.mensajesServer);
				var mensajesArray = mensajes.toString().split(",");
				
				for (var i = 0; i < mensajesArray.length; i++) {
					$("#mensajeserver").append(mensajesArray[i]+"<br>");
				}
				
				$("#mensajeserver").addClass("alert alert-danger");
				$("#mensajeserver").show('slow');
			}
			
		});
		
	});
	
     
});


function llenaTabla(){
	
	$.ajax({
		type : "post",
		url  : "a_obtieneListaExpediente",
		beforeSend: function(){
			$("#tblActividades").dataTable().fnDestroy();
		},
		success: function(data){
			
			$("#tblActividades").find("tr:gt(0)").remove();
			
			$.each(data.lstExpediente,function(key,value){
				$('#tblActividad tbody').append("<tr>" +
						"<td>"+value.idexpediente+"</td>"+	
						"<td>"+value.nro+"</td>"+
						"<td>"+value.costo+"</td>"+
						"<td>"+value.fechacreacion+"</td>"+
						"<td><button type=button class='btn btn-sm btn-primary' " +
							 "onclick='muestraModal("+value.idexpediente+")'> Ver actividades</button>" + //
						"</td>"+
					 "</tr>");
			});
			
			$("#tblActividad").DataTable({
				"language": {
					"search":         "Filtrar:",
		            "lengthMenu": "Mostrar _MENU_ resultados por pagina",
		            "zeroRecords": "No se encontraron resultados",
		            "info": "Mostrando pagina _PAGE_ de _PAGES_",
		            "infoEmpty": " ",
		            "paginate": {
		                "first":      "Primero",
		                "last":       "Ultimo",
		                "next":       "Sgte.",
		                "previous":   "Ant."
		            }
		        }
			});
		},
		error : function(data){
			
		}
	});
	
}


function muestraModal(idExpediente){
	
	$("#myModalLabel").text("Actividades del expediente "+idExpediente);
	$("#modalActividadesXexpediente").modal("show");
	
	$.ajax({
		
		type : "post",
		url  : "a_obtieneActividadesxExpediente",
		data : {idExpediente:idExpediente},
		beforeSend :function(){
			$("#tblLstActividadesxExpediente").dataTable().fnDestroy();
		},
		success :function(data){
			console.log(data);
			$("#tblLstActividadesxExpediente").find("tr:gt(0)").remove();
			$.each(data.lstExpAct,function(key,value){
				$('#tblLstActividadesxExpediente tbody').append("<tr>" +
						"<td>"+value.idactividad+"</td>"+	
						"<td>"+value.fecha+"</td>"+
						"<td>"+value.costocash+"</td>"+
						"<td>"+regresaEstado(value.estado)+"</td>"+
						"<td>"+value.observacion+"</td>"+
						"<td>"+value.descripciontarea+"</td>"+
						"<td>"+value.achivoname+"</td>"+
						"<td>"+value.responsableact+"</td>"+
						"<td><button type=button onClick=muestraDatos("+value.idexpedienteactividad+","+key+") class='btn btn-sm btn-primary'> Actualizar" +
						"</button></td>"+
					 "</tr>");
			});
		},
		error : function(data){
			
		}
		
	});
	
}

function muestraDatos(idexpedienteactividad,llave){

	$("#divActualizador").show('slow');
	
	$.ajax({
		
		type: "post",
		url : "a_datosexpact",
		data: {idexpedienteactividad:idexpedienteactividad},
		success : function(data){
			
			$("#actexpObservacion").val(data.expact.observacion);
			$("#actexpResponsable").val(data.expact.responsableact);
			$("#actexpDescripcion").val(data.expact.descripciontarea);
			$("#archivo").val("");
			$("#hidarchivo").val("");
			
			$("#legendtitle").text("Datos a actualizar de la actividad "+(llave+1));
			
		}
		
	});
	
}

function regresaEstado (estado){
	
	if(estado == "P"){
		return "<label class='label label-danger'>Pendiente</label>";
	}else{
		return "<label class='label label-primary'>En proceso</label>";
	}
	
}




var handleFileSelect2 = function(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;

            var vfoto = $('#archivo').val();
            var fileName = vfoto.match(/[^\/\\]+$/);
            
            //SE SETEA EN EL INPUT OCULTO LA DATA QUE SE RECIBE DEL INPUT FILE
            document.getElementById("hidarchivo").value = fileName+','+btoa(binaryString);

            var asd2= document.getElementById("hidarchivo").value ;
            
        };
        reader.readAsBinaryString(file);
        
    }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('archivo').addEventListener('change', handleFileSelect2, false);
} else {
    alert('Este navegador no soporta la funcionalidad de pagina. Actualizelo o use otro como Chrome.');
}
