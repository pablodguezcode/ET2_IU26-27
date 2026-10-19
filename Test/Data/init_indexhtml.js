switch_display_mode('div-menu','block','off');
switch_display_mode('form','block','off');


//preguntar lo de tests


(function(){
   	var clases = {persona: persona, usuario: usuario, funcionalidad_accion: funcionalidad_accion, rol: rol, accion: accion};
   	var nombre = new URLSearchParams(window.location.search).get('entidad');
   	if (nombre in clases){
   		var entidad = new Data_Test(clases[nombre]);
   	}
   })();