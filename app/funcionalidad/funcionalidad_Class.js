/* -----------------------------------------------------------------------------
   Entidad: funcionalidad
   Campos : id_funcionalidad (input, PK), nombre_funcionalidad (input), descrip_funcionalidad (textarea)
----------------------------------------------------------------------------- */
class funcionalidad extends AbstractEntidad {

	constructor(esTest=null){

		super();

		this.columnasamostrar = ['id_funcionalidad', 'nombre_funcionalidad', 'descrip_funcionalidad'];
		this.mostrarespecial = [];
		this.nombreentidad = 'funcionalidad';

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
	 * id_funcionalidad va como type='text' (no 'number'): el navegador vacia el value de un
	 * input number con "1a" y Validations.min_size lo daria por vacio.
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_id_funcionalidad">Identificador de la funcionalidad</label>
			<input type='text' id='id_funcionalidad' name='id_funcionalidad' />
			<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
			<br>

			<label class="label_nombre_funcionalidad">Nombre de la funcionalidad</label>
			<input type='text' id='nombre_funcionalidad' name='nombre_funcionalidad' />
			<span id="span_error_nombre_funcionalidad"><a id="error_nombre_funcionalidad"></a></span>
			<br>

			<label class="label_descrip_funcionalidad">Descripci&oacute;n de la funcionalidad</label>
			<textarea rows="5" cols="33" id='descrip_funcionalidad' name='descrip_funcionalidad'></textarea>
			<span id="span_error_descrip_funcionalidad"><a id="error_descrip_funcionalidad"></a></span>
			<br>
			</form>
		`;
		return form_content;

	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/


//Atributo id_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_id_funcionalidad_validation(){

		if (!(this.validations.min_size('id_funcionalidad',1))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_min_size_ko');
			return "id_funcionalidad_min_size_ko";
		}
		if (!(this.validations.max_size('id_funcionalidad',11))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_max_size_ko');
			return "id_funcionalidad_max_size_ko";
		}
		// Solo digitos: sin signos, sin decimales, sin espacios
		if (!(this.validations.format('id_funcionalidad', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_format_ko');
			return "id_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('id_funcionalidad');
		return true;

	}

//Atributo nombre_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_nombre_funcionalidad_validation(){

		if (!(this.validations.min_size('nombre_funcionalidad',5))){
			this.dom.mostrar_error_campo('nombre_funcionalidad','nombre_funcionalidad_min_size_ko');
			return "nombre_funcionalidad_min_size_ko";
		}
		if (!(this.validations.max_size('nombre_funcionalidad',48))){
			this.dom.mostrar_error_campo('nombre_funcionalidad','nombre_funcionalidad_max_size_ko');
			return "nombre_funcionalidad_max_size_ko";
		}
		// Solo letras A-Z a-z, n con tilde y vocales con acento o dieresis. Sin espacios, digitos ni signos
		if (!(this.validations.format('nombre_funcionalidad', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$'))){
			this.dom.mostrar_error_campo('nombre_funcionalidad','nombre_funcionalidad_format_ko');
			return "nombre_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('nombre_funcionalidad');
		return true;

	}

//Atributo descrip_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_descrip_funcionalidad_validation(){

		if (!(this.validations.min_size('descrip_funcionalidad',5))){
			this.dom.mostrar_error_campo('descrip_funcionalidad','descrip_funcionalidad_min_size_ko');
			return "descrip_funcionalidad_min_size_ko";
		}
		if (!(this.validations.max_size('descrip_funcionalidad',200))){
			this.dom.mostrar_error_campo('descrip_funcionalidad','descrip_funcionalidad_max_size_ko');
			return "descrip_funcionalidad_max_size_ko";
		}
		// Letras (con n con tilde y acentos), espacio y puntuacion espanola: . , ; : ? ! ( ) [ ] - " ' mas los signos de apertura de interrogacion y exclamacion y los puntos suspensivos
		// Sin digitos ni % & # @ $ < > * _. Dentro de la clase se escapan [ ] y -
		if (!(this.validations.format('descrip_funcionalidad', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\\[\\]\\-"\'…]*$'))){
			this.dom.mostrar_error_campo('descrip_funcionalidad','descrip_funcionalidad_format_ko');
			return "descrip_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('descrip_funcionalidad');
		return true;

	}



/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	ADD_submit_funcionalidad(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.ADD_id_funcionalidad_validation();
		set_result.nombre_funcionalidad = this.ADD_nombre_funcionalidad_validation();
		set_result.descrip_funcionalidad = this.ADD_descrip_funcionalidad_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}



/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/


	EDIT_id_funcionalidad_validation(){

		return this.ADD_id_funcionalidad_validation();
	}

	EDIT_nombre_funcionalidad_validation(){

		return this.ADD_nombre_funcionalidad_validation();
	}

	EDIT_descrip_funcionalidad_validation(){

		return this.ADD_descrip_funcionalidad_validation();
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	EDIT_submit_funcionalidad(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.EDIT_id_funcionalidad_validation();
		set_result.nombre_funcionalidad = this.EDIT_nombre_funcionalidad_validation();
		set_result.descrip_funcionalidad = this.EDIT_descrip_funcionalidad_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}



/***************************************************************************************************************************
                                 			Campos de validacion para SEARCH
****************************************************************************************************************************/

//El SEARCH puede ser parcial (no hay minimo, vacio = sin filtro) pero si maximo y debe respetar el conjunto de caracteres de cada atributo.
//Las expresiones regulares son las mismas que en ADD/EDIT: llevan * (no +) y el conjunto de caracteres no cambia, asi que
//cualquier valor parcial o vacio las cumple. El minimo lo controla min_size, que aqui no se llama.

//Atributo id_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_id_funcionalidad_validation(){

		if (!(this.validations.max_size('id_funcionalidad',11))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_max_size_ko');
			return "id_funcionalidad_max_size_ko";
		}
		if (!(this.validations.format('id_funcionalidad', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_format_ko');
			return "id_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('id_funcionalidad');
		return true;
	}

//Atributo nombre_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_nombre_funcionalidad_validation(){

		if (!(this.validations.max_size('nombre_funcionalidad',48))){
			this.dom.mostrar_error_campo('nombre_funcionalidad','nombre_funcionalidad_max_size_ko');
			return "nombre_funcionalidad_max_size_ko";
		}
		if (!(this.validations.format('nombre_funcionalidad', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$'))){
			this.dom.mostrar_error_campo('nombre_funcionalidad','nombre_funcionalidad_format_ko');
			return "nombre_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('nombre_funcionalidad');
		return true;
	}

//Atributo descrip_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_descrip_funcionalidad_validation(){

		if (!(this.validations.max_size('descrip_funcionalidad',200))){
			this.dom.mostrar_error_campo('descrip_funcionalidad','descrip_funcionalidad_max_size_ko');
			return "descrip_funcionalidad_max_size_ko";
		}
		if (!(this.validations.format('descrip_funcionalidad', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\\[\\]\\-"\'…]*$'))){
			this.dom.mostrar_error_campo('descrip_funcionalidad','descrip_funcionalidad_format_ko');
			return "descrip_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('descrip_funcionalidad');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	SEARCH_submit_funcionalidad(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.SEARCH_id_funcionalidad_validation();
		set_result.nombre_funcionalidad = this.SEARCH_nombre_funcionalidad_validation();
		set_result.descrip_funcionalidad = this.SEARCH_descrip_funcionalidad_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}

/***************************************************************************************************************************
                                                     FORMULARIOS
****************************************************************************************************************************/

	//Stubs (alert): los formularios de ADD, EDIT, DELETE, SHOWCURRENT y SEARCH todavia no estan implementados.

	createForm_ADD(){
		alert('crear formulario ADD');
	}

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.id_funcionalidad);
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

}
