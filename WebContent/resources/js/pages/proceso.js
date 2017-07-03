


$(function() {
	
	$("#btnIdAgregarActividad").on("click",function(){
		var algo=  $("#frmActividad").serialize();
		console.log(algo);
		console.log("llegue aca");
		$.ajax({
			type: "post",
			url: "a_almacenarGrillaAJAX",
			//enviar datos como formato url
			data: $("#frmActividad").serialize(),
			// carpura el formato JSON de Action
			success: function(respuesta) {
				console.log("Lo que seaa"+respuesta.actividad);
				console.log(respuesta.actividades);
				//limpiar la tabla al listar
				$("#idTablaActividad").find("tr:gt(0)").remove();
				$.each(respuesta.actividades,function(key, value){
					$("#idAlmacenarActividad").append('<tr><td>'+value.idactividad	
							+'</td><td>'+
							value.nombre
							+'</td><td>'+
							value.roltrabajador
							+'</td><td>'+
							value.costoporcentaje
							+'</td><td>'+
							value.tiempo
							+'</td><td>'+
							"<button type=button class='btn btn-info' onclick=funcionBorrarActividad(this) value="+value.idactividad+">Borrar actividad</button>"
							+'</td></tr>');
				});
				
				$("#nombreActividad").val("");
				$("#rolTrabajador").val("");
				$("#costoActividad").val("");
				$("#tiempoActividad").val("");
				
				construirDiagrama(respuesta.actividades);
				
			}, error: function(respuesta) {
				console.log(respuesta.responseJSON.mensajesErrorActividades);
				console.log(respuesta.responseJSON);
				$("#mensajesErrorAJAX").text(respuesta.responseJSON.mensajesErrorActividades);
			}
		
		});
		
	});
	
	
});

function funcionBorrarActividad(objBotonBorrarActividad) {
	console.log(objBotonBorrarActividad);
	var id=objBotonBorrarActividad.value;
	console.log(id);
	
	$.ajax({
		type: "post",
		url: "a_borrarActividadAJAX",
		data: {idactividad: id},
		success: function(respuesta) {
			console.log("Lo que sea "+respuesta.actividad);
			console.log(respuesta);
			console.log(respuesta.actividades);
			//limpiar la tabla al listar
			$("#idTablaActividad").find("tr:gt(0)").remove();
			$.each(respuesta.actividades,function(key, value){
				$("#idAlmacenarActividad").append('<tr><td>'+value.idactividad	
						+'</td><td>'+
						value.nombre
						+'</td><td>'+
						value.costoporcentaje
						+'</td><td>'+
						value.tiempo
						+'</td><td>'+
						value.roltrabajador
						+'</td><td>'+
						"<button type=button class='btn btn-info' onclick=funcionBorrarActividad(this) value="+value.idactividad+">Borrar actividad</button>"
						+'</td></tr>');
			});
		}
		
	});
	
}



function construirDiagrama(actividades){
	
	textJsonDriagram =
		'{"class": "go.GraphLinksModel",' +
		'"linkFromPortIdProperty": "fromPort",' +
		'"linkToPortIdProperty": "toPort",' +
		'"nodeDataArray": [';
	
	textJsonDriagram += '{"key":-1, "category":"Start", "loc":"0 0", "text":"Start"},';
			
	$.each(actividades,function(key, value){
		textJsonDriagram += '{"key":'+ value.idactividad +', "loc":"0 '+ value.idactividad * 80 +'", "text":"'+ value.nombre +'"},';
	});
	
	var endPosition = actividades.length * 80 + 100;
	
	textJsonDriagram += '{"key":-2, "category":"End", "loc":"0 '+ endPosition +'", "text":"Enjoy!"}';

	textJsonDriagram += '],';
	
	textJsonDriagram += '"linkDataArray": [';
	
	if(actividades.length > 0){	
		textJsonDriagram += '{"from":-1, "to":1, "fromPort":"B", "toPort":"T"},';
		$.each(actividades,function(key, value){
			if(key + 1 < actividades.length){
				var to = value.idactividad + 1;
				textJsonDriagram += '{"from":'+ value.idactividad +', "to":' + to +', "fromPort":"B", "toPort":"T"},';
			}
		});		
		textJsonDriagram += '{"from":'+ actividades.length +', "to":-2, "fromPort":"B", "toPort":"T"}';
	}
	else{
		textJsonDriagram += '{"from":-1, "to":-2, "fromPort":"B", "toPort":"T"}';        
	}        
         
    textJsonDriagram +=']}';     
     
    console.log(textJsonDriagram);
	
	loadDiagram();
}








