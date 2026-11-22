/**
 * @file Lógica de la interfaz de la entidad `rol`: formularios, validaciones y envío al back.
 */

/**
 * Entidad `rol`.
 *
 * Campos: id_rol (input, PK autoincremental: oculto en ADD, EDIT y DELETE; visible en SEARCH y SHOWCURRENT), rol_name (input), rol_description (textarea)
 *
 * Contiene los formularios de cada acción (ADD, EDIT, DELETE, SEARCH y SHOWCURRENT), las validaciones `ADD_/EDIT_/SEARCH_<campo>_validation()` de cada atributo, los `*_submit_*()` que las agrupan y el formato especial de los atributos de `mostrarespecial`. Las operaciones contra el back las hereda de `AbstractEntidad`.
 *
 * @extends AbstractEntidad
 * @property {string[]} columnasamostrar columnas que se muestran en la tabla de resultados
 * @property {string[]} mostrarespecial atributos que se muestran con un formato especial en la tabla (ver `cambiarmostrarespecial()`)
 * @property {string} nombreentidad nombre de la entidad: es el que identifica sus formularios, sus textos y sus peticiones al back
 * @property {entity_dom_fields} dom acceso al DOM (formularios, mensajes de error, tabla)
 * @property {entity_validations} validations validaciones de los campos del formulario
 * @property {ExternalAccess} access_functions acceso al back
 */
class rol extends AbstractEntidad {

	/**
	 * Crea la entidad `rol` e inicializa las columnas que se muestran en la tabla, los atributos con formato especial, el nombre de la entidad y los objetos de apoyo (`dom`, `validations` y `access_functions`).
	 *
	 * En modo normal muestra la sección de la tabla y los botones, pone el título de la página, crea el formulario vacío con `manual_form_creation()` y lanza `SEARCH()` con el formulario vacío para cargar los datos del back. Con `esTest = 'test'` solo se inicializan los atributos y no se toca el DOM.
	 *
	 * @param {?string} [esTest=null] pasar `'test'` para crear la entidad sin tocar el DOM (modo pruebas); con `null` se inicializa la interfaz de la entidad
	 */
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
	 * Devuelve el html del formulario de la entidad
	 * id_rol va como type='text' (no 'number'): el navegador vacia el value de un
	 * input number con "1a" y Validations.min_size lo daria por vacio.
	 * id_rol es autoincremental: su bloque (div_id_rol) se oculta en ADD, EDIT y DELETE (ver ocultar_id_rol()); en SEARCH y SHOWCURRENT se muestra.
	 *
	 * @returns {string} código HTML del formulario de la entidad
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<div id="div_id_rol">
			<label class="label_id_rol">Identificador del rol</label>
			<input type='text' id='id_rol' name='id_rol' />
			<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
			<br>
			</div>

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

//id_rol es autoincremental: el usuario no lo introduce en ADD ni lo modifica en EDIT, asi que en esos formularios va oculto y
//no se valida en sus submits. Si es criterio de busqueda: SEARCH lo muestra y SEARCH_submit_rol() valida SEARCH_id_rol_validation().
//Las pruebas de rol_tests.js ejecutan ADD_id_rol_validation() y SEARCH_id_rol_validation(). No hay tests de EDIT para id_rol porque
//no se edita; EDIT_id_rol_validation() se conserva solo por coherencia con colocarvalidaciones('form_iu','EDIT'), que asigna una
//validacion a cada campo del formulario, aunque el campo va oculto y nunca llega a validarse.

	/**
	 * Valida el atributo `id_rol` en la acción ADD.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño mínimo de 1 caracteres → `id_rol_min_size_ko`
	 * - tamaño máximo de 11 caracteres → `id_rol_max_size_ko`
	 * - formato `^[0-9]*$` → `id_rol_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

	/**
	 * Valida el atributo `rol_name` en la acción ADD.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño mínimo de 5 caracteres → `rol_name_min_size_ko`
	 * - tamaño máximo de 48 caracteres → `rol_name_max_size_ko`
	 * - formato `^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$` → `rol_name_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

	/**
	 * Valida el atributo `rol_description` en la acción ADD.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño mínimo de 5 caracteres → `rol_description_min_size_ko`
	 * - tamaño máximo de 200 caracteres → `rol_description_max_size_ko`
	 * - formato `^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\[\]\-"\'…]*$` → `rol_description_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

	/**
	 * Valida todos los campos del formulario de ADD de `rol`: `rol_name`, `rol_description`.
	 *
	 * Se ejecutan todas las validaciones (no se detiene en el primer error) para que se muestren todos los errores a la vez. Se invoca desde el `onsubmit` del formulario a través de `dom.validarsubmit()`.
	 *
	 * @returns {(boolean|Object<string, (boolean|string)>)} `true` si todos los campos son válidos; si no, un objeto que asocia el id de cada campo con `true` o con su código de error.
	 */
	ADD_submit_rol(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		// id_rol (autoincremental) no esta en el formulario: no se valida en el submit
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


	/**
	 * Valida el atributo `id_rol` en la acción EDIT. Las restricciones son las mismas que en ADD, por lo que delega en {@link rol#ADD_id_rol_validation}.
	 *
	 * @returns {(boolean|string)} Resultado de {@link rol#ADD_id_rol_validation}: `true` si el valor es válido o el código de error en caso contrario.
	 */
	EDIT_id_rol_validation(){

		return this.ADD_id_rol_validation();
	}

	/**
	 * Valida el atributo `rol_name` en la acción EDIT. Las restricciones son las mismas que en ADD, por lo que delega en {@link rol#ADD_rol_name_validation}.
	 *
	 * @returns {(boolean|string)} Resultado de {@link rol#ADD_rol_name_validation}: `true` si el valor es válido o el código de error en caso contrario.
	 */
	EDIT_rol_name_validation(){

		return this.ADD_rol_name_validation();
	}

	/**
	 * Valida el atributo `rol_description` en la acción EDIT. Las restricciones son las mismas que en ADD, por lo que delega en {@link rol#ADD_rol_description_validation}.
	 *
	 * @returns {(boolean|string)} Resultado de {@link rol#ADD_rol_description_validation}: `true` si el valor es válido o el código de error en caso contrario.
	 */
	EDIT_rol_description_validation(){

		return this.ADD_rol_description_validation();
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	/**
	 * Valida todos los campos del formulario de EDIT de `rol`: `rol_name`, `rol_description`.
	 *
	 * Se ejecutan todas las validaciones (no se detiene en el primer error) para que se muestren todos los errores a la vez. Se invoca desde el `onsubmit` del formulario a través de `dom.validarsubmit()`.
	 *
	 * @returns {(boolean|Object<string, (boolean|string)>)} `true` si todos los campos son válidos; si no, un objeto que asocia el id de cada campo con `true` o con su código de error.
	 */
	EDIT_submit_rol(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		// id_rol (autoincremental) no esta en el formulario: no se valida en el submit
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

	/**
	 * Valida el atributo `id_rol` en la acción SEARCH.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño máximo de 11 caracteres → `id_rol_max_size_ko`
	 * - formato `^[0-9]*$` → `id_rol_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

	/**
	 * Valida el atributo `rol_name` en la acción SEARCH.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño máximo de 48 caracteres → `rol_name_max_size_ko`
	 * - formato `^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ]*$` → `rol_name_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

	/**
	 * Valida el atributo `rol_description` en la acción SEARCH.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño máximo de 200 caracteres → `rol_description_max_size_ko`
	 * - formato `^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ .,;:¿?¡!()\[\]\-"\'…]*$` → `rol_description_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

	/**
	 * Valida todos los campos del formulario de SEARCH de `rol`: `id_rol`, `rol_name`, `rol_description`.
	 *
	 * Se ejecutan todas las validaciones (no se detiene en el primer error) para que se muestren todos los errores a la vez. Se invoca desde el `onsubmit` del formulario a través de `dom.validarsubmit()`.
	 *
	 * @returns {(boolean|Object<string, (boolean|string)>)} `true` si todos los campos son válidos; si no, un objeto que asocia el id de cada campo con `true` o con su código de error.
	 */
	SEARCH_submit_rol(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		// id_rol es criterio de busqueda (parcial, vacio = sin filtro): se valida en el submit
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

		// el id es autoincremental: no se muestra ni se envia, lo genera el back
		this.ocultar_id_rol(true);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	/**
	 * id_rol es autoincremental: el usuario no lo introduce ni lo modifica, asi que no se muestra en ADD, EDIT ni DELETE
	 * (se oculta el bloque completo: label, campo y mensaje de error). En SEARCH si se muestra, como criterio de busqueda.
	 * - deshabilitar = true (ADD): el campo no se envia al back (lo genera el back).
	 * - deshabilitar = false (EDIT): el campo oculto se queda habilitado y relleno con el id de la fila, porque es lo que usa
	 *   el back para identificar la tupla que se modifica.
	 *
	 * @param {boolean} deshabilitar true para que el campo no se envie al back
	 */
	ocultar_id_rol(deshabilitar){

		this.dom.hide_element('div_id_rol');
		document.getElementById('id_rol').disabled = deshabilitar;
	}

	/**
	 * Construye el formulario de EDIT de rol, relleno con los datos de la fila, y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono EDIT) o cancelarla (icono BACK de index.html).
	 * - id_rol (clave primaria autoincremental) no se muestra: va oculto, relleno con el id de la fila, para que el back identifique la tupla.
	 * - Si el back responde ok, AbstractEntidad.EDIT() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono EDIT
	 */
	createForm_EDIT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rol_EDIT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

		// el id no se muestra, pero se envia al back para identificar la tupla
		this.ocultar_id_rol(false);

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');

		// colocar boton de submit
		this.dom.colocarboton('EDIT');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_rol: valor(fila['id_rol']),
			rol_name: valor(fila['rol_name']),
			rol_description: valor(fila['rol_description'])
		});

		setLang();
	}

	/**
	 * Retorna true. En DELETE todos los campos van en solo lectura con los datos de la fila, asi que no hay nada que validar.
	 * Se mantiene para que el onsubmit tenga la misma forma que el de las demas acciones (ver createForm_DELETE()).
	 *
	 * @returns {boolean} siempre `true`
	 */
	DELETE_submit_rol(){

		return true;
	}

	/**
	 * Construye el formulario de DELETE de rol: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - Opciones del modal: confirmar el borrado (boton submit con el icono DELETE) o cancelarlo (icono BACK de index.html).
	 * - El boton de submit solo se coloca cuando el formulario ya esta relleno, para no poder enviar un borrado sin datos.
	 * - id_rol (clave primaria autoincremental) no se muestra: va oculto y relleno con el id de la fila, para que el back
	 *   identifique la tupla que se borra (igual que en EDIT).
	 * - Si el back responde ok, AbstractEntidad.DELETE() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono DELETE
	 */
	createForm_DELETE(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rol_DELETE');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.DELETE_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

		// el id no se muestra, pero se envia al back para identificar la tupla
		this.ocultar_id_rol(false);

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_rol: valor(fila['id_rol']),
			rol_name: valor(fila['rol_name']),
			rol_description: valor(fila['rol_description'])
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		// colocar boton de submit
		this.dom.colocarboton('DELETE');

		setLang();
	}

	/**
	 * Construye el formulario de SHOWCURRENT de rol: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - La unica opcion del modal es cerrarlo (icono BACK de index.html): no hay boton de submit ni se envia nada al back.
	 * - Es solo informativo, asi que aqui si se muestra el id_rol (el mismo que se ve en la tabla).
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono SHOWCURRENT
	 */
	createForm_SHOWCURRENT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rol_SHOWCURRENT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// el formulario no se envia
		this.dom.assign_property_value('form_iu','onsubmit','return false');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_rol: valor(fila['id_rol']),
			rol_name: valor(fila['rol_name']),
			rol_description: valor(fila['rol_description'])
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		setLang();
	}

	/**
	 * Construye el formulario de SEARCH de rol y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - La busqueda es parcial: todos los campos son opcionales, vacio significa "sin filtro" y basta con escribir un trozo
	 *   del valor (ver SEARCH_<campo>_validation: sin minimo, solo maximo y formato).
	 * - id_rol (numerico) tambien es criterio de busqueda: se muestra, se valida y se envia al back como el resto de campos.
	 * - Si el back responde, AbstractEntidad.SEARCH() oculta el formulario y muestra en la tabla las tuplas que coinciden.
	 */
	createForm_SEARCH(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rol_SEARCH');

		// formulario vacio y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

		// poner las validaciones (id_rol visible y habilitado: es criterio de busqueda)
		this.dom.colocarvalidaciones('form_iu','SEARCH');

		// colocar boton de submit
		this.dom.colocarboton('SEARCH');

		setLang();
	}

}
