
//class=\"btn btn-info\"
function filasClienteJquery(cellvalue, options, rowObject){		
	var celda = "<a class=\"btn btn-default\" href=\"javascript:seleccionarFacturaCliente('"+rowObject.idcliente+"','"+rowObject.razonsocial+"', '"+rowObject.paterno+"', '"+rowObject.materno+"', '"+rowObject.nombres+"', '"+rowObject.nombre+"','"+rowObject.idexpediente+"','"+rowObject.nro+"')\">Elegir</a>";	
	return celda;		
}


function seleccionarFacturaCliente(idcliente, razonsocial, paterno, materno, nombres, nombre, idexpediente, nro){				
	
	$("#nombreIdClienteJQUERY").val(idcliente);
	$("#nombreIdExpedienteJQUERY").val(idexpediente);
	$("#nombreExpedienteFacturaJQUERY").val(nombre);
	$("#nombreClienteFacturaJQUERY").val(paterno+" "+materno+" "+nombres);
	$("#nombreNroExpedienteJQUERY").val(nro);
	$('#buscarClienteFactura').modal('hide');
}
