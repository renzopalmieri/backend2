var tipoCliente = '';
var idExpedienteActividadSelected = '';

//class=\"btn btn-info\"
function formatSelProceso(cellvalue, options, rowObject){		
	var htmlLink = "<a class=\"btn btn-default\" href=\"javascript:SeleccionarProceso('"+rowObject.idproceso+"', '"+rowObject.nombre+"')\">Seleccionar Proceso</a>";	
	return htmlLink;		
}

function SeleccionarProceso(id, nombre){				
	$("#NomProceso").val(nombre);
	$("#txtIdProcesoHidden").val(id);
	$('#busPro').modal('hide');
}

function formatSelResponsable(cellvalue, options, rowObject){		
	var htmlLink = "<a class=\"btn btn-default\" href=\"javascript:SeleccionarResponsable('"+rowObject.idusuario+"', '"+rowObject.nombres+"', '"+rowObject.paterno+"', '"+rowObject.materno+"')\">Seleccionar</a>";	
	return htmlLink;		
}

function SeleccionarResponsable(id, nombre, paterno, materno){				
	$("#NomRes").val(nombre + " " + paterno + " " + materno);
	$("#txtIdResponsableHidden").val(id);	
	$('#busRes').modal('hide');
}

function formatSelCliente(cellvalue, options, rowObject){		
	var htmlLink = "<a class=\"btn btn-default\" href=\"javascript:SeleccionarCliente('"+rowObject.idcliente+"', '"+rowObject.nombres+"', '"+rowObject.paterno+"', '"+rowObject.materno+"', '"+rowObject.nrodocumento+"')\">Seleccionar</a>";	
	return htmlLink;		
}

function SeleccionarCliente(id, nombre, paterno, materno, nrodocumento){
	var newRowContent = '<tr>';
	newRowContent+= '<td class="codigo" idCliente='+ id +'>' + id + '</td>';
	newRowContent+= '<td>' + tipoCliente + '</td>';
	newRowContent+= '<td>' + nombre + '</td>';
	newRowContent+= '<td>' + paterno + '</td>';
	newRowContent+= '<td>' + materno + '</td>';
	newRowContent+= '<td>' + nrodocumento + '</td>';
	newRowContent+= '<td><a href="#" class="btn btn-info btn-xs" onclick="EliminarCliente(this, \'' + tipoCliente  + '\')">Eliminar</a></td>';
	newRowContent+= '</tr>';
	
	if(tipoCliente == 'E')
		AgregarDemandante(newRowContent, id);
	else
		AgregarDemandado(newRowContent, id);
	
	$('#busCliente').modal('hide');
}

function AgregarDemandante(newRowContent, id){
	var existe = ClienteFueAgregado(id);
	 
	if(!existe)
	{
		$("#demandanteTbl tbody").append(newRowContent).fadeIn(1000);
		$("#txtIdDemandantesHidden").val($("#txtIdDemandantesHidden").val() + id + ","); 
	}
}

function AgregarDemandado(newRowContent, id){
	var existe = ClienteFueAgregado(id);
	 
	if(!existe)
	{
		$("#demandadoTbl tbody").append(newRowContent).fadeIn(1000); 
		$("#txtIdDemandadosHidden").val($("#txtIdDemandadosHidden").val() + id + ",");
	}
}

function OpenBuscarCliente(tipo){	
	tipoCliente = tipo;
	$('#busCliente').modal('show');
}

function ClienteFueAgregado(id){
	var existe = false;
	$("#demandanteTbl .codigo").each(function( index, element ) {
		var idCliente = $(element).attr('idcliente');
		if(idCliente == id) existe = true;
	 });
	$("#demandadoTbl .codigo").each(function( index, element ) {
		var idCliente = $(element).attr('idcliente');
		if(idCliente == id) existe = true;
	 });
	return existe;
}

function EliminarCliente(element, tipoCliente){	
	var tr = $(element).closest('tr');
	
	if(tipoCliente == 'E'){	
		var $txtIdDemandantesHidden =  $("#txtIdDemandantesHidden");	
		var idCliente = $(tr).find("td:first").html();	
		$txtIdDemandantesHidden.val($txtIdDemandantesHidden.val().replace(idCliente + ",", ""));	
	}else{	
		var $txtIdDemandadosHidden =  $("#txtIdDemandadosHidden");	
		var idCliente = $(tr).find("td:first").html();	
		$txtIdDemandadosHidden.val($txtIdDemandadosHidden.val().replace(idCliente + ",", ""));	
	}		
	
    tr.fadeOut(500, function(){
        tr.remove();
    });
    
    return false;
}

function ValidarRegistro(){	
	
	$("#txtNumeroHidden").val($("#NroExpediente").val());
	$("#txtCostoHidden").val($("#CostoTotal").val());
	
	if($("#txtIdProcesoHidden").val() == '0'){
		alert('Seleccione un proceso.');
		return false;
	}
	
	if($("#txtIdResponsableHidden").val() == '0'){
		alert('Seleccione un responsable.');
		return false;
	}
	
	if($("#txtIdDemandantesHidden").val() == ''){
		alert('Seleccione al menos un demandante.');
		return false;
	}
	
	if($("#txtIdDemandadosHidden").val() == ''){
		alert('Seleccione al menos un demandado.');
		return false;
	}
	
	$("#txtCostoHidden").val("0");
	
	var respuesta = confirm("¿Desea registrar este expediente?");
	if (respuesta == true) {
	    return true;
	}
	
	return false;
}

function ValidarActualizar(){
	
	$("#txtCostoHidden").val($("#cosTotal").val());
	
}

function SetupEnterCostoTotal(){
	
	$("#cosTotal").on("input", function() {
		  var costoTotal = this.value;
		  console.log(costoTotal);
		  calcularCostoPorActividad(costoTotal);		  
	});
	
	$("#cosTotal").ForceNumericOnly();
}

function calcularCostoPorActividad(costoTotal){	
	
	  var porcentajeTags = $("input[id^='porcentaje_']");
	  var costoLabelTags = $("div[id^='costoLabel_']");   
	  
	  $.each(porcentajeTags, function(i, porcentajeTag) {			  	
		  	
		  	var idexpactPorcentaje = getExpedienteActividadId($(porcentajeTag).attr("id"));
		  	
		  	 $.each(costoLabelTags, function(j, costoLabelTag) {		  		 
		  		 
		  		 var idexpactCosto = getExpedienteActividadId($(costoLabelTag).attr("id"));
		  		 
		  		 if(idexpactPorcentaje == idexpactCosto){
		  			 var costoParcial = costoTotal * porcentajeTag.value / 100; 
		  			$(costoLabelTag).html(costoParcial);
		  		 }			  		
		  	 });
	 });
}

function seleccionarExpedienteActividad(id){
	
	idExpedienteActividadSelected = id;
	$("#nomAct").val($("#actividad_"+id).val());
	$("#obs").val($.trim($("#observacion_"+id).html()));
	$("#nomResp").val($.trim($("#responsable_"+id).html()));
	$("#tarea").val($.trim($("#tarea_"+id).html()));
	$("#estado").val($.trim($("#estadoLabel_"+id).html()));
}

function actualizarExpedienteActividad(){
	
	if(idExpedienteActividadSelected == ''){
		alert('Seleccionar una actividad');
		return;
	}
	
	id = idExpedienteActividadSelected;
	
	$("#responsable_"+id).html($("#nomResp").val());
	$("#observacion_"+id).html($("#obs").val());
	$("#tarea_"+id).html($("#tarea").val());
	$("#estadoLabel_"+id).html($("#estado").val());
	
	var data = {'expedienteActividadItem.idexpedienteactividad':id,
				'expedienteActividadItem.observacion': $("#obs").val(),
				'expedienteActividadItem.responsableact': $("#nomResp").val(),
				'expedienteActividadItem.costocash': $("#costoLabel_"+id).html(),
				'expedienteActividadItem.descripciontarea': $("#tarea").val(),
				'expedienteActividadItem.descripcionEstado': $("#estado").val()};
	
	$.ajax({
		type: "post",		
		url: "a_actualizarExpedienteActividadJson",
		traditional: true,
		data: data,
		success: function(respuesta) {
			console.log("success");
		}		
	});	
}

function getExpedienteActividadId(labelCodigo){
	var array = labelCodigo.split("_");
	return array[1]; 
}



jQuery.fn.ForceNumericOnly =
	function()
	{
	    return this.each(function()
	    {
	        $(this).keydown(function(e)
	        {
	            var key = e.charCode || e.keyCode || 0;
	            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
	            // home, end, period, and numpad decimal
	            return (
	                key == 8 || 
	                key == 9 ||
	                key == 13 ||
	                key == 46 ||
	                key == 110 ||
	                key == 190 ||
	                (key >= 35 && key <= 40) ||
	                (key >= 48 && key <= 57) ||
	                (key >= 96 && key <= 105));
	        });
	    });
	};