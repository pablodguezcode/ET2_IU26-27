class persona {

	constructor(esTest){
		
		this.dom = new dom();
		this.validations = new Validations();
		this.access_functions = new ExternalAccess();

		this.columnasamostrar = ['dni','nombre_persona', 'apellidos_persona', 'fechanacimiento_persona',
			'direccion_persona','telefono_persona', 'email_persona','foto_persona', 'nuevo_foto_persona' ];
		this.mostrarespecial = ['foto_persona', 'nuevo_foto_persona'];
		this.nombreentidad = 'persona';

		//init
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';
			
			//crear el formulario vacio
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();

			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}

	}	

	/**
	 * replace the content of section element with a particular entity menu
	 * @returns 
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="http://193.147.87.202/procesaform.php" method="POST" enctype="multipart/form-data" onsubmit="return entidad.ADD_submit_persona();">

			<label class="label_dni">dni</label>
			<input type='text' id='dni' name='dni' onblur=" return entidad.ADD_dni_validation();"></input>
			<span id="span_error_dni"><a id="error_dni"></a></span>
			<br>
			
			<label class="label_nombre_persona">Nombre de pila</label>
			<input type='text' id='nombre_persona' name='nombre_persona' onblur=" return entidad.ADD_nombre_persona_validation();"></input>
			<span id="span_error_nombre_persona" ><a id="error_nombre_persona"></a></span>
			<br>
			
			<label class="label_apellidos_persona">apellidos</label>
			<input type='text' id='apellidos_persona' name='apellidos_persona' onblur=" return entidad.ADD_apellidos_persona_validation();"></input>
			<span id="span_error_apellidos_persona" ><a id="error_apellidos_persona"></a></span>
			<br>
			
			<label class="label_fechanacimiento_persona">Fecha de Nacimiento</label>
			<input type='text' id='fechanacimiento_persona' name='fechanacimiento_persona' onblur=" return entidad.ADD_fechanacimiento_persona_validation();"></input>
			<span id="span_error_fechanacimiento_persona" ><a id="error_fechanacimiento_persona"></a></span>
			
			<br>
			<label class="label_direccion_persona">Dirección Postal</label>
			<textarea rows="5" cols="33" type='text' id='direccion_persona' name='direccion_persona' onblur=" return entidad.ADD_direccion_persona_validation();"></textarea>
			<span id="span_error_direccion_persona" ><a id="error_direccion_persona"></a></span>
			<br>

			<label class="label_telefono_persona">Teléfono Persona</label>
			<input type='text' id='telefono_persona' name='telefono_persona' onblur=" return entidad.ADD_telefono_persona_validation();"></input>
			<span id="span_error_telefono_persona" ><a id="error_telefono_persona"></a></span>
			
			<br>
			<label class="label_email_persona">Correo Electronico</label>
			<input type='text' id='email_persona' name='email_persona' onblur=" return entidad.ADD_email_persona_validation();"></input>
			<span id="span_error_email_persona" ><a id="error_email_persona"></a></span>

			<br>
			<label id="label_foto_persona" class="label_foto_persona">Foto Persona</label>
			<input type='text' id='foto_persona' name='foto_persona' onblur=" return entidad.ADD_foto_persona_validation();"></input>
			<span id="span_error_foto_persona"><a id="error_foto_persona"></a></span>
			<a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/"><img src="./iconos/FILE.png" /></a>
			
			<label id="label_nuevo_foto_persona" class="label_nuevo_foto_persona">Nueva Foto Persona</label>
			<input type='file' id='nuevo_foto_persona' name='nuevo_foto_persona' onblur=" return entidad.ADD_nuevo_foto_persona_validation();"></input>
			<span id="span_error_nuevo_foto_persona"><a id="error_nuevo_foto_persona"></a></span>
			<br>

			<input id="submit_button" type="submit" value="Submit">

		</form>
		`;
		return form_content;
		
	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/

//Atributo dni

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_dni_validation(){
		
		if (!(this.validations.min_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_min_size_ko');
			return "dni_min_size_ko";
		}
		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_ko');
			return "dni_max_size_ko";
		}	
		if (!(this.validations.format('dni', '^[0-9]{8}[A-Z]$'))){
			this.dom.mostrar_error_campo('dni','dni_format_ko');
			return "dni_format_ko";
		}
		if (!(this.dni_personalize_validation('dni'))){
			this.dom.mostrar_error_campo('dni','dni_personalize_validate_dni_ko');
			return "dni_personalize_validate_dni_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	//Retorna true si el campo es valido, si no devuelve false
	dni_personalize_validation(dni){
		
		dni = document.getElementById('dni').value;
		var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    	var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
		
    	return letter == dni.charAt(8);
	} 

//Atributo nombre_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_nombre_persona_validation(){
		
		if (!(this.validations.min_size('nombre_persona',2))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_min_size_ko');
			return "nombre_persona_min_size_ko";
		}
		if (!(this.validations.max_size('nombre_persona',45))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_ko');
			return "nombre_persona_max_size_ko";
		}
		// Se permiten letras mayúsculas y minúsculas, con acentos y ñ
		if (!(this.validations.format('nombre_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]*$'))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_format_ko');
			return "nombre_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('nombre_persona');
		return true;
	}

//Atributo apellidos_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_apellidos_persona_validation(){
		
		if (!(this.validations.min_size('apellidos_persona',3))){
			this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_min_size_ko');
			return "apellidos_persona_min_size_ko";
		}
		if (!(this.validations.max_size('apellidos_persona',100))){
			this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_max_size_ko');
			return "apellidos_persona_max_size_ko";
		}
		// Se permiten letras mayúsculas y minúsculas, con acentos y ñ
		if (!(this.validations.format('apellidos_persona', '^[A-Za-zÁÉÍÓÚáéíóúñÑ]*$'))){
			this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_format_ko');
			return "apellidos_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('apellidos_persona');
		return true;
	}

//Atributo fechanacimiento_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_fechanacimiento_persona_validation(){
		
		if (!(this.validations.min_size('fechanacimiento_persona',8))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_min_size_ko');
			return "fechanacimiento_persona_min_size_ko";
		}
		if (!(this.validations.max_size('fechanacimiento_persona',10))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_max_size_ko');
			return "fechanacimiento_persona_max_size_ko";
		}
		//Formatos válidos: dd/mm/yyyy, d/m/yyyy, dd/m/yyyy, d/mm/yyyy
		if (!(this.validations.format('fechanacimiento_persona', '^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/(19|20)\\d\\d$'))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_format_ko');
			return "fechanacimiento_persona_format_ko";
		}
		//verificar que la fecha sea válida y no esté en el futuro
		if (!(this.fechanacimiento_personalize_validation('fechanacimiento_persona'))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_personalize_validate_ko');
			return "fechanacimiento_persona_personalize_validate_ko";
		}
		this.dom.mostrar_exito_campo('fechanacimiento_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	fechanacimiento_personalize_validation(fecha) {

		fecha = document.getElementById('fechanacimiento_persona').value;

		const [dia, mes, anio] = fecha.trim().split('/').map(Number);
		const fechaIntroducida = new Date(anio, mes - 1, dia);

		const hoy = new Date();
		hoy.setHours(0, 0, 0, 0);

		// Existe: JS corrige fechas imposibles (31/02 -> 03/03), así que comparamos (los meses empiezan en 0)
		const existe = fechaIntroducida.getFullYear() === anio &&
					fechaIntroducida.getMonth() === mes - 1 &&
					fechaIntroducida.getDate() === dia;
		// No es posterior a hoy (solo fecha, sin horas)
		const noFutura = fechaIntroducida <= hoy;

		return existe && noFutura;
	}

//Atributo direccion_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_direccion_persona_validation(){
		
		if (!(this.validations.min_size('direccion_persona',10))){
			this.dom.mostrar_error_campo('direccion_persona','direccion_persona_min_size_ko');
			return "direccion_persona_min_size_ko";
		}
		if (!(this.validations.max_size('direccion_persona',200))){
			this.dom.mostrar_error_campo('direccion_persona','direccion_persona_max_size_ko');
			return "direccion_persona_max_size_ko";
		}
		//Formato valido: tetras incluido ñ y acentos, numeros, ".", "-", ";", "/" y espacios
		if (!(this.validations.format('direccion_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ0-9 .\\-;/]*$'))) {
			this.dom.mostrar_error_campo('direccion_persona', 'direccion_persona_format_ko');
			return "direccion_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('direccion_persona');
		return true;
	}

//Atributo telefono_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_telefono_persona_validation(){
		
		if (!(this.validations.min_size('telefono_persona',9))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_min_size_ko');
			return "telefono_persona_min_size_ko";
		}
		if (!(this.validations.max_size('telefono_persona',9))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_max_size_ko');
			return "telefono_persona_max_size_ko";
		}
		//Formato valido: 9 dígitos, solo números
		if (!(this.validations.format('telefono_persona', '^[0-9]{9}$'))) {
			this.dom.mostrar_error_campo('telefono_persona', 'telefono_persona_format_ko');
			return "telefono_persona_format_ko";
		}
		//Verificar que el primer dígito sea 6, 7, 8 o 9 (teléfonos españoles)
		if (!(this.telefono_personalize_validation('telefono_persona'))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_personalize_validate_ko');
			return "telefono_persona_personalize_validate_ko";
		}
		this.dom.mostrar_exito_campo('telefono_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	telefono_personalize_validation(telefono) {

		telefono = document.getElementById('telefono_persona').value;

		return ['6', '7', '8', '9'].includes(telefono.trim().charAt(0));
	}

//Atributo email_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_email_persona_validation(){
		
		if (!(this.validations.min_size('email_persona',1))){
			this.dom.mostrar_error_campo('email_persona','email_persona_min_size_ko');
			return "email_persona_min_size_ko";
		}
		if (!(this.validations.max_size('email_persona',45))){
			this.dom.mostrar_error_campo('email_persona','email_persona_max_size_ko');
			return "email_persona_max_size_ko";
		}
		//Formato valido: direcciones de correo electrónico
		if (!(this.validations.format('email_persona', '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))) {
			this.dom.mostrar_error_campo('email_persona', 'email_persona_format_ko');
			return "email_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('email_persona');
		return true;
	}

//Atributo foto_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_foto_persona_validation(){
		if (!(this.validations.min_size('foto_persona',5))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_min_size_ko');
			return "foto_persona_min_size_ko";
		}
		if (!(this.validations.max_size('foto_persona',15))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_max_size_ko');
			return "foto_persona_max_size_ko";
		}
		//Formato valido: direcciones de correo electrónico
		if (!(this.validations.format('foto_persona', '^(?=.{5,15}$)\w+\.(?:jpg|jpeg)$'))) {
			this.dom.mostrar_error_campo('foto_persona', 'foto_persona_format_ko');
			return "foto_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('foto_persona');
		return true;
/*
		
		if (!(this.validations.exist_file('foto_persona'))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_exist_file_ko');
			return "foto_persona_exist_file_ko";
		}
		if (!(this.validations.max_size_file('foto_persona',2000))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_max_size_file_ko');
			return "foto_persona_max_size_file_ko";
		}
		if (!(this.validations.type_file('foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_type_file_ko');
			return "foto_persona_type_file_ko";
		}
		if (!(this.validations.format_name_file('foto_persona','^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_format_name_file_ko');
			return "foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('foto_persona');
		return true;
*/
	}

//Atributo nuevo_foto_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_nuevo_foto_persona_validation(){

		if (!(this.validations.exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_exist_file_ko');
			return "nuevo_foto_persona_exist_file_ko";
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2000))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_ko');
			return "nuevo_foto_persona_max_size_file_ko";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_ko');
			return "nuevo_foto_persona_type_file_ko";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_ko');
			return "nuevo_foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/
	
	//Retorna true si todos los campos son validos, si no devuelve false
	ADD_submit_persona(){

		let result = ((this.ADD_dni_validation()) &
					(this.ADD_nombre_persona_validation()) &
					(this.ADD_apellidos_persona_validation()) &
					(this.ADD_fechanacimiento_persona_validation()) &
					(this.ADD_direccion_persona_validation()) &
					(this.ADD_telefono_persona_validation()) &
					(this.ADD_email_persona_validation()) &
					(this.ADD_foto_persona_validation()) &
					(this.ADD_nuevo_foto_persona_validation()));
		
		result = Boolean(result);
		return result;	
	}



/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/

	EDIT_dni_validation(){

		return this.ADD_dni_validation();
	}

	EDIT_nombre_persona_validation(){

		return this.ADD_nombre_persona_validation();
	}

	EDIT_apellidos_persona_validation(){

		return this.ADD_apellidos_persona_validation();
	}

	EDIT_fechanacimiento_persona_validation(){

		return this.ADD_fechanacimiento_persona_validation();
	}

	EDIT_direccion_persona_validation(){

		return this.ADD_direccion_persona_validation();
	}

	EDIT_telefono_persona_validation(){

		return this.ADD_telefono_persona_validation();
	}

	EDIT_email_persona_validation(){

		return this.ADD_email_persona_validation();
	}

	EDIT_foto_persona_validation(){

		return this.ADD_foto_persona_validation();
/*
		if (!(this.validations.exist_file('foto_persona'))){
			this.dom.mostrar_exito_campo('foto_persona');
			return true;
		}
		if (!(this.validations.max_size_file('foto_persona',2000))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_max_size_file_ko');
			return "foto_persona_max_size_file_ko";
		}
		if (!(this.validations.type_file('foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_type_file_ko');
			return "foto_persona_type_file_ko";
		}
		if (!(this.validations.format_name_file('foto_persona','^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_format_name_file_ko');
			return "foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('foto_persona');
		return true;
*/
	}

	EDIT_nuevo_foto_persona_validation(){

		if (!(this.validations.exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_exito_campo('nuevo_foto_persona');
			return true;
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2000))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_ko');
			return "nuevo_foto_persona_max_size_file_ko";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_ko');
			return "nuevo_foto_persona_type_file_ko";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_ko');
			return "nuevo_foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	EDIT_submit_persona(){

		let result = ((this.EDIT_dni_validation()) &
					(this.EDIT_nombre_persona_validation()) &
					(this.EDIT_apellidos_persona_validation()) &
					(this.EDIT_fechanacimiento_persona_validation()) &
					(this.EDIT_direccion_persona_validation()) &
					(this.EDIT_telefono_persona_validation()) &
					(this.EDIT_email_persona_validation()) &
					(this.EDIT_foto_persona_validation()) &
					(this.EDIT_nuevo_foto_persona_validation()));
		
		result = Boolean(result);
		return result;	
	}



/***************************************************************************************************************************
                                 			Campos de validacion para SEARCH
****************************************************************************************************************************/
//El SEARCH pensamos q puede ser parcial(no hay minimo) pero si maximo y debe respetar el formato de cada atributo

//Atributo dni

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_dni_validation(){

		if (!(this.validations.max_size('dni_persona',9))){
			this.dom.mostrar_error_campo('dni_persona','dni_persona_max_size_ko');
			return "dni_persona_max_size_ko";
		}
		// vacío, 1-8 dígitos, o 8 dígitos + letra
		if (!(this.validations.format('dni_persona', '^([0-9]{1,8}|[0-9]{8}[A-Z])?$'))){
			this.dom.mostrar_error_campo('dni_persona','dni_persona_format_ko');
			return "dni_persona_format_ko";
		}
		if (!(this.dni_personalize_validation_search('dni_persona'))){
			this.dom.mostrar_error_campo('dni_persona','dni_persona_personalize_validate_dni_ko');
			return "dni_persona_personalize_validate_dni_ko";
		}
		this.dom.mostrar_exito_campo('dni_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	dni_personalize_validation_search(dni){

		dni = document.getElementById('dni_persona').value;

		// Si no está completo (9 caracteres) no se puede comprobar la letra
		if (dni.length < 9) return true;

		var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
		var letter = dni_letters.charAt(parseInt(dni, 10) % 23);

		return letter == dni.charAt(8);
	}

//Atributo nombre_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_nombre_persona_validation(){

	if (!(this.validations.max_size('nombre_persona',45))){
		this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_ko');
		return "nombre_persona_max_size_ko";
	}
	if (!(this.validations.format('nombre_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]*$'))){
		this.dom.mostrar_error_campo('nombre_persona','nombre_persona_format_ko');
		return "nombre_persona_format_ko";
	}
	this.dom.mostrar_exito_campo('nombre_persona');
	return true;
	}

//Atributo apellidos_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_apellidos_persona_validation(){

	if (!(this.validations.max_size('apellidos_persona',100))){
		this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_max_size_ko');
		return "apellidos_persona_max_size_ko";
	}
	// vacío o letras (incl. ñ y acentos) y espacios
	if (!(this.validations.format('apellidos_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]*$'))){
		this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_format_ko');
		return "apellidos_persona_format_ko";
	}
	this.dom.mostrar_exito_campo('apellidos_persona');
	return true;
	}

//Atributo fechanacimiento_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_fechanacimiento_persona_validation(){

		if (!(this.validations.max_size('fechanacimiento_persona',10))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_max_size_ko');
			return "fechanacimiento_persona_max_size_ko";
		}
		// vacío, o d/m/yyyy escrito parcialmente
		if (!(this.validations.format('fechanacimiento_persona', '^(\\d{1,2}(/(\\d{1,2}(/\\d{0,4})?)?)?)?$'))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_format_ko');
			return "fechanacimiento_persona_format_ko";
		}
		if (!(this.fechanacimiento_personalize_validation_search('fechanacimiento_persona'))){
			this.dom.mostrar_error_campo('fechanacimiento_persona','fechanacimiento_persona_personalize_validate_ko');
			return "fechanacimiento_persona_personalize_validate_ko";
		}
		this.dom.mostrar_exito_campo('fechanacimiento_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	fechanacimiento_personalize_validation_search(fecha){

		fecha = document.getElementById('fechanacimiento_persona').value.trim();

		// Solo se comprueba existencia y no futura cuando la fecha está completa
		if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)) return true;

		const [dia, mes, anio] = fecha.split('/').map(Number);
		const fechaIntroducida = new Date(anio, mes - 1, dia);

		const hoy = new Date();
		hoy.setHours(0, 0, 0, 0);

		// Existe: JS corrige fechas imposibles (31/02 -> 03/03), así que comparamos (los meses empiezan en 0)
		const existe = fechaIntroducida.getFullYear() === anio &&
					fechaIntroducida.getMonth() === mes - 1 &&
					fechaIntroducida.getDate() === dia;

		// No es posterior a hoy (solo fecha, sin horas)
		return existe && fechaIntroducida <= hoy;
	}

//Atributo direccion_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_direccion_persona_validation(){

		if (!(this.validations.max_size('direccion_persona',200))){
			this.dom.mostrar_error_campo('direccion_persona','direccion_persona_max_size_ko');
			return "direccion_persona_max_size_ko";
		}
		// vacío o letras (incl. ñ y acentos), números, . - ; / y espacios
		if (!(this.validations.format('direccion_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ0-9 .\\-;/]*$'))){
			this.dom.mostrar_error_campo('direccion_persona','direccion_persona_format_ko');
			return "direccion_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('direccion_persona');
		return true;
	}

//Atributo telefono_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_telefono_persona_validation(){

		if (!(this.validations.max_size('telefono_persona',9))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_max_size_ko');
			return "telefono_persona_max_size_ko";
		}
		// vacío o hasta 9 dígitos
		if (!(this.validations.format('telefono_persona', '^[0-9]{0,9}$'))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_format_ko');
			return "telefono_persona_format_ko";
		}
		if (!(this.telefono_personalize_validation_search('telefono_persona'))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_personalize_validate_ko');
			return "telefono_persona_personalize_validate_ko";
		}
		this.dom.mostrar_exito_campo('telefono_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	telefono_personalize_validation_search(telefono){

		telefono = document.getElementById('telefono_persona').value.trim();

		// Vacío: sin filtro. Si hay algo, el primer dígito debe ser 6, 7, 8 o 9
		if (telefono.length === 0) return true;

		return ['6', '7', '8', '9'].includes(telefono.charAt(0));
	}

//Atributo email_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_email_persona_validation(){

		if (!(this.validations.max_size('email_persona',45))){
			this.dom.mostrar_error_campo('email_persona','email_persona_max_size_ko');
			return "email_persona_max_size_ko";
		}
		// vacío o caracteres válidos de un email (parcial)
		if (!(this.validations.format('email_persona', '^[a-zA-Z0-9._%+@-]*$'))){
			this.dom.mostrar_error_campo('email_persona','email_persona_format_ko');
			return "email_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('email_persona');
		return true;
	}

//Atributo foto_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_foto_persona_validation(){

		if (!(this.validations.max_size('foto_persona',15))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_max_size_ko');
			return "foto_persona_max_size_ko";
		}
		// vacío o nombre parcial: letras y puntos
		if (!(this.validations.format('foto_persona', '^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_format_ko');
			return "foto_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('foto_persona');
		return true;
	}

//Atributo nuevo_foto_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_nuevo_foto_persona_validation(){

		if (!(this.validations.max_size('nuevo_foto_persona',15))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_ko');
			return "nuevo_foto_persona_max_size_ko";
		}
		// vacío o nombre parcial: letras y puntos
		if (!(this.validations.format('nuevo_foto_persona', '^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_ko');
			return "nuevo_foto_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	SEARCH_submit_persona(){

		let result = ((this.SEARCH_dni_validation()) &
					(this.SEARCH_nombre_persona_validation()) &
					(this.SEARCH_apellidos_persona_validation()) &
					(this.SEARCH_fechanacimiento_persona_validation()) &
					(this.SEARCH_direccion_persona_validation()) &
					(this.SEARCH_telefono_persona_validation()) &
					(this.SEARCH_email_persona_validation()) &
					(this.SEARCH_foto_persona_validation()) &
					(this.SEARCH_nuevo_foto_persona_validation()));
		
		result = Boolean(result);
		return result;	
	}



/***************************************************************************************************************************
                                 				Otras Cosas, No tocar
****************************************************************************************************************************/
	
	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.dni);
	}

	createForm_DELETE(){
		alert('crear formulario DELETE');
	}

	createForm_SHOWCURRENT(){
		alert('crear formulario DETALLE');
	}

	createForm_ADD(){
		alert('crear formulario ADD');
	}

	createForm_SEARCH(){
		alert('crear formulario SEARCH');
	}


// candidatas dom


	/**
	 * Recibe la información a mostrar en columnas y el array de columnas a las cuales se modificara su contenido para mostrarsele al usuario
	 * Se le incluyen tres columnas mas a cada fila para poder tener un icono con la accion a realizar para esa fila y se le coloca un evento onclick
	 * para poder llamar a los metodos createForm_accion pasando como parametros de esos metodos la información de la fila de datos
	 * 
	 * @param {Objeto} datos 
	 * @param {Array} mostrarespecial 
	 */
	crearTablaDatos(datos, mostrarespecial){
		
		var misdatos = datos;
		/*
		recorrer todas las filas de datos y cada atributo para si tiene una funcion de transformación de valor modificarlo en el momento
		*/
		if (mostrarespecial > 0){
			for (var i=0;i<misdatos.length;i++){
				for (var clave in misdatos[i]){
						if (clave in mostrarespecial){
							//misdatos[i][clave] = this.cambiarmostrarespecial(clave, misdatos[i][clave]);
						}
				}
			}
		}
		// proceso los datos de la tabla para incluir en cada fila los tres botones conectados a createForm_ACCION()
		for (var i=0;i<misdatos.length;i++){
			
			var linedit = `<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(`+JSON.stringify(misdatos[i])+`);'>`;
			var lindelete = `<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(`+JSON.stringify(misdatos[i])+`);'>`;
			var linshowcurrent = `<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(`+JSON.stringify(misdatos[i])+`);'>`;
			misdatos[i]['EDIT'] = linedit;
			misdatos[i]['DELETE'] = lindelete;
			misdatos[i]['SHOWCURRENT'] = linshowcurrent;

		}
		
		//muestro datos en tabla
		this.dom.showData('IU_manage_table', misdatos);
		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
		

	}



	/**
	 * Redibuja el select en funcion del contenido de columnasamostrar
	 * 
	 * @param {*} columnasamostrar 
	 * @param {*} atributos 
	 */
	crearSeleccionablecolumnas(columnasamostrar,atributos){

		document.getElementById("seleccioncolumnas").innerHTML = '';
		
		for (let atributo of atributos){

			var optionselect = document.createElement('option');
			optionselect.className = atributo;
			optionselect.innerHTML = atributo;
			var textofuncion = "entidad.modificarcolumnasamostrar('"+atributo+"');";
			optionselect.setAttribute("onclick",textofuncion);
			if (columnasamostrar.includes(atributo)){
				optionselect.selected = true;
			}
			document.getElementById("seleccioncolumnas").append(optionselect);
		}
		//setLang();

	}

// candidatas abstract

	/**
	 * muestra o no las columnas de la tabla segun indique columnasamostrar
	 */
	mostrarocultarcolumnas(){

		var estadodisplay = '';
		// recorro todos los atributos de la tabla
		for (let columna of this.atributos){
			// si el atributo esta en columnas a mostrar 
			// lo dejo como esta
			if (this.columnasamostrar.includes(columna)){
				estadodisplay = '';
			}
			// si el atributo no esta en columnas a mostrar lo oculto
			else{
				estadodisplay = 'none';
			}
			document.querySelector("th[class='tabla-th-"+columna+"']").style.display = estadodisplay;
			let arraytds = document.querySelectorAll("td[class='tabla-td-"+columna+"']");
			for (let i=0;i<arraytds.length;i++){
				arraytds[i].style.display = estadodisplay;
			}
		}


	}

	/**
	 * Modifica el array de columnas a mostrar al hacer click sobre el atributo en el select poniendolo como oculto o como visible
	 * @param {string} atributo 
	 */
	modificarcolumnasamostrar(atributo){

		if (this.columnasamostrar.includes(atributo)){
			// borrar ese atributo
			this.columnasamostrar = this.columnasamostrar.filter(columna => columna != atributo);
		}
		else{
			// añadir
			this.columnasamostrar.push(atributo);
		}
		
		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);

	}

	/**
	 * el método realiza una petición de search al back pudiendo enviar un formulario con datos, enviando 
	 * el nombre de la entidad del back y la acción a realizar sobre la misma.
	 * los datos respondidos se usan para indicar o bien que no hay datos o mostrandolos en una tabla.
	 */
	async SEARCH(){
    
        await this.access_functions.peticionBackGeneral('form_iu', this.nombreentidad, 'SEARCH')
        .then((respuesta) => {
            
            //limpiar el formulario
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();

            if (respuesta['code'] == 'RECORDSET_DATOS'){
				this.datos = respuesta['resource'];
				this.atributos = Object.keys(this.datos[0]);
				//crear la tabla de datos de la entidad del back
            	this.crearTablaDatos(this.datos, this.mostrarespecial);
				//rellenar el select de columnas a mostrar
				//this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
				//this.mostrarocultarcolumnas();
            }
            else{
				document.getElementById("IU_manage_table").style.display = 'block';
				document.getElementById('IU_manage_table').innerHTML = 'No se han encontrado elementos que coincidan con la búsqueda';
                document.getElementById('IU_manage_table').className = 'RECORDSET_VACIO';
            }

			//setLang();

        });
    
    }

	
}


