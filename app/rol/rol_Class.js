/* -----------------------------------------------------------------------------
   Entidad: rol
   Campos : id_rol (input, PK), rol_name (input), rol_description (textarea)
----------------------------------------------------------------------------- */
class rol extends AbstractEntidad {

	constructor(esTest=null){

		super();

		this.columnasamostrar = ['id_rol', 'rol_name', 'rol_description'];
		this.mostrarespecial = [];
		this.nombreentidad = 'rol';

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
	 * id_rol va como type='text' (no 'number'): el navegador vacia el value de un
	 * input number con "1a" y Validations.min_size lo daria por vacio.
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_id_rol">Identificador del rol</label>
			<input type='text' id='id_rol' name='id_rol' />
			<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
			<br>

			<label class="label_rol_name">Nombre del rol</label>
			<input type='text' id='rol_name' name='rol_name' />
			<span id="span_error_rol_name"><a id="error_rol_name"></a></span>
			<br>

			<label class="label_rol_description">Descripci&oacute;n del rol</label>
			<textarea rows="5" cols="33" id='rol_description' name='rol_description'></textarea>
			<span id="span_error_rol_description"><a id="error_rol_description"></a></span>
			<br>
			</form>
		`;
		return form_content;

	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/


//Atributo id_rol

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_id_rol_validation(){

		if (!(this.validations.min_size('id_rol',1))){
			this.dom.mostrar_error_campo('id_rol','id_rol_min_size_ko');
			return "id_rol_min_size_ko";
		}
		if (!(this.validations.max_size('id_rol',11))){
			this.dom.mostrar_error_campo('id_rol','id_rol_max_size_ko');
			return "id_rol_max_size_ko";
		}
		// Solo digitos: sin signos, sin decimales, sin espacios
		if (!(this.validations.format('id_rol', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_rol','id_rol_format_ko');
			return "id_rol_format_ko";
		}
		this.dom.mostrar_exito_campo('id_rol');
		return true;

	}

//Atributo rol_name

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_rol_name_validation(){

		if (!(this.validations.min_size('rol_name',5))){
			this.dom.mostrar_error_campo('rol_name','rol_name_min_size_ko');
			return "rol_name_min_size_ko";
		}
		if (!(this.validations.max_size('rol_name',48))){
			this.dom.mostrar_error_campo('rol_name','rol_name_max_size_ko');
			return "rol_name_max_size_ko";
		}
		// Solo letras A-Z a-z, n con tilde y vocales con acento o dieresis. Sin espacios, digitos ni signos
		// equivale a: ^[A-Za-z + n/N con tilde + vocales con acento + u/U con dieresis]*$
		if (!(this.validations.format('rol_name', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$'))){
			this.dom.mostrar_error_campo('rol_name','rol_name_format_ko');
			return "rol_name_format_ko";
		}
		this.dom.mostrar_exito_campo('rol_name');
		return true;

	}

//Atributo rol_description

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_rol_description_validation(){

		if (!(this.validations.min_size('rol_description',5))){
			this.dom.mostrar_error_campo('rol_description','rol_description_min_size_ko');
			return "rol_description_min_size_ko";
		}
		if (!(this.validations.max_size('rol_description',200))){
			this.dom.mostrar_error_campo('rol_description','rol_description_max_size_ko');
			return "rol_description_max_size_ko";
		}
		// Letras (con n con tilde y acentos), espacio y puntuacion espanola: . , ; : ? ! ( ) [ ] - " ' mas los signos de apertura de interrogacion y exclamacion y los puntos suspensivos
		// Sin digitos ni % & # @ $ < >. Dentro de la clase se escapan [ ] y -
		// equivale a: ^[letras .,;:?!()\[\]\-"' + signos de apertura + puntos suspensivos]*$
		if (!(this.validations.format('rol_description', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\\[\\]\\-"\'…]*$'))){
			this.dom.mostrar_error_campo('rol_description','rol_description_format_ko');
			return "rol_description_format_ko";
		}
		this.dom.mostrar_exito_campo('rol_description');
		return true;

	}



/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	ADD_submit_rol(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_rol = this.ADD_id_rol_validation();
		set_result.rol_name = this.ADD_rol_name_validation();
		set_result.rol_description = this.ADD_rol_description_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}



/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/


	EDIT_id_rol_validation(){

		return this.ADD_id_rol_validation();
	}

	EDIT_rol_name_validation(){

		return this.ADD_rol_name_validation();
	}

	EDIT_rol_description_validation(){

		return this.ADD_rol_description_validation();
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	EDIT_submit_rol(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_rol = this.EDIT_id_rol_validation();
		set_result.rol_name = this.EDIT_rol_name_validation();
		set_result.rol_description = this.EDIT_rol_description_validation();

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
//cualquier valor parcial ("adm", "Rol de ad") o vacio las cumple. El minimo lo controla min_size, que aqui no se llama.

//Atributo id_rol

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_id_rol_validation(){

		if (!(this.validations.max_size('id_rol',11))){
			this.dom.mostrar_error_campo('id_rol','id_rol_max_size_ko');
			return "id_rol_max_size_ko";
		}
		if (!(this.validations.format('id_rol', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_rol','id_rol_format_ko');
			return "id_rol_format_ko";
		}
		this.dom.mostrar_exito_campo('id_rol');
		return true;
	}

//Atributo rol_name

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_rol_name_validation(){

		if (!(this.validations.max_size('rol_name',48))){
			this.dom.mostrar_error_campo('rol_name','rol_name_max_size_ko');
			return "rol_name_max_size_ko";
		}
		if (!(this.validations.format('rol_name', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$'))){
			this.dom.mostrar_error_campo('rol_name','rol_name_format_ko');
			return "rol_name_format_ko";
		}
		this.dom.mostrar_exito_campo('rol_name');
		return true;
	}

//Atributo rol_description

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_rol_description_validation(){

		if (!(this.validations.max_size('rol_description',200))){
			this.dom.mostrar_error_campo('rol_description','rol_description_max_size_ko');
			return "rol_description_max_size_ko";
		}
		if (!(this.validations.format('rol_description', '^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\\[\\]\\-"\'…]*$'))){
			this.dom.mostrar_error_campo('rol_description','rol_description_format_ko');
			return "rol_description_format_ko";
		}
		this.dom.mostrar_exito_campo('rol_description');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	SEARCH_submit_rol(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_rol = this.SEARCH_id_rol_validation();
		set_result.rol_name = this.SEARCH_rol_name_validation();
		set_result.rol_description = this.SEARCH_rol_description_validation();

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
	 * Construye el formulario de ADD de rol y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono ADD) o cancelarla (icono BACK de index.html).
	 * - Cada campo se valida al salir de el (colocarvalidaciones) y todos se comprueban en el onsubmit antes de enviar al back.
	 * - Si el back responde ok, AbstractEntidad.ADD() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 */
	createForm_ADD(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rol_ADD');

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

		alert('crear formulario EDIT '+fila.id_rol);
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
