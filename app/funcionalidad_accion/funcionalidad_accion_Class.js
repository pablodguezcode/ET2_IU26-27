/**
 * @file Lógica de la interfaz de la entidad `funcionalidad_accion`: formularios, validaciones y envío al back.
 */

/**
 * Entidad `funcionalidad_accion`: asignación de acciones a funcionalidades, con clave primaria compuesta por `id_funcionalidad` e `id_accion`.
 *
 * No tiene formulario de ADD: se muestra como una matriz de casillas (funcionalidades en las filas, acciones en las columnas) y marcar o desmarcar una casilla crea o borra la pareja en el back (ver {@link funcionalidad_accion#cambiar_pareja}).
 *
 * @extends AbstractEntidad
 * @property {string[]} columnasamostrar columnas que se muestran en la tabla de resultados
 * @property {string[]} mostrarespecial atributos que se muestran con un formato especial en la tabla (ver `cambiarmostrarespecial()`)
 * @property {string} nombreentidad nombre de la entidad: es el que identifica sus formularios, sus textos y sus peticiones al back
 * @property {entity_dom_fields} dom acceso al DOM (formularios, mensajes de error, tabla)
 * @property {entity_validations} validations validaciones de los campos del formulario
 * @property {ExternalAccess} access_functions acceso al back
 */
class funcionalidad_accion extends AbstractEntidad {

	/**
	 * Crea la entidad `funcionalidad_accion` e inicializa las columnas que se muestran en la tabla, los atributos con formato especial, el nombre de la entidad y los objetos de apoyo (`dom`, `validations` y `access_functions`).
	 *
	 * En modo normal muestra la sección de la tabla y los botones, pone el título de la página, crea el formulario vacío con `manual_form_creation()` y lanza `SEARCH()` con el formulario vacío para cargar los datos del back. Con `esTest = 'test'` solo se inicializan los atributos y no se toca el DOM.
	 *
	 * Al ser una matriz, oculta el selector de columnas visibles y el icono ADD de index.html (`dom.sin_boton_add`): los únicos iconos son SEARCH y TEST.
	 *
	 * @param {?string} [esTest=null] pasar `'test'` para crear la entidad sin tocar el DOM (modo pruebas); con `null` se inicializa la interfaz de la entidad
	 */
	constructor(esTest=null){

		super();

		this.columnasamostrar = ['id_funcionalidad','id_accion'];
		// id_funcionalidad e id_accion son columnas con tratamiento especial: el back las devuelve como el objeto de la
		// funcionalidad y de la accion y en la tabla se muestra solo su id (ver mostrarcambioatributo)
		this.mostrarespecial = ['id_funcionalidad','id_accion'];
		this.nombreentidad = 'funcionalidad_accion';

		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();

		//init
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';
			document.getElementById('text_title_page').className = 'text_titulo_page_'+this.nombreentidad;

			// el selector de columnas visibles no aplica a la matriz (lo vuelve a mostrar entity_dom_fields.crearSeleccionablecolumnas() en las demas entidades)
			document.getElementById('label_seleccioncolumnas').style.display = 'none';
			document.getElementById('seleccioncolumnas').style.display = 'none';

			// esta entidad no tiene ADD (las parejas se crean y se borran marcando y desmarcando la matriz): los unicos iconos son SEARCH y TEST.
			// Se oculta el icono ADD de index.html; entity_dom_fields lo vuelve a mostrar en las demas entidades (ver actualizar_boton_add())
			this.dom.sin_boton_add = true;
			this.dom.actualizar_boton_add();

			//crear el formulario vacio
			document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();

			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}

	}

	/**
	 * Devuelve el html del formulario de la entidad
	 *
	 * @returns {string} código HTML del formulario de la entidad
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_id_funcionalidad">Funcionalidad</label>
			<select id='id_funcionalidad' name='id_funcionalidad'>
				<!-- la primera opcion vacia permite que min_size falle si no se elige funcionalidad (y es "sin filtro" en SEARCH).
				     Las demas opciones (value y texto = id_funcionalidad) las rellena cargar_opciones() desde el back. -->
				<option value=""></option>
			</select>
			<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
			<br>

			<label class="label_id_accion">Acción</label>
			<select id='id_accion' name='id_accion'>
				<!-- igual que id_funcionalidad: opciones (value y texto = id_accion) rellenadas por cargar_opciones() -->
				<option value=""></option>
			</select>
			<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
			<br>
			</form>
		`;
		return form_content;

	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/

//id_funcionalidad e id_accion son la clave primaria compuesta y claves foraneas: ambos son select
//Esta entidad no tiene formulario de ADD: las parejas se crean marcando la matriz (ver cambiar_pareja()). Las validaciones ADD_ se mantienen
//porque los tests de ET1 (funcionalidad_accion_tests.js) las ejecutan, igual que las de EDIT.

//Atributo id_funcionalidad

	/**
	 * Valida el atributo `id_funcionalidad` en la acción ADD.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño mínimo de 1 caracteres → `id_funcionalidad_min_size_ko`
	 * - tamaño máximo de 11 caracteres → `id_funcionalidad_max_size_ko`
	 * - formato `^[0-9]*$` → `id_funcionalidad_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * Nota: min_size falla si se deja la opcion vacia
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
	ADD_id_funcionalidad_validation(){

		if (!(this.validations.min_size('id_funcionalidad',1))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_min_size_ko');
			return "id_funcionalidad_min_size_ko";
		}
		if (!(this.validations.max_size('id_funcionalidad',11))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_max_size_ko');
			return "id_funcionalidad_max_size_ko";
		}
		//solo digitos
		if (!(this.validations.format('id_funcionalidad', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_funcionalidad','id_funcionalidad_format_ko');
			return "id_funcionalidad_format_ko";
		}
		this.dom.mostrar_exito_campo('id_funcionalidad');
		return true;
	}

//Atributo id_accion

	/**
	 * Valida el atributo `id_accion` en la acción ADD.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño mínimo de 1 caracteres → `id_accion_min_size_ko`
	 * - tamaño máximo de 11 caracteres → `id_accion_max_size_ko`
	 * - formato `^[0-9]*$` → `id_accion_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * Nota: min_size falla si se deja la opcion vacia
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
	ADD_id_accion_validation(){

		if (!(this.validations.min_size('id_accion',1))){
			this.dom.mostrar_error_campo('id_accion','id_accion_min_size_ko');
			return "id_accion_min_size_ko";
		}
		if (!(this.validations.max_size('id_accion',11))){
			this.dom.mostrar_error_campo('id_accion','id_accion_max_size_ko');
			return "id_accion_max_size_ko";
		}
		//solo digitos
		if (!(this.validations.format('id_accion', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_accion','id_accion_format_ko');
			return "id_accion_format_ko";
		}
		this.dom.mostrar_exito_campo('id_accion');
		return true;
	}


/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/

//Esta entidad especial no tiene formulario de EDIT en el front (una pareja no se modifica: se desmarca y se marca otra), pero los tests de ET1 definen
//EDIT para sus dos atributos (ver funcionalidad_accion_tests.js) y Data_Test invoca EDIT_<campo>_validation(). Las restricciones de
//EDIT son las mismas que las de ADD, por lo que se reutilizan.

	/**
	 * Valida el atributo `id_funcionalidad` en la acción EDIT. Las restricciones son las mismas que en ADD, por lo que delega en {@link funcionalidad_accion#ADD_id_funcionalidad_validation}.
	 *
	 * @returns {(boolean|string)} Resultado de {@link funcionalidad_accion#ADD_id_funcionalidad_validation}: `true` si el valor es válido o el código de error en caso contrario.
	 */
	EDIT_id_funcionalidad_validation(){

		return this.ADD_id_funcionalidad_validation();
	}

	/**
	 * Valida el atributo `id_accion` en la acción EDIT. Las restricciones son las mismas que en ADD, por lo que delega en {@link funcionalidad_accion#ADD_id_accion_validation}.
	 *
	 * @returns {(boolean|string)} Resultado de {@link funcionalidad_accion#ADD_id_accion_validation}: `true` si el valor es válido o el código de error en caso contrario.
	 */
	EDIT_id_accion_validation(){

		return this.ADD_id_accion_validation();
	}



/***************************************************************************************************************************
                                 			Campos de validacion para SEARCH
****************************************************************************************************************************/

//En SEARCH no hay min_size: el filtro es opcional y vacio significa "sin filtro". Si hay maximo y formato.

//Atributo id_funcionalidad

	/**
	 * Valida el atributo `id_funcionalidad` en la acción SEARCH.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño máximo de 11 caracteres → `id_funcionalidad_max_size_ko`
	 * - formato `^[0-9]*$` → `id_funcionalidad_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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

//Atributo id_accion

	/**
	 * Valida el atributo `id_accion` en la acción SEARCH.
	 *
	 * Comprobaciones, en este orden (se devuelve el primer error y se muestra con `dom.mostrar_error_campo`):
	 * - tamaño máximo de 11 caracteres → `id_accion_max_size_ko`
	 * - formato `^[0-9]*$` → `id_accion_format_ko`
	 *
	 * Si todas se cumplen, el campo se marca como correcto con `dom.mostrar_exito_campo`.
	 *
	 * @returns {(boolean|string)} `true` si el valor es válido; si no, el código de error de la primera comprobación que falla.
	 */
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



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	/**
	 * Valida todos los campos del formulario de SEARCH de `funcionalidad_accion`: `id_funcionalidad`, `id_accion`.
	 *
	 * Se ejecutan todas las validaciones (no se detiene en el primer error) para que se muestren todos los errores a la vez. Se invoca desde el `onsubmit` del formulario a través de `dom.validarsubmit()`.
	 *
	 * @returns {(boolean|Object<string, (boolean|string)>)} `true` si todos los campos son válidos; si no, un objeto que asocia el id de cada campo con `true` o con su código de error.
	 */
	SEARCH_submit_funcionalidad_accion(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.id_funcionalidad = this.SEARCH_id_funcionalidad_validation();
		set_result.id_accion = this.SEARCH_id_accion_validation();

		// si todos los campos son correctos devuelve true; si no, el objeto con los resultados
		if (Object.values(set_result).every(valor => valor === true)){
			return true;
		}
		return set_result;
	}

/***************************************************************************************************************************
                                                     FORMULARIOS
****************************************************************************************************************************/

	//Esta entidad solo tiene el formulario de SEARCH (filtros de la matriz). No hay createForm_ADD (las parejas se crean marcando la
	//matriz), ni createForm_EDIT, createForm_DELETE ni createForm_SHOWCURRENT (no hay iconos por fila: la matriz no es una tabla de tuplas).


	/**
	 * Construye el formulario de SEARCH de funcionalidad_accion y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - Los dos campos son opcionales: la opcion vacia de cada select significa "sin filtro" (ver SEARCH_<campo>_validation).
	 * - Si el back responde, AbstractEntidad.SEARCH() oculta el formulario y muestra en la tabla las tuplas que coinciden.
	 */
	createForm_SEARCH(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_funcionalidad_accion_SEARCH');

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

	/**
	 * El back devuelve las claves foraneas como el objeto completo (p.e. {id_accion, nombre_accion, descrip_accion}) o como valor simple.
	 * Devuelve siempre el valor de la clave.
	 *
	 * @param {*} valor valor de la fila para el atributo
	 * @param {string} atributo nombre del atributo
	 * @returns {*} valor de la clave
	 */
	valorclave(valor, atributo){

		if (valor !== null && typeof valor == 'object'){
			return valor[atributo];
		}
		return valor;
	}



/***************************************************************************************************************************
                                 			Visualizacion en matriz (entidad especial)
****************************************************************************************************************************/

	/**
	 * funcionalidad_accion es una entidad especial: no permite EDIT ni DELETE y no se muestra como una tabla de tuplas, sino como una
	 * matriz que se construye con los datos de las otras tablas:
	 *  - filas: las funcionalidades, ordenadas por id_funcionalidad
	 *  - columnas: las acciones, ordenadas por id_accion
	 *  - casilla marcada: existe la pareja (id_funcionalidad, id_accion) en funcionalidad_accion
	 *
	 * Refactoriza AbstractEntidad.SEARCH() (misma definicion): los filtros del formulario de busqueda (vacio = sin filtro)
	 * limitan las filas y columnas que se muestran.
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async SEARCH(){

		// filtros del formulario (en el constructor y tras un ADD el formulario esta vacio: sin filtro)
		var form = document.getElementById('form_iu');
		var filtrofuncionalidad = (form != null && form.elements['id_funcionalidad']) ? form.elements['id_funcionalidad'].value : '';
		var filtroaccion = (form != null && form.elements['id_accion']) ? form.elements['id_accion'].value : '';

		// las tres peticiones son independientes y se lanzan a la vez. Funcionalidades y acciones se piden sin filtro (formulario '')
		// y la de funcionalidad_accion con el formulario, que lleva los filtros. El back pagina sus listados (ver pedir_todo()),
		// asi que cada peticion trae todas las paginas
		var resultados = await Promise.all([
			this.pedir_todo('', 'funcionalidad'),
			this.pedir_todo('', 'accion'),
			this.pedir_todo('form_iu', this.nombreentidad)
		]);

		// ocultar y limpiar el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.hide_element('Div_IU_form');

		var funcionalidades = resultados[0].filas;
		var acciones = resultados[1].filas;
		var parejas = resultados[2].filas;

		// aplicar los filtros y ordenar por id
		funcionalidades = funcionalidades.filter(fila => filtrofuncionalidad == '' || fila['id_funcionalidad'] == filtrofuncionalidad)
			.sort((a, b) => Number(a['id_funcionalidad']) - Number(b['id_funcionalidad']));
		acciones = acciones.filter(fila => filtroaccion == '' || fila['id_accion'] == filtroaccion)
			.sort((a, b) => Number(a['id_accion']) - Number(b['id_accion']));

		// si el back no ha dejado pedir las paginas siguientes de las parejas, se piden las de cada funcionalidad que se va a mostrar
		if (!resultados[2].completo){
			parejas = await this.parejas_por_funcionalidad(funcionalidades);
		}

		// parejas existentes como "idfuncionalidad_idaccion" (el back puede devolver cada clave como objeto o como valor simple)
		var existentes = new Set(parejas.map(fila =>
			this.valorclave(fila['id_funcionalidad'], 'id_funcionalidad') + '_' + this.valorclave(fila['id_accion'], 'id_accion')));

		var contenedor = document.getElementById('IU_manage_table');
		contenedor.style.display = 'block';

		if (funcionalidades.length == 0 || acciones.length == 0){
			// el mensaje va en un span con la clave de idioma (y no en el contenedor): AbstractEntidad.SEARCH() deja la clase
			// RECORDSET_VACIO en el contenedor y setLang() vaciaria despues la tabla de cualquier entidad que la pinte ahi
			contenedor.className = '';
			contenedor.innerHTML = '<span class="RECORDSET_VACIO">No se han encontrado elementos que coincidan con la búsqueda</span>';
		}
		else{
			// sin la clase del mensaje de vacio, para que setLang() no sustituya la matriz por el texto
			contenedor.className = '';
			contenedor.innerHTML = '';
			contenedor.append(this.crearMatriz(funcionalidades, acciones, existentes));
		}

		setLang();
	}

	/**
	 * El back pagina las respuestas de SEARCH: devuelve una pagina de filas (resource) y, junto a ella, total (filas que cumplen la busqueda),
	 * empieza (posicion de la primera fila de la pagina) y filas (cuantas trae esta pagina). Con la primera pagina solo se veria una parte de
	 * las tuplas (las mas recientes, como las parejas que se acaban de marcar, quedaban fuera y la matriz no las mostraba al recargar), asi que
	 * se van pidiendo las siguientes (empieza = filas ya recibidas) hasta tener total filas.
	 * Si el back no respeta empieza (devuelve otra vez desde el principio) o deja de devolver filas se para para no repetirlas, y se indica
	 * en completo = false que faltan filas.
	 *
	 * @async
	 * @param {string} formulario id del formulario cuyos campos se envian como criterios de busqueda ('' = sin criterios)
	 * @param {string} controlador entidad del back que se consulta
	 * @returns {Promise<{filas: Array, completo: boolean}>} las filas de todas las paginas y si estan todas
	 */
	async pedir_todo(formulario, controlador){

		var respuesta = await this.access_functions.peticionBackGeneral(formulario, controlador, 'SEARCH');
		var filas = this.filasdelback(respuesta).slice();
		var total = Number(respuesta['total']);

		while (!isNaN(total) && filas.length < total){

			var siguiente = await this.access_functions.peticionBackGeneral(formulario, controlador, 'SEARCH',
				{empieza: filas.length, filas: total - filas.length});
			var nuevas = this.filasdelback(siguiente);

			if (nuevas.length == 0 || Number(siguiente['empieza']) != filas.length){
				break;
			}
			filas = filas.concat(nuevas);
		}

		return {filas: filas, completo: isNaN(total) || filas.length >= total};
	}

	/**
	 * Alternativa a pedir_todo() para las parejas si el back no deja pedir las paginas siguientes: se piden las parejas de cada
	 * funcionalidad mostrada (el criterio id_funcionalidad si lo respeta el back) y se juntan.
	 *
	 * @async
	 * @param {Array} funcionalidades funcionalidades que se muestran en la matriz
	 * @returns {Promise<Array>} parejas de esas funcionalidades
	 */
	async parejas_por_funcionalidad(funcionalidades){

		var grupos = await Promise.all(funcionalidades.map(fila =>
			this.access_functions.peticionBackGeneral('', this.nombreentidad, 'SEARCH', {id_funcionalidad: fila['id_funcionalidad']})
			.then(respuesta => this.filasdelback(respuesta))));

		return grupos.flat();
	}

	/**
	 * Devuelve las filas de una respuesta del back, o un array vacio si no hay datos
	 *
	 * @param {Object} respuesta respuesta del back a un SEARCH
	 * @returns {Array} filas
	 */
	filasdelback(respuesta){

		return (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
	}

	/**
	 * Construye la tabla de la matriz: una fila por funcionalidad, una columna por accion y una casilla marcada si la pareja existe.
	 * La matriz es editable de forma permanente: marcar una casilla crea la pareja (ADD) y desmarcarla la borra (DELETE), ver cambiar_pareja().
	 * Las cabeceras muestran el texto traducido de la entidad, el id y el nombre (p.e. "Funcionalidad 3 - Gestion roles", "Acción 2 - modificar").
	 *
	 * @param {Array} funcionalidades filas de funcionalidad, ya filtradas y ordenadas
	 * @param {Array} acciones filas de accion, ya filtradas y ordenadas
	 * @param {Set} existentes parejas existentes, como "idfuncionalidad_idaccion"
	 * @returns {HTMLTableElement} tabla
	 */
	crearMatriz(funcionalidades, acciones, existentes){

		var tabla = document.createElement('table');
		tabla.id = 'tabla_matriz_funcionalidad_accion';
		tabla.style.borderCollapse = 'collapse';

		// celda con el estilo comun a toda la matriz
		const celda = (tag) => {
			var elemento = document.createElement(tag);
			elemento.style.border = '1px solid black';
			elemento.style.padding = '4px 10px';
			elemento.style.textAlign = 'center';
			return elemento;
		};

		// cabecera de una fila o de una columna: texto traducido (clave de idioma como class: setLang() lo sustituye por "Funcionalidad" / "Acción"
		// o "Feature" / "Action") seguido de "id - nombre"
		const cabecera = (clavetexto, id, nombre) => {
			var th = celda('th');
			var texto = document.createElement('span');
			texto.className = clavetexto;
			th.append(texto);
			th.append(' ' + id + ((nombre !== undefined && nombre !== null) ? ' - ' + nombre : ''));
			return th;
		};

		// fila de cabecera: celda vacia en la esquina y una cabecera por accion
		var trcabecera = document.createElement('tr');
		trcabecera.append(celda('th'));
		for (var accion of acciones){
			trcabecera.append(cabecera('text_matriz_accion', accion['id_accion'], accion['nombre_accion']));
		}
		var thead = document.createElement('thead');
		thead.append(trcabecera);
		tabla.append(thead);

		// una fila por funcionalidad con una casilla por accion
		var tbody = document.createElement('tbody');
		for (const funcionalidad of funcionalidades){
			var tr = document.createElement('tr');
			tr.append(cabecera('text_matriz_funcionalidad', funcionalidad['id_funcionalidad'], funcionalidad['nombre_funcionalidad']));
			for (const accion of acciones){
				var td = celda('td');
				// const (y no var): el listener de cada casilla debe referirse a SU casilla y no a la ultima creada
				const casilla = document.createElement('input');
				casilla.type = 'checkbox';
				casilla.id = 'casilla_' + funcionalidad['id_funcionalidad'] + '_' + accion['id_accion'];
				casilla.checked = existentes.has(funcionalidad['id_funcionalidad'] + '_' + accion['id_accion']);
				// cada cambio de la casilla se envia al back (marcar = ADD, desmarcar = DELETE)
				casilla.addEventListener('change', () => this.cambiar_pareja(casilla, funcionalidad['id_funcionalidad'], accion['id_accion']));
				td.append(casilla);
				tr.append(td);
			}
			tbody.append(tr);
		}
		tabla.append(tbody);

		return tabla;
	}

	/**
	 * Se ejecuta al marcar o desmarcar una casilla de la matriz: marcar crea la pareja (ADD) y desmarcar la borra (DELETE).
	 * La casilla queda deshabilitada mientras llega la respuesta del back. El back permite parejas repetidas, por lo que antes de crear una pareja se comprueba que no exista ya (ver {@link funcionalidad_accion#existe_pareja}). Si el back responde error, la casilla vuelve al estado que tenía y se muestra el modal de error (el usuario confirma que lo ha recibido y la matriz sigue como antes de la petición). Si responde ok, la casilla se queda con el nuevo estado. No se repinta la matriz: así se conservan los filtros de SEARCH.
	 *
	 * @async
	 * @param {HTMLInputElement} casilla casilla que ha cambiado
	 * @param {*} idfuncionalidad id de la funcionalidad (fila) de la casilla
	 * @param {*} idaccion id de la acción (columna) de la casilla
	 * @returns {Promise<void>}
	 */
	async cambiar_pareja(casilla, idfuncionalidad, idaccion){

		var marcada = casilla.checked;
		casilla.disabled = true;

		// el back permite parejas repetidas: si se marca una pareja que ya existe no se vuelve a crear
		if (marcada && (await this.existe_pareja(idfuncionalidad, idaccion))){
			casilla.disabled = false;
			return;
		}

		var respuesta = await this.access_functions.peticionBackGeneral('', this.nombreentidad, marcada ? 'ADD' : 'DELETE',
			{id_funcionalidad: idfuncionalidad, id_accion: idaccion});

		if (!respuesta['ok']){
			casilla.checked = !marcada;
			this.dom.abrirModalError(respuesta['code']);
		}

		casilla.disabled = false;
	}

	/**
	 * Pregunta al back si existe la pareja (id_funcionalidad, id_accion) en funcionalidad_accion. Se piden las parejas de esa funcionalidad
	 * y esa accion y se comprueban las claves de las filas devueltas (el back puede devolver cada clave como objeto o como valor simple),
	 * por si el back no aplicara el filtro.
	 *
	 * @async
	 * @param {*} idfuncionalidad id de la funcionalidad
	 * @param {*} idaccion id de la accion
	 * @returns {Promise<boolean>} true si la pareja existe en el back
	 */
	async existe_pareja(idfuncionalidad, idaccion){

		var respuesta = await this.access_functions.peticionBackGeneral('', this.nombreentidad, 'SEARCH',
			{id_funcionalidad: idfuncionalidad, id_accion: idaccion});

		return this.filasdelback(respuesta).some(fila =>
			this.valorclave(fila['id_funcionalidad'], 'id_funcionalidad') == idfuncionalidad
			&& this.valorclave(fila['id_accion'], 'id_accion') == idaccion);
	}


/***************************************************************************************************************************
                                 			Atributos con formato especial en la tabla
****************************************************************************************************************************/

	/**
	 * Devuelve el formato especial con el que se muestra en la tabla el valor de un atributo incluido en mostrarespecial.
	 * El back devuelve cada clave foranea como el objeto completo y en la tabla solo se muestra su id (igual que el resto de entidades):
	 *  - id_funcionalidad: {id_funcionalidad, nombre_funcionalidad, descrip_funcionalidad} -> id_funcionalidad
	 *  - id_accion: {id_accion, nombre_accion, descrip_accion} -> id_accion
	 * (si llegara como valor simple, se deja tal cual).
	 *
	 * @param {string} atributo nombre del atributo
	 * @param {*} valorentrada valor que manda el back
	 * @returns {*} valor a mostrar en la tabla
	 */
	mostrarcambioatributo(atributo, valorentrada){

		return this.valorclave(valorentrada, atributo);
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
	 * Pide al back el listado de una entidad y rellena con el un select del formulario actual
	 * (value y texto = el id, campovalor). La primera opcion vacia viene de manual_form_creation().
	 * Se envia un FormData vacio ('') para que los campos del formulario no lleguen a la otra entidad como filtro.
	 *
	 * @async
	 * @param {string} idselect id del select a rellenar
	 * @param {string} controlador entidad del back que se consulta
	 * @param {string} campovalor columna del back que va en value y se muestra como texto (solo se muestran ids)
	 * @returns {Promise<void>}
	 */
	async cargar_select(idselect, controlador, campovalor){

		// todas las paginas del listado (el back pagina las respuestas, ver pedir_todo())
		var filas = (await this.pedir_todo('', controlador)).filas;

		var select = document.getElementById(idselect);
		//el formulario puede haberse repintado o no existir mientras llegaba la respuesta
		if (select == null){ return; }

		if (filas.length > 0){
			var valoractual = select.value;
			//dejo solo la opcion vacia para no duplicar opciones si se llama mas de una vez
			while (select.options.length > 1){
				select.remove(1);
			}
			for (let fila of filas){
				var opcion = document.createElement('option');
				opcion.value = fila[campovalor];
				opcion.text = fila[campovalor];
				select.append(opcion);
			}
			select.value = valoractual;
		}

	}

	/**
	 * Rellena los dos select del formulario: funcionalidades y acciones. Las dos peticiones son independientes y se lanzan a la vez;
	 * devuelve una promesa que se cumple cuando estan cargados los dos (SHOWCURRENT la espera para poder seleccionar los valores de la fila).
	 *
	 * @async
	 * @returns {Promise<void>}
	 */
	async cargar_opciones(){

		await Promise.all([
			this.cargar_select('id_funcionalidad', 'funcionalidad', 'id_funcionalidad'),
			this.cargar_select('id_accion', 'accion', 'id_accion')
		]);

	}

}
