/* -----------------------------------------------------------------------------
   Entidad: accion
   Campos : id_accion (input, PK autoincremental: oculto en los formularios), nombre_accion (input), descrip_accion (textarea)
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
	 * id_accion es autoincremental: su bloque (div_id_accion) se oculta en ADD, EDIT y SEARCH (ver ocultar_id_accion()).
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<div id="div_id_accion">
			<label class="label_id_accion">Identificador de la acci&oacute;n</label>
			<input type='text' id='id_accion' name='id_accion' />
			<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
			<br>
			</div>

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

//id_accion es autoincremental: el usuario no lo introduce ni lo conoce, asi que no esta en los formularios ADD, EDIT ni SEARCH
//y tampoco se valida en los submits. Se mantienen sus validaciones ADD_, EDIT_ y SEARCH_id_accion_validation() porque las pruebas
//de accion_tests.js (entrega ET1) las ejecutan.

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

		// id_accion (autoincremental) no esta en el formulario: no se valida en el submit
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

		// id_accion (autoincremental) no esta en el formulario: no se valida en el submit
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

		// id_accion (autoincremental) no esta en el formulario: no se valida en el submit
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

		// el id es autoincremental: no se muestra ni se envia, lo genera el back
		this.ocultar_id_accion(true);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	/**
	 * id_accion es autoincremental: el usuario no lo introduce ni lo conoce, asi que no se muestra en ADD, EDIT ni SEARCH
	 * (se oculta el bloque completo: label, campo y mensaje de error).
	 * - deshabilitar = true (ADD y SEARCH): el campo no se envia al back (en ADD lo genera el back; en SEARCH no se filtra por el).
	 * - deshabilitar = false (EDIT): el campo oculto se queda habilitado y relleno con el id de la fila, porque es lo que usa
	 *   el back para identificar la tupla que se modifica.
	 *
	 * @param {boolean} deshabilitar true para que el campo no se envie al back
	 */
	ocultar_id_accion(deshabilitar){

		this.dom.hide_element('div_id_accion');
		document.getElementById('id_accion').disabled = deshabilitar;
	}

	/**
	 * Construye el formulario de EDIT de accion, relleno con los datos de la fila, y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono EDIT) o cancelarla (icono BACK de index.html).
	 * - id_accion (clave primaria autoincremental) no se muestra: va oculto, relleno con el id de la fila, para que el back identifique la tupla.
	 * - Si el back responde ok, AbstractEntidad.EDIT() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono EDIT
	 */
	createForm_EDIT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_accion_EDIT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

		// el id no se muestra, pero se envia al back para identificar la tupla
		this.ocultar_id_accion(false);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');

		// colocar boton de submit
		this.dom.colocarboton('EDIT');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_accion: valor(fila['id_accion']),
			nombre_accion: valor(fila['nombre_accion']),
			descrip_accion: valor(fila['descrip_accion'])
		});

		setLang();
	}

	//Stub (alert): el formulario de DELETE todavia no esta implementado (se mantiene tal y como estaba en la entrega anterior).

	createForm_DELETE(){
		alert('crear formulario DELETE');
	}

	/**
	 * Construye el formulario de SHOWCURRENT de accion: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - La unica opcion del modal es cerrarlo (icono BACK de index.html): no hay boton de submit ni se envia nada al back.
	 * - Es solo informativo, asi que aqui si se muestra el id_accion (el mismo que se ve en la tabla).
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono SHOWCURRENT
	 */
	createForm_SHOWCURRENT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_accion_SHOWCURRENT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// el formulario no se envia
		this.dom.assign_property_value('form_iu','onsubmit','return false');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_accion: valor(fila['id_accion']),
			nombre_accion: valor(fila['nombre_accion']),
			descrip_accion: valor(fila['descrip_accion'])
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		setLang();
	}

	/**
	 * Construye el formulario de SEARCH de accion y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - La busqueda es parcial: todos los campos son opcionales, vacio significa "sin filtro" y basta con escribir un trozo
	 *   del valor (ver SEARCH_<campo>_validation: sin minimo, solo maximo y formato).
	 * - id_accion es autoincremental y el usuario no lo conoce: no se muestra ni se envia como criterio de busqueda.
	 * - Si el back responde, AbstractEntidad.SEARCH() oculta el formulario y muestra en la tabla las tuplas que coinciden.
	 */
	createForm_SEARCH(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_accion_SEARCH');

		// formulario vacio y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

		// el id no es criterio de busqueda
		this.ocultar_id_accion(true);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','SEARCH');

		// colocar boton de submit
		this.dom.colocarboton('SEARCH');

		setLang();
	}

}
