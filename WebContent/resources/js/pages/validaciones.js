$(function(){
	console.log("HOlaaa");
	var xD=$("#tipCliente").val();
	if(xD=="J"){
		$("#ocultarCampos").show();
	}else{
		$("#ocultarCampos").hide();
	}
	
	if($("#frmLogueo").length>0){
		$("#btnIngresar").click(function(){
			var usu=$("#txtUsuario").val(),pas=$("#txtContrasena").val(),sw=0;
			if(usu==""){mensaje("Ingrese el usuario",0);sw=1;}else{mensaje("",0);}
			if(pas==""){mensaje("Ingrese la clave",1);sw=1;}else{mensaje("",1);}
			if(sw==1) return false;
		});
	}
	
	if($("#frmRegUsu").length>0){
		$("#btnRegistrar").click(function(){
			var rol=$("#cborol-regusu").val(),nom=$("#nombre").val(),pat=$("#apPaterno").val(),mat=$("#apMaterno").val();
			var dni=$("#dni").val(),usu=$("#usuario").val(),tel=$("#telefono").val(),cel=$("#celular").val();
			var mai=$("#correo").val();
			var sw=0;
			if(rol==-1){mensaje("Seleccione el rol",0);sw=1;}else{mensaje("",0);}
			if(nom==""){mensaje("Ingrese el nombre",1);sw=1;}else{mensaje("",1);}
			if(pat==""){mensaje("Ingrese el apellido paterno",2);sw=1;}else{mensaje("",2);}
			if(mat==""){mensaje("Ingrese el apellido materno",3);sw=1;}else{mensaje("",3);}
			if(dni==""||dni.length!=8){mensaje("Ingrese el DNI",4);sw=1;}else{mensaje("",4);}
			if(usu==""){mensaje("Ingrese el usuario",5);sw=1;}else{mensaje("",5);}
			if(tel==""){mensaje("Ingrese el teléfono",6);sw=1;}else{mensaje("",6);}
			if(cel==""){mensaje("Ingrese el celular",7);sw=1;}else{mensaje("",7);}
			if(mai==""||validarMail("#correo")===false){mensaje("El correo no es válido",8);sw=1;}else{mensaje("",8);}
			if(!$("input[type='radio']").is(':checked')){mensaje("Seleccione el estado",9);sw=1;}else{mensaje("",9);}
			if(sw==1) return false;
		});
		soloLetras("#nombre,#apPaterno,#apMaterno");soloNumeros("#dni");soloTelefono("#telefono,#celular");
	}
	
	if($("#frmRegNatural").length>0){
		$("#btnRegistrar").click(function(){
			var nom=$("#nombre").val(),pat=$("#apPaterno").val(),mat=$("#apMaterno").val(),nac=$("#fecNac").val();
			var doc=$("#numDoc").val(),tel=$("#telefono").val(),cel=$("#celular").val();
			var mai=$("#email").val(),dir=$("#direccion").val();tip=$("#tipDoc").val();
			var sw=0;
			if(nom==""){mensaje("Ingrese el nombre",0);sw=1;}else{mensaje("",0);}
			if(pat==""){mensaje("Ingrese el apellido paterno",1);sw=1;}else{mensaje("",1);}
			if(mat==""){mensaje("Ingrese el apellido materno",2);sw=1;}else{mensaje("",2);}
			if(nac==""){mensaje("Ingrese la fecha de nacimiento",3);sw=1;}else{mensaje("",3);}
			if(doc==""){mensaje("Ingrese el numero de documento",5);sw=1;}else{mensaje("",5);}
			if(tel==""){mensaje("Ingrese el teléfono",6);sw=1;}else{mensaje("",6);}
			if(cel==""){mensaje("Ingrese el celular",7);sw=1;}else{mensaje("",7);}
			if(mai==""||validarMail("#correo")===false){mensaje("El correo no es válido",8);sw=1;}else{mensaje("",8);}
			if(dir==""){mensaje("Ingrese La dirección",11);sw=1;}else{mensaje("",11);}
			if(sw==1) return false;
		});
		soloLetras("#nombre,#apPaterno,#apMaterno");soloTelefono("#telefono,#celular");
	}
	if($("#frmRegJuridico").length>0){
		$("#btnRegistrar").click(function(){
			var ruc=$("#nroRUc").val(),raz=$("#razSocial").val();
			var nom=$("#nombre").val(),pat=$("#apPaterno").val(),mat=$("#apMaterno").val(),nac=$("#fecNac").val();
			var doc=$("#numDoc").val(),tel=$("#telefono").val(),cel=$("#celular").val();
			var mai=$("#email").val(),dir=$("#direccion").val();tip=$("#tipDoc").val();
			var sw=0;
			if(ruc==""){mensaje("Ingrese el numero de RUC",0);sw=1;}else{mensaje("",0);}
			if(raz==""){mensaje("Ingrese la razón social",1);sw=1;}else{mensaje("",1);}
			if(nom==""){mensaje("Ingrese el nombre",2);sw=1;}else{mensaje("",2);}
			if(pat==""){mensaje("Ingrese el apellido paterno",3);sw=1;}else{mensaje("",3);}
			if(mat==""){mensaje("Ingrese el apellido materno",4);sw=1;}else{mensaje("",4);}
			if(nac==""){mensaje("Ingrese la fecha de nacimiento",5);sw=1;}else{mensaje("",5);}
			if(doc==""){mensaje("Ingrese el numero de documento",7);sw=1;}else{mensaje("",7);}
			if(tel==""){mensaje("Ingrese el teléfono",8);sw=1;}else{mensaje("",8);}
			if(cel==""){mensaje("Ingrese el celular",9);sw=1;}else{mensaje("",9);}
			if(mai==""||validarMail("#correo")===false){mensaje("El correo no es válido",10);sw=1;}else{mensaje("",10);}
			if(dir==""){mensaje("Ingrese La dirección",13);sw=1;}else{mensaje("",13);}
			if(sw==1) return false;
		});
		soloLetras("#nombre,#apPaterno,#apMaterno");soloNumeros("#nroRUc");soloTelefono("#telefono,#celular");
	}
	
});

function mensaje(msg,obj){
	$(".form-group").eq(obj).removeClass('has-error');
	$(".form-group").eq(obj).find(".alert").remove();
	if(msg!=""){
		$(".form-group").eq(obj).addClass('has-error');
		$(".form-group").eq(obj).append('<div class="alert alert-danger" role="alert" style="padding:2px;font-size:11px;margin-top:5px;"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;'+msg+'</div>');
	}
}
function soloNumeros(txtObj){$(txtObj).keypress(function(e){if(e.which==8||e.which==37||e.which==39) return true;if(/([^0-9]+)/.test(String.fromCharCode(e.which))) return false;});}
function soloTelefono(txtObj){$(txtObj).keypress(function(e){if(e.which==8) return true;if(!/([0-9\(\)#\-\+]+)/.test(String.fromCharCode(e.which))) return false;});}
function validarMail(txtObj){return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test($.trim($(txtObj).val()));}
function soloDecimales(txtObj){$(txtObj).keypress(function(e){if(e.which==8||e.which==37||e.which==39) return true;if(/([^0-9\.]+)/.test(String.fromCharCode(e.which))) return false;});}
function soloLetras(txtObj){$(txtObj).keypress(function(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8) return true;if(tecla==32) return true;if(e.ctrlKey&&tecla==86){return true;};if(e.ctrlKey&&tecla==67){return true;};if(e.ctrlKey&&tecla==88){return true;};patron=/[a-zA-Z]/;te=String.fromCharCode(tecla);return patron.test(te);});}	
function teclaTodo(txtObj){$(txtObj).keypress(function(e){});}