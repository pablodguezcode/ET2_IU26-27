/* -----------------------------------------------------------------------------
   Entidad: accion
   Campos : id_accion (input, PK), nombre_accion (input), descrip_accion (textarea)
----------------------------------------------------------------------------- */
class accion extends AbstractEntidad {

	constructor(esTest=null){

		super();

		this.columnasamostrar = ['id_accion', 'nombre_accion', 'descrip_accion'];
		this.mostrarespecial = [];
		this.nombreentidad = 'accion';

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
	 * id_accion va como type='text' (no 'number'): el navegador vacia el value de un
	 * input number con "1a" y Validations.min_size lo daria por vacio.
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_id_accion">Identificador de la acci&oacute;n</label>
			<input type='text' id='id_accion' name='id_accion' />
			<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
			<br>

			<label class="label_nombre_accion">Nombre de la acci&oacute;n</label>
			<input type='text' id='nombre_accion' name='nombre_accion' />
			<span id="span_error_nombre_accion"><a id="error_nombre_accion"></a></span>
			<br>

			<label class="label_descrip_accion">Descripci&oacute;n de la acci&oacute;n</label>
			<textarea rows="5" cols="33" id='descrip_accion' name='descrip_accion'></textarea>
			<span id="span_error_descrip_accion"><a id="error_descrip_accion"></a></span>
			<br>
			</form>
		`;
		return form_content;

	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/


//Atributo id_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_id_accion_validation(){

		if (!(this.validations.min_size('id_accion',1))){
			this.dom.mostrar_error_campo('id_accion','id_accion_min_size_ko');
			return "id_accion_min_size_ko";
		}
		if (!(this.validations.max_size('id_accion',11))){
			this.dom.mostrar_error_campo('id_accion','id_accion_max_size_ko');
			return "id_accion_max_size_ko";
		}
		// Solo digitos: sin signos, sin decimales, sin espacios
		if (!(this.validations.format('id_accion', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_accion','id_accion_format_ko');
			return "id_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('id_accion');
		return true;

	}

//Atributo nombre_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_nombre_accion_validation(){

		if (!(this.validations.min_size('nombre_accion',5))){
			this.dom.mostrar_error_campo('nombre_accion','nombre_accion_min_size_ko');
			return "nombre_accion_min_size_ko";
		}
		if (!(this.validations.max_size('nombre_accion',48))){
			this.dom.mostrar_error_campo('nombre_accion','nombre_accion_max_size_ko');
			return "nombre_accion_max_size_ko";
		}
		// Solo letras A-Z a-z, n con tilde y vocales con acento o dieresis. Sin espacios, digitos ni signos
		// equivale a: ^[A-Za-z + n/N con tilde + vocales con acento + u/U con dieresis]*$
		if (!(this.validations.format('nombre_accion', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$'))){
			this.dom.mostrar_error_campo('nombre_accion','nombre_accion_format_ko');
			return "nombre_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('nombre_accion');
		return true;

	}

//Atributo descrip_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_descrip_accion_validation(){

		if (!(this.validations.min_size('descrip_accion',5))){
			this.dom.mostrar_error_campo('descrip_accion','descrip_accion_min_size_ko');
			return "descrip_accion_min_size_ko";
		}
		if (!(this.validations.max_size('descrip_accion',200))){
			this.dom.mostrar_error_campo('descrip_accion','descrip_accion_max_size_ko');
			return "descrip_accion_max_size_ko";
		}
		// Letras (con n con tilde y acentos), espacio y puntuacion espanola: . , ; : ? ! ( ) [ ] - " ' mas los signos de apertura de interrogacion y exclamacion y los puntos suspensivos
		// Sin digitos ni % & # @ $ < >. Dentro de la clase se escapan [ ] y -
		// equivale a: ^[letras .,;:?!()\[\]\-"' + signos de apertura + puntos suspensivos]*$
		if (!(this.validations.format('descrip_accion', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\\[\\]\\-"\'…]*$'))){
			this.dom.mostrar_error_campo('descrip_accion','descrip_accion_format_ko');
			return "descrip_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('descrip_accion');
		return true;

	}



/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	ADD_submit_accion(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_accion = this.ADD_id_accion_validation();
		set_result.nombre_accion = this.ADD_nombre_accion_validation();
		set_result.descrip_accion = this.ADD_descrip_accion_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}



/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/


	EDIT_id_accion_validation(){

		return this.ADD_id_accion_validation();
	}

	EDIT_nombre_accion_validation(){

		return this.ADD_nombre_accion_validation();
	}

	EDIT_descrip_accion_validation(){

		return this.ADD_descrip_accion_validation();
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	EDIT_submit_accion(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_accion = this.EDIT_id_accion_validation();
		set_result.nombre_accion = this.EDIT_nombre_accion_validation();
		set_result.descrip_accion = this.EDIT_descrip_accion_validation();

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
//cualquier valor parcial ("alt", "Busca reg") o vacio las cumple. El minimo lo controla min_size, que aqui no se llama.

//Atributo id_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_id_accion_validation(){

		if (!(this.validations.max_size('id_accion',11))){
			this.dom.mostrar_error_campo('id_accion','id_accion_max_size_ko');
			return "id_accion_max_size_ko";
		}
		if (!(this.validations.format('id_accion', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_accion','id_accion_format_ko');
			return "id_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('id_accion');
		return true;
	}

//Atributo nombre_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_nombre_accion_validation(){

		if (!(this.validations.max_size('nombre_accion',48))){
			this.dom.mostrar_error_campo('nombre_accion','nombre_accion_max_size_ko');
			return "nombre_accion_max_size_ko";
		}
		if (!(this.validations.format('nombre_accion', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$'))){
			this.dom.mostrar_error_campo('nombre_accion','nombre_accion_format_ko');
			return "nombre_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('nombre_accion');
		return true;
	}

//Atributo descrip_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_descrip_accion_validation(){

		if (!(this.validations.max_size('descrip_accion',200))){
			this.dom.mostrar_error_campo('descrip_accion','descrip_accion_max_size_ko');
			return "descrip_accion_max_size_ko";
		}
		if (!(this.validations.format('descrip_accion', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\\[\\]\\-"\'…]*$'))){
			this.dom.mostrar_error_campo('descrip_accion','descrip_accion_format_ko');
			return "descrip_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('descrip_accion');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	SEARCH_submit_accion(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_accion = this.SEARCH_id_accion_validation();
		set_result.nombre_accion = this.SEARCH_nombre_accion_validation();
		set_result.descrip_accion = this.SEARCH_descrip_accion_validation();

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
	 * Construye el formulario de ADD de accion y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono ADD) o cancelarla (icono BACK de index.html).
	 * - Cada campo se valida al salir de el (colocarvalidaciones) y todos se comprueban en el onsubmit antes de enviar al back.
	 * - Si el back responde ok, AbstractEntidad.ADD() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 */
	createForm_ADD(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_accion_ADD');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de un ADD anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	//Stubs (alert): los formularios de EDIT, DELETE, SHOWCURRENT y SEARCH todavia no estan implementados
	//(se mantienen tal y como estaban en la entrega anterior).

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.id_accion);
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
