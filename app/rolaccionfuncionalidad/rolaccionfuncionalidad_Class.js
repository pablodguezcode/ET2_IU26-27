class rolaccionfuncionalidad extends AbstractEntidad{

	constructor(esTest = null){
		super();

		this.columnasamostrar = ['id_funcionalidad', 'id_accion', 'id_rol'];
		this.mostrarespecial = ['atributoEspecial']; //ejemplo foto_persona
		this.nombreentidad = 'rolaccionfuncionalidad';

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


			<label class="label_id_funcionalidad">Funcionalidad</label>
			<select id='id_funcionalidad' name='id_funcionalidad'>
				<option value=""></option>
			</select>
			<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
			<br>

			<label class="label_id_accion">Acción</label>
			<select id='id_accion' name='id_accion'>
				<option value=""></option>
			</select>
			<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
			<br>

			<label class="label_id_rol">Rol</label>
			<select id='id_rol' name='id_rol'>
				<option value=""></option>
			</select>
			<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
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
				
		if (!(this.validations.format('id_funcionalidad', '^[0-9]{1,11}$'))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_format_ko');
			return "id_funcionalidad_format_ko";
		}		
		this.dom.mostrar_exito_campo('id_funcionalidad');
		return true;

	}

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
				
		if (!(this.validations.format('id_accion', '^[0-9]{1,11}$'))){
			this.dom.mostrar_error_campo('id_accion','id_accion_format_ko');
			return "id_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('id_accion');
		return true;
	}

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
				
		if (!(this.validations.format('id_rol', '^[0-9]{1,11}$'))){
			this.dom.mostrar_error_campo('id_rol','id_rol_format_ko');
			return "id_rol_format_ko";
		}
		this.dom.mostrar_exito_campo('id_rol');
		return true;
	}

	/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
	****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	ADD_submit_rolaccionfuncionalidad(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.ADD_id_funcionalidad_validation();
		set_result.id_accion = this.ADD_id_accion_validation();
		set_result.id_rol = this.ADD_id_rol_validation();

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

	EDIT_id_accion_validation(){
		return this.ADD_id_accion_validation();
	}

	EDIT_id_rol_validation(){
		return this.ADD_id_rol_validation();
	}

	/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
	****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	EDIT_submit_rolaccionfuncionalidad(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.EDIT_id_funcionalidad_validation();
		set_result.id_accion = this.EDIT_id_accion_validation();
		set_result.id_rol = this.EDIT_id_rol_validation();

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
				
		if (!(this.validations.format('id_funcionalidad', '^[0-9]{1,11}$'))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_format_ko');
			return "id_funcionalidad_format_ko";
		}
				
		this.dom.mostrar_exito_campo('id_funcionalidad');
		return true;

	}

//Atributo id_accion

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_id_accion_validation(){
		if (!(this.validations.max_size('id_accion',11))){
			this.dom.mostrar_error_campo('id_accion','id_accion_max_size_ko');
			return "id_accion_max_size_ko";
		}
				
		if (!(this.validations.format('id_accion', '^[0-9]{1,11}$'))){
			this.dom.mostrar_error_campo('id_accion','id_accion_format_ko');
			return "id_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('id_accion');
		return true;
	}

//Atributo id_rol

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_id_rol_validation(){
		if (!(this.validations.max_size('id_rol',11))){
			this.dom.mostrar_error_campo('id_rol','id_rol_max_size_ko');
			return "id_rol_max_size_ko";
		}
				
		if (!(this.validations.format('id_rol', '^[0-9]{1,11}$'))){
			this.dom.mostrar_error_campo('id_rol','id_rol_format_ko');
			return "id_rol_format_ko";
		}
		this.dom.mostrar_exito_campo('id_rol');
		return true;
	}

	/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
	****************************************************************************************************************************/

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().

	SEARCH_submit_rolaccionfuncionalidad(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.SEARCH_id_funcionalidad_validation();
		set_result.id_accion = this.SEARCH_id_accion_validation();
		set_result.id_rol = this.SEARCH_id_rol_validation();

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
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_ADD');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de un ADD anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu', 'ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de EDIT de rolaccionfuncionalidad, relleno con los datos de la fila, y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono EDIT) o cancelarla (icono BACK de index.html).
	 * - id_rolaccionfuncionalidad (clave primaria autoincremental) no se muestra: va oculto, relleno con el id de la fila, para que el back identifique la tupla.
	 * - Si el back responde ok, AbstractEntidad.EDIT() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono EDIT
	 */
	
	createForm_EDIT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_EDIT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.EDIT_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');

		// colocar boton de submit
		this.dom.colocarboton('EDIT');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_funcionalidad: valor(fila['id_funcionalidad']),
			id_accion: valor(fila['id_accion']),
			id_rol: valor(fila['id_rol'])
		});

		setLang();
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de SEARCH de rolaccionfuncionalidad y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - La busqueda es parcial: todos los campos son opcionales, vacio significa "sin filtro" y basta con escribir un trozo
	 *   del valor (ver SEARCH_<campo>_validation: sin minimo, solo maximo y formato).
	 * - id_rolaccionfuncionalidad es autoincremental y el usuario no lo conoce: no se muestra ni se envia como criterio de busqueda.
	 * - Si el back responde, AbstractEntidad.SEARCH() oculta el formulario y muestra en la tabla las tuplas que coinciden.
	 */
	createForm_SEARCH(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_SEARCH');

		// formulario vacio y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

		// los select se rellenan desde el back
		this.cargar_opciones();

		// poner las validaciones
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
	DELETE_submit_rolaccionfuncionalidad(){

		return true;
	}

	//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//-----------//

	/**
	 * Construye el formulario de DELETE de accion: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - Opciones del modal: confirmar el borrado (boton submit con el icono DELETE) o cancelarlo (icono BACK de index.html).
	 * - El boton de submit solo se coloca cuando el formulario ya esta relleno, para no poder enviar un borrado sin datos.
	 * - id_accion (clave primaria autoincremental) no se muestra: va oculto y relleno con el id de la fila, para que el back
	 *   identifique la tupla que se borra (igual que en EDIT).
	 * - Si el back responde ok, AbstractEntidad.DELETE() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono DELETE
	 */
	createForm_DELETE(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_DELETE');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.DELETE_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_funcionalidad: valor(fila['id_funcionalidad']),
			id_accion: valor(fila['id_accion']),
			id_rol: valor(fila['id_rol'])
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		// colocar boton de submit
		this.dom.colocarboton('DELETE');

		setLang();
	}

	/**
	 * Construye el formulario de SHOWCURRENT de rolaccionfuncionalidad: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - La unica opcion del modal es cerrarlo (icono BACK de index.html): no hay boton de submit ni se envia nada al back.
	 * - Es solo informativo, asi que aqui si se muestra el id_rolaccionfuncionalidad (el mismo que se ve en la tabla).
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono SHOWCURRENT
	 */
	createForm_SHOWCURRENT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_rolaccionfuncionalidad_SHOWCURRENT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// el formulario no se envia
		this.dom.assign_property_value('form_iu','onsubmit','return false');

		// rellenar los campos con los valores de la fila (el back puede devolver null en un campo)
		const valor = (dato) => (dato === undefined || dato === null) ? '' : dato;
		this.dom.rellenarvaloresform({
			id_funcionalidad: valor(fila['id_funcionalidad']),
			id_accion: valor(fila['id_accion']),
			id_rol: valor(fila['id_rol'])
			
		});

		// todos los campos en solo lectura
		this.dom.colocartodosreadonly('form_iu');

		setLang();
	}

	/***************************************************************************************************************************
                                 			Atributos con formato especial en la tabla
	****************************************************************************************************************************/

	/**
	 * Devuelve el formato especial con el que se muestra en la tabla el valor de un atributo incluido en mostrarespecial.
	 * El back devuelve cada clave foranea como el objeto completo y se muestra su nombre:
	 *  - id_funcionalidad: {id_funcionalidad, nombre_funcionalidad, descrip_funcionalidad} -> nombre_funcionalidad
	 *  - id_accion: {id_accion, nombre_accion, descrip_accion} -> nombre_accion
	 *  - id_rol: {id_rol, rol_name, rol_description} -> rol_name
	 * (si llegara como valor simple, se deja tal cual).
	 *
	 * @param {string} atributo nombre del atributo
	 * @param {*} valorentrada valor que manda el back
	 * @returns {*} valor a mostrar en la tabla
	 */
	mostrarcambioatributo(atributo, valorentrada){

		var campotexto = {id_funcionalidad: 'nombre_funcionalidad', id_accion: 'nombre_accion', id_rol: 'rol_name'};

		if (atributo in campotexto && valorentrada !== null && typeof valorentrada == 'object'){
			return (valorentrada[campotexto[atributo]] !== undefined) ? valorentrada[campotexto[atributo]] : valorentrada[atributo];
		}
		return valorentrada;
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

	/***************************************************************************************************************************
                                 			Carga de opciones de los select desde el back
****************************************************************************************************************************/

	/**
	 * pide al back el listado de una entidad y rellena con el un select del formulario actual
	 * (value y texto = el id, campovalor). La primera opcion vacia viene de manual_form_creation().
	 * Se envia un FormData vacio ('') para que los campos del formulario no lleguen a la otra entidad como filtro.
	 *
	 * @param {string} idselect id del select a rellenar
	 * @param {string} controlador entidad del back que se consulta
	 * @param {string} campovalor columna del back que va en value y se muestra como texto (solo se muestran ids)
	 */
	async cargar_select(idselect, controlador, campovalor){

		await this.access_functions.peticionBackGeneral('', controlador, 'SEARCH')
		.then((respuesta) => {

			var select = document.getElementById(idselect);
			//el formulario puede haberse repintado o no existir mientras llegaba la respuesta
			if (select == null){ return; }

			if (respuesta['code'] == 'RECORDSET_DATOS'){
				var valoractual = select.value;
				//dejo solo la opcion vacia para no duplicar opciones si se llama mas de una vez
				while (select.options.length > 1){
					select.remove(1);
				}
				for (let fila of respuesta['resource']){
					var opcion = document.createElement('option');
					opcion.value = fila[campovalor];
					opcion.text = fila[campovalor];
					select.append(opcion);
				}
				select.value = valoractual;
			}
		});

	}

	/**
	 * rellena los dos select del formulario: funcionalidades y acciones. Las dos peticiones son independientes y se lanzan a la vez;
	 * devuelve una promesa que se cumple cuando estan cargados los dos (SHOWCURRENT la espera para poder seleccionar los valores de la fila).
	 */
	async cargar_opciones(){

		await Promise.all([
			this.cargar_select('id_funcionalidad', 'funcionalidad', 'id_funcionalidad'),
			this.cargar_select('id_accion', 'accion', 'id_accion'),
			this.cargar_select('id_rol', 'rol', 'id_rol')
		]);

	}
}

