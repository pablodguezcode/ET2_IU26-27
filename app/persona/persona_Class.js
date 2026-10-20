class persona extends AbstractEntidad {

	constructor(esTest=null){

		super();

		this.columnasamostrar = ['dni','nombre_persona', 'apellidos_persona', 'fechaNacimiento_persona',
			'direccion_persona','telefono_persona', 'email_persona','foto_persona' ];
		this.mostrarespecial = ['foto_persona'];
		this.nombreentidad = 'persona';

		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();

		//init
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';
			document.getElementById('text_title_page').className = 'text_titulo_page_'+this.nombreentidad;

			//crear el formulario vacio
			document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();

			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}

	}

	/**
	 * devuelve el html del formulario de la entidad
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_dni">dni</label>
			<input type='text' id='dni' name='dni'></input>
			<span id="span_error_dni"><a id="error_dni"></a></span>
			<br>

			<label class="label_nombre_persona">Nombre de pila</label>
			<input type='text' id='nombre_persona' name='nombre_persona'></input>
			<span id="span_error_nombre_persona" ><a id="error_nombre_persona"></a></span>
			<br>

			<label class="label_apellidos_persona">apellidos</label>
			<input type='text' id='apellidos_persona' name='apellidos_persona'></input>
			<span id="span_error_apellidos_persona" ><a id="error_apellidos_persona"></a></span>
			<br>

			<label class="label_fechaNacimiento_persona">Fecha de Nacimiento</label>
			<input type='text' id='fechaNacimiento_persona' name='fechaNacimiento_persona'></input>
			<span id="span_error_fechaNacimiento_persona" ><a id="error_fechaNacimiento_persona"></a></span>

			<br>
			<label class="label_direccion_persona">Dirección Postal</label>
			<textarea rows="5" cols="33" type='text' id='direccion_persona' name='direccion_persona'></textarea>
			<span id="span_error_direccion_persona" ><a id="error_direccion_persona"></a></span>
			<br>

			<label class="label_telefono_persona">Teléfono Persona</label>
			<input type='text' id='telefono_persona' name='telefono_persona'></input>
			<span id="span_error_telefono_persona" ><a id="error_telefono_persona"></a></span>

			<br>
			<label class="label_email_persona">Correo Electronico</label>
			<input type='text' id='email_persona' name='email_persona'></input>
			<span id="span_error_email_persona" ><a id="error_email_persona"></a></span>

			<br>
			<label id="label_foto_persona" class="label_foto_persona">Foto Persona</label>
			<input type='text' id='foto_persona' name='foto_persona'></input>
			<span id="span_error_foto_persona"><a id="error_foto_persona"></a></span>
			<a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/"><img src="./iconos/FILE.png" /></a>

			<label id="label_nuevo_foto_persona" class="label_nuevo_foto_persona">Nueva Foto Persona</label>
			<input type='file' id='nuevo_foto_persona' name='nuevo_foto_persona'></input>
			<span id="span_error_nuevo_foto_persona"><a id="error_nuevo_foto_persona"></a></span>
			<br>
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
		if (!(this.personalize_dni('dni'))){
			this.dom.mostrar_error_campo('dni','dni_personalized_ko');
			return "dni_personalized_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	//Retorna true si el campo es valido, si no devuelve false
	personalize_dni(dni){

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
		if (!(this.validations.format('nombre_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ.\\- ]*$'))){
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
		if (!(this.validations.format('apellidos_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ.\\- ]*$'))){
			this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_format_ko');
			return "apellidos_persona_format_ko";
		}
		this.dom.mostrar_exito_campo('apellidos_persona');
		return true;
	}

//Atributo fechaNacimiento_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_fechaNacimiento_persona_validation(){

		if (!(this.validations.min_size('fechaNacimiento_persona',8))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_min_size_ko');
			return "fechaNacimiento_persona_min_size_ko";
		}
		if (!(this.validations.max_size('fechaNacimiento_persona',10))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_max_size_ko');
			return "fechaNacimiento_persona_max_size_ko";
		}
		//Formatos válidos: dd/mm/yyyy, d/m/yyyy, dd/m/yyyy, d/mm/yyyy
		if (!(this.validations.format('fechaNacimiento_persona', '^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/[0-9]{4}$'))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_format_ko');
			return "fechaNacimiento_persona_format_ko";
		}
		//verificar que la fecha sea válida y no esté en el futuro
		if (!(this.personalize_fechaNacimiento_persona('fechaNacimiento_persona'))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_personalized_ko');
			return "fechaNacimiento_persona_personalized_ko";
		}
		this.dom.mostrar_exito_campo('fechaNacimiento_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	personalize_fechaNacimiento_persona(fecha) {

		fecha = document.getElementById('fechaNacimiento_persona').value;

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
		if (!(this.personalize_telefono_persona('telefono_persona'))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_personalized_ko');
			return "telefono_persona_personalized_ko";
		}
		this.dom.mostrar_exito_campo('telefono_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	personalize_telefono_persona(telefono) {

		telefono = document.getElementById('telefono_persona').value;

		return ['6', '7', '8', '9'].includes(telefono.trim().charAt(0));
	}

//Atributo email_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_email_persona_validation(){

		if (!(this.validations.min_size('email_persona',6))){
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
		// mismo formato que el nombre del archivo: letras y puntos
		if (!(this.validations.format('foto_persona', '^[a-zA-Z.]*$'))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_format_ko');
			return "foto_persona_format_ko";
		}
		// la extension debe ser jpg o jpeg
		if (!(this.personalize_foto_persona('foto_persona'))){
			this.dom.mostrar_error_campo('foto_persona','foto_persona_personalized_ko');
			return "foto_persona_personalized_ko";
		}
		this.dom.mostrar_exito_campo('foto_persona');
		return true;
	}

	//Retorna true si el nombre del fichero termina en .jpg o .jpeg, si no devuelve false
	personalize_foto_persona(foto){

		foto = document.getElementById('foto_persona').value;

		return /\.(jpg|jpeg)$/i.test(foto);
	}

//Atributo nuevo_foto_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_nuevo_foto_persona_validation(){

		if (!(this.validations.exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_exist_file_ko');
			return "nuevo_foto_persona_exist_file_ko";
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2097152))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_ko');
			return "nuevo_foto_persona_max_size_file_ko";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_ko');
			return "nuevo_foto_persona_type_file_ko";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','^[a-zA-Z.]{5,15}$'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_ko');
			return "nuevo_foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	ADD_submit_persona(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		// foto_persona no se muestra en ADD (la pone el back al subir el fichero): no se valida en el submit
		set_result.dni = this.ADD_dni_validation();
		set_result.nombre_persona = this.ADD_nombre_persona_validation();
		set_result.apellidos_persona = this.ADD_apellidos_persona_validation();
		set_result.fechaNacimiento_persona = this.ADD_fechaNacimiento_persona_validation();
		set_result.direccion_persona = this.ADD_direccion_persona_validation();
		set_result.telefono_persona = this.ADD_telefono_persona_validation();
		set_result.email_persona = this.ADD_email_persona_validation();
		set_result.nuevo_foto_persona = this.ADD_nuevo_foto_persona_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
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

	EDIT_fechaNacimiento_persona_validation(){

		return this.ADD_fechaNacimiento_persona_validation();
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

		// en EDIT puede ir vacio (se conserva la foto actual); si trae algo, mismas restricciones que en ADD
		if (document.getElementById('foto_persona').value.length == 0){
			this.dom.mostrar_exito_campo('foto_persona');
			return true;
		}
		return this.ADD_foto_persona_validation();
	}

	EDIT_nuevo_foto_persona_validation(){

		if (!(this.validations.exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_exito_campo('nuevo_foto_persona');
			return true;
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2097152))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_ko');
			return "nuevo_foto_persona_max_size_file_ko";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_ko');
			return "nuevo_foto_persona_type_file_ko";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','^[a-zA-Z.]{5,15}$'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_ko');
			return "nuevo_foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	EDIT_submit_persona(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.dni = this.EDIT_dni_validation();
		set_result.nombre_persona = this.EDIT_nombre_persona_validation();
		set_result.apellidos_persona = this.EDIT_apellidos_persona_validation();
		set_result.fechaNacimiento_persona = this.EDIT_fechaNacimiento_persona_validation();
		set_result.direccion_persona = this.EDIT_direccion_persona_validation();
		set_result.telefono_persona = this.EDIT_telefono_persona_validation();
		set_result.email_persona = this.EDIT_email_persona_validation();
		set_result.foto_persona = this.EDIT_foto_persona_validation();
		set_result.nuevo_foto_persona = this.EDIT_nuevo_foto_persona_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}



/***************************************************************************************************************************
                                 			Campos de validacion para SEARCH
****************************************************************************************************************************/

//El SEARCH pensamos q puede ser parcial(no hay minimo) pero si maximo y debe respetar el formato de cada atributo

//Atributo dni

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_dni_validation(){

		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_ko');
			return "dni_max_size_ko";
		}
		// vacio (sin filtro) o dni parcial/completo: solo digitos y letras. No se recalcula la letra de control (ver persona_tests.js)
		if (!(this.validations.format('dni', '^[0-9A-Za-z]*$'))){
			this.dom.mostrar_error_campo('dni','dni_format_ko');
			return "dni_format_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;
	}

//Atributo nombre_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_nombre_persona_validation(){

	if (!(this.validations.max_size('nombre_persona',45))){
		this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_ko');
		return "nombre_persona_max_size_ko";
	}
	if (!(this.validations.format('nombre_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ.\\- ]*$'))){
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
	if (!(this.validations.format('apellidos_persona', '^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ.\\- ]*$'))){
		this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_format_ko');
		return "apellidos_persona_format_ko";
	}
	this.dom.mostrar_exito_campo('apellidos_persona');
	return true;
	}

//Atributo fechaNacimiento_persona

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_fechaNacimiento_persona_validation(){

		if (!(this.validations.max_size('fechaNacimiento_persona',10))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_max_size_ko');
			return "fechaNacimiento_persona_max_size_ko";
		}
		// vacío, o d/m/yyyy escrito parcialmente
		if (!(this.validations.format('fechaNacimiento_persona', '^[0-9/]*$'))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_format_ko');
			return "fechaNacimiento_persona_format_ko";
		}
		if (!(this.personalize_fechaNacimiento_persona_search('fechaNacimiento_persona'))){
			this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_personalized_ko');
			return "fechaNacimiento_persona_personalized_ko";
		}
		this.dom.mostrar_exito_campo('fechaNacimiento_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	personalize_fechaNacimiento_persona_search(fecha){

		fecha = document.getElementById('fechaNacimiento_persona').value.trim();

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
		if (!(this.personalize_telefono_persona_search('telefono_persona'))){
			this.dom.mostrar_error_campo('telefono_persona','telefono_persona_personalized_ko');
			return "telefono_persona_personalized_ko";
		}
		this.dom.mostrar_exito_campo('telefono_persona');
		return true;
	}

	//Retorna true si el campo es valido, si no devuelve false
	personalize_telefono_persona_search(telefono){

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
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_ko');
			return "nuevo_foto_persona_format_name_file_ko";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	SEARCH_submit_persona(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		// nuevo_foto_persona (input file) no se muestra en SEARCH: se busca por el nombre del fichero (foto_persona)
		set_result.dni = this.SEARCH_dni_validation();
		set_result.nombre_persona = this.SEARCH_nombre_persona_validation();
		set_result.apellidos_persona = this.SEARCH_apellidos_persona_validation();
		set_result.fechaNacimiento_persona = this.SEARCH_fechaNacimiento_persona_validation();
		set_result.direccion_persona = this.SEARCH_direccion_persona_validation();
		set_result.telefono_persona = this.SEARCH_telefono_persona_validation();
		set_result.email_persona = this.SEARCH_email_persona_validation();
		set_result.foto_persona = this.SEARCH_foto_persona_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}

/***************************************************************************************************************************
                                                     FORMULARIOS
****************************************************************************************************************************/


	/**
	 * Construye el formulario de ADD de persona y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono ADD) o cancelarla (icono BACK de index.html).
	 * - Cada campo se valida al salir de el (colocarvalidaciones) y todos se comprueban en el onsubmit antes de enviar al back.
	 * - Si el back responde ok, AbstractEntidad.ADD() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 * - foto_persona (nombre del fichero) y su label no se muestran en ADD; solo el input file nuevo_foto_persona.
	 */
	createForm_ADD(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_persona_ADD');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de un ADD anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

		// en ADD el nombre del fichero (con su label, su mensaje de error y su enlace) no se muestra: lo pone el back al subir el fichero
		this.dom.hide_element_form('foto_persona');
		this.dom.hide_element('span_error_foto_persona');
		this.dom.hide_element('link_foto_persona');

		// en ADD si se muestra el input file con su label
		this.dom.show_element('label_nuevo_foto_persona');
		this.dom.show_element('nuevo_foto_persona');

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	//Stubs (alert): los formularios de EDIT, DELETE, SHOWCURRENT y SEARCH todavia no estan implementados
	//(se mantienen tal y como estaban en la entrega anterior).

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.dni);
	}

	createForm_DELETE(){
		alert('crear formulario DELETE');
	}

	createForm_SHOWCURRENT(){
		alert('crear formulario DETALLE');
	}

	createForm_SEARCH(){
		alert('crear formulario SEARCH');
	}


/***************************************************************************************************************************
                                 			Atributos con formato especial en la tabla
****************************************************************************************************************************/

	/**
	 * Devuelve el formato especial con el que se muestra en la tabla el valor de un atributo incluido en mostrarespecial.
	 * - foto_persona: enlace al fichero subido al servidor (http://193.147.87.202/ET2/filesuploaded/files_foto_persona/nombredefichero)
	 *
	 * @param {string} atributo nombre del atributo
	 * @param {*} valorentrada valor que manda el back
	 * @returns {*} valor a mostrar en la tabla
	 */
	mostrarcambioatributo(atributo, valorentrada){

		switch (atributo){
			case 'foto_persona':
				if (valorentrada === null || valorentrada === ''){
					return valorentrada;
				}
				return `<a href='http://193.147.87.202/ET2/filesuploaded/files_foto_persona/`+valorentrada+`'>`+valorentrada+`</a>`;
			default:
				return valorentrada;
		}
	}

	/**
	 * AbstractEntidad.crearTablaDatos() llama a cambiarmostrarespecial(columna, valor) para los atributos de mostrarespecial.
	 * El formato especial esta definido en mostrarcambioatributo(), a donde se delega.
	 *
	 * @param {string} columna nombre del atributo
	 * @param {*} valor valor que manda el back
	 * @returns {*} valor a mostrar en la tabla
	 */
	cambiarmostrarespecial(columna, valor){

		return this.mostrarcambioatributo(columna, valor);
	}

}
