class funcionalidad extends AbstractEntidad{

	constructor(esTest = null){
		super();

		this.columnasamostrar = ['id_funcionalidad','nombre_funcionalidad', 'descrip_funcionalidad'];
		this.mostrarespecial = [];
		this.nombreentidad = 'funcionalidad';

		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();

		//init
		if (esTest == 'test'){

		}
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
	 * replace the content of section element with a particular entity menu
	 * @returns 
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>

			<div id="div_id_funcionalidad" class="div_id_funcionalidad">
			<label class="label_id_funcionalidad">Identificador de la funcionalidad</label>
			<input type='text' id='id_funcionalidad' name='id_funcionalidad' />
			<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
			<br>
			</div>

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

		// id_funcionalidad (autoincremental) no se pide en el formulario: no se valida en el submit
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

	//id_funcionalidad no se edita (es autoincremental): no hay tests de EDIT para este campo y EDIT_submit_funcionalidad() no lo valida.
	//EDIT_id_funcionalidad_validation() se conserva solo por coherencia con colocarvalidaciones('form_iu','EDIT'), que asigna una
	//validacion a cada campo del formulario, aunque el campo va oculto y nunca llega a validarse.
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

		// id_funcionalidad (autoincremental) va oculto y no se edita: no se valida en el submit
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

	/**
	 * Construye el formulario de ADD de funcionalidad y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono ADD) o cancelarla (icono BACK de index.html).
	 * - Cada campo se valida al salir de el (colocarvalidaciones) y todos se comprueban en el onsubmit antes de enviar al back.
	 * - Si el back responde ok, AbstractEntidad.ADD() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 */

	createForm_ADD(){
		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_ADD');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de un ADD anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

		// el id es autoincremental: no se muestra ni se envia, lo genera el back
		this.ocultar_id_funcionalidad(true);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu', 'ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * id_funcionalidad es autoincremental: el usuario no lo introduce ni lo modifica, asi que no se muestra en ADD, EDIT ni DELETE
	 * (se oculta el bloque completo: label, campo y mensaje de error). En SEARCH si se muestra, como criterio de busqueda.
	 * - deshabilitar = true (ADD): el campo no se envia al back (lo genera el back).
	 * - deshabilitar = false (EDIT): el campo oculto se queda habilitado y relleno con el id de la fila, porque es lo que usa
	 *   el back para identificar la tupla que se modifica.
	 *
	 * @param {boolean} deshabilitar true para que el campo no se envie al back
	 */
	ocultar_id_funcionalidad(deshabilitar){

		this.dom.hide_element('div_id_funcionalidad');
		document.getElementById('id_funcionalidad').disabled = deshabilitar;
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de EDIT de funcionalidad, relleno con los datos de la fila, y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono EDIT) o cancelarla (icono BACK de index.html).
	 * - id_funcionalidad (clave primaria autoincremental) no se muestra: va oculto, relleno con el id de la fila, para que el back identifique la tupla.
	 * - Si el back responde ok, AbstractEntidad.EDIT() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono EDIT
	 */
	
	createForm_EDIT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_EDIT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

		// el id no se muestra, pero se envia al back para identificar la tupla
		this.ocultar_id_funcionalidad(false);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');

		// colocar boton de submit
		this.dom.colocarboton('EDIT');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_funcionalidad: valor(fila['id_funcionalidad']),
			nombre_funcionalidad: valor(fila['nombre_funcionalidad']),
			descrip_funcionalidad: valor(fila['descrip_funcionalidad'])
		});

		setLang();
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de SEARCH de funcionalidad y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - La busqueda es parcial: todos los campos son opcionales, vacio significa "sin filtro" y basta con escribir un trozo
	 *   del valor (ver SEARCH_<campo>_validation: sin minimo, solo maximo y formato).
	 * - id_funcionalidad (numerico) tambien es criterio de busqueda: se muestra, se valida y se envia al back como el resto de campos.
	 * - Si el back responde, AbstractEntidad.SEARCH() oculta el formulario y muestra en la tabla las tuplas que coinciden.
	 */
	createForm_SEARCH(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_SEARCH');

		// formulario vacio y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

		// poner las validaciones (id_funcionalidad visible y habilitado: es criterio de busqueda)
		this.dom.colocarvalidaciones('form_iu','SEARCH');

		// colocar boton de submit
		this.dom.colocarboton('SEARCH');

		setLang();
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Retorna true. En DELETE todos los campos van en solo lectura con los datos de la fila, asi que no hay nada que validar.
	 * Se mantiene para que el onsubmit tenga la misma forma que el de las demas acciones (ver createForm_DELETE()).
	 */
	DELETE_submit_funcionalidad(){

		return true;
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de DELETE de funcionalidad: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - Opciones del modal: confirmar el borrado (boton submit con el icono DELETE) o cancelarlo (icono BACK de index.html).
	 * - El boton de submit solo se coloca cuando el formulario ya esta relleno, para no poder enviar un borrado sin datos.
	 * - id_funcionalidad (clave primaria autoincremental) no se muestra: va oculto y relleno con el id de la fila, para que el back
	 *   identifique la tupla que se borra (igual que en EDIT).
	 * - Si el back responde ok, AbstractEntidad.DELETE() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono DELETE
	 */
	createForm_DELETE(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_DELETE');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.DELETE_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

		// el id no se muestra, pero se envia al back para identificar la tupla
		this.ocultar_id_funcionalidad(false);

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_funcionalidad: valor(fila['id_funcionalidad']),
			nombre_funcionalidad: valor(fila['nombre_funcionalidad']),
			descrip_funcionalidad: valor(fila['descrip_funcionalidad'])
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		// colocar boton de submit
		this.dom.colocarboton('DELETE');

		setLang();
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de SHOWCURRENT de funcionalidad: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - La unica opcion del modal es cerrarlo (icono BACK de index.html): no hay boton de submit ni se envia nada al back.
	 * - Es solo informativo, asi que aqui si se muestra el id_funcionalidad (el mismo que se ve en la tabla).
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono SHOWCURRENT
	 */
	createForm_SHOWCURRENT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_SHOWCURRENT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// el formulario no se envia
		this.dom.assign_property_value('form_iu','onsubmit','return false');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_funcionalidad: valor(fila['id_funcionalidad']),
			nombre_funcionalidad: valor(fila['nombre_funcionalidad']),
			descrip_funcionalidad: valor(fila['descrip_funcionalidad'])
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		setLang();
	}
}

