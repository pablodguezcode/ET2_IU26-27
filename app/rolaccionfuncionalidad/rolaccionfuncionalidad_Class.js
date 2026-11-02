class rolaccionfuncionalidad extends AbstractEntidad{

	constructor(esTest = null){
		super();

		this.columnasamostrar = ['id_funcionalidad', 'id_accion', 'id_rol'];
		// las tres columnas son claves foraneas: el back las devuelve como el objeto de la funcionalidad, de la accion y del rol
		// y se muestra solo su id (ver mostrarcambioatributo)
		this.mostrarespecial = ['id_funcionalidad', 'id_accion', 'id_rol'];
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

			// el selector de columnas visibles no aplica a la matriz (lo vuelve a mostrar entity_dom_fields.crearSeleccionablecolumnas() en las demas entidades)
			document.getElementById('label_seleccioncolumnas').style.display = 'none';
			document.getElementById('seleccioncolumnas').style.display = 'none';

			// esta entidad no tiene ADD (las asignaciones se crean y se borran marcando y desmarcando la matriz): los unicos iconos son SEARCH y TEST.
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
	 * devuelve el html del formulario de la entidad (el de SEARCH: los filtros de la matriz)
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_id_funcionalidad">Funcionalidad</label>
			<select id='id_funcionalidad' name='id_funcionalidad'>
				<!-- la primera opcion vacia permite que min_size falle si no se elige funcionalidad (y es "sin filtro" en SEARCH).
				     Las demas opciones (value = id_funcionalidad, texto = "id - nombre") las rellena cargar_opciones() desde el back. -->
				<option value=""></option>
			</select>
			<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
			<br>

			<label class="label_id_accion">Acción</label>
			<select id='id_accion' name='id_accion'>
				<!-- igual que id_funcionalidad: opciones rellenadas por cargar_opciones() -->
				<option value=""></option>
			</select>
			<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
			<br>

			<label class="label_id_rol">Rol</label>
			<select id='id_rol' name='id_rol'>
				<!-- igual que id_funcionalidad: opciones rellenadas por cargar_opciones() -->
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

//id_funcionalidad, id_accion e id_rol forman la clave primaria compuesta y son claves foraneas: los tres son select
//Esta entidad no tiene formulario de ADD: las asignaciones se crean marcando la matriz (ver cambiar_asignacion()). Las validaciones ADD_ se mantienen
//porque los tests de ET1 (rolaccionfuncionalidad_tests.js) las ejecutan, igual que las de EDIT.

//Atributo id_funcionalidad

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//min_size falla si se deja la opcion vacia
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

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//min_size falla si se deja la opcion vacia
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

//Atributo id_rol

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//min_size falla si se deja la opcion vacia
	ADD_id_rol_validation(){

		if (!(this.validations.min_size('id_rol',1))){
			this.dom.mostrar_error_campo('id_rol','id_rol_min_size_ko');
			return "id_rol_min_size_ko";
		}
		if (!(this.validations.max_size('id_rol',11))){
			this.dom.mostrar_error_campo('id_rol','id_rol_max_size_ko');
			return "id_rol_max_size_ko";
		}
		//solo digitos
		if (!(this.validations.format('id_rol', '^[0-9]*$'))){
			this.dom.mostrar_error_campo('id_rol','id_rol_format_ko');
			return "id_rol_format_ko";
		}
		this.dom.mostrar_exito_campo('id_rol');
		return true;
	}

	/***************************************************************************************************************************
												Campos de validacion para EDIT
	****************************************************************************************************************************/

//Esta entidad especial no tiene formulario de EDIT en el front (una asignacion no se modifica: se desmarca y se marca otra), pero los tests de ET1
//definen EDIT para sus tres atributos (ver rolaccionfuncionalidad_tests.js) y Data_Test invoca EDIT_<campo>_validation(). Las restricciones de
//EDIT son las mismas que las de ADD, por lo que se reutilizan.

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
                                 			Campos de validacion para SEARCH
	****************************************************************************************************************************/

//En SEARCH no hay min_size: el filtro es opcional y vacio significa "sin filtro". Si hay maximo y formato.
//La expresion regular lleva * (no +) para que el filtro vacio la cumpla.

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

	//Esta entidad solo tiene el formulario de SEARCH (filtros de la matriz). No hay createForm_ADD (las asignaciones se crean marcando la
	//matriz), ni createForm_EDIT, createForm_DELETE ni createForm_SHOWCURRENT (no hay iconos por fila: la matriz no es una tabla de tuplas).

	/**
	 * Construye el formulario de SEARCH de rolaccionfuncionalidad y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - Los tres campos son opcionales: la opcion vacia de cada select significa "sin filtro" (ver SEARCH_<campo>_validation).
	 * - Filtro de funcionalidad: solo el bloque de filas de esa funcionalidad. Filtro de rol: solo esa columna. Filtro de accion: solo
	 *   las funcionalidades que tienen asignada esa accion (en funcionalidad_accion) y solo la fila de esa accion en cada una.
	 * - Si el back responde, SEARCH() oculta el formulario y muestra la matriz filtrada.
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
	 * rolaccionfuncionalidad es una entidad especial: no permite ADD, EDIT ni DELETE de tuplas sueltas y no se muestra como una tabla,
	 * sino como una matriz que se construye con los datos de las otras tablas:
	 *  - filas: cada funcionalidad ocupa un bloque de filas, una por cada accion que tiene asignada (funcionalidad_accion). La celda de la
	 *    funcionalidad ("Funcionalidad id - nombre") abarca todas las filas de su bloque y la celda de cada fila es la accion ("Accion id - nombre").
	 *    Las funcionalidades van ordenadas por id_funcionalidad y las acciones de cada una por id_accion
	 *  - columnas: todos los roles ("Rol id - nombre"), ordenados por id_rol
	 *  - casilla (funcionalidad F, accion A, rol R): es una tripleta de rolaccionfuncionalidad. Marcada: el rol R tiene asignada la accion A
	 *    de la funcionalidad F; desmarcada: no la tiene. Cada casilla se marca y se desmarca por separado
	 *  - una funcionalidad sin acciones no tiene nada que asignar: ocupa una sola fila con el texto "sin acciones" y sin casillas
	 *
	 * Refactoriza AbstractEntidad.SEARCH() (misma definicion): los filtros del formulario de busqueda (vacio = sin filtro)
	 * limitan las filas y columnas que se muestran: funcionalidad (solo su bloque), accion (solo esa accion, y solo las funcionalidades
	 * que la tienen) y rol (solo su columna).
	 */
	async SEARCH(){

		// filtros del formulario (en el constructor y tras un SEARCH el formulario esta vacio: sin filtro)
		var form = document.getElementById('form_iu');
		const filtro = (campo) => (form != null && form.elements[campo]) ? form.elements[campo].value : '';
		var filtrofuncionalidad = filtro('id_funcionalidad');
		var filtroaccion = filtro('id_accion');
		var filtrorol = filtro('id_rol');

		// las cinco peticiones son independientes y se lanzan a la vez. Funcionalidades, acciones, roles y funcionalidad_accion se piden sin
		// filtro (formulario '') y las asignaciones con el formulario, que lleva los filtros. El back pagina sus listados (ver pedir_todo()),
		// asi que cada peticion trae todas las paginas
		var resultados = await Promise.all([
			this.pedir_todo('', 'funcionalidad'),
			this.pedir_todo('', 'accion'),
			this.pedir_todo('', 'rol'),
			this.pedir_todo('', 'funcionalidad_accion'),
			this.pedir_todo('form_iu', this.nombreentidad)
		]);

		// ocultar y limpiar el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.hide_element('Div_IU_form');

		var funcionalidades = resultados[0].filas;
		var acciones = resultados[1].filas;
		var roles = resultados[2].filas;
		var parejas = resultados[3].filas;
		var asignaciones = resultados[4].filas;

		// si el back no ha dejado pedir las paginas siguientes, se piden las filas de cada funcionalidad
		if (!resultados[3].completo){
			parejas = await this.filas_por_funcionalidad('funcionalidad_accion', funcionalidades);
		}
		if (!resultados[4].completo){
			asignaciones = await this.filas_por_funcionalidad(this.nombreentidad, funcionalidades);
		}

		// acciones de cada funcionalidad (funcionalidad_accion): id_funcionalidad -> ids de accion, ordenados por id
		var accionesde = {};
		for (var pareja of parejas){
			var f = this.valorclave(pareja['id_funcionalidad'], 'id_funcionalidad');
			var a = String(this.valorclave(pareja['id_accion'], 'id_accion'));
			if (!(f in accionesde)){ accionesde[f] = []; }
			if (!accionesde[f].includes(a)){ accionesde[f].push(a); }
		}
		for (var idf in accionesde){
			accionesde[idf].sort((x, y) => Number(x) - Number(y));
		}

		// aplicar los filtros y ordenar por id. Con filtro de accion solo las funcionalidades que la tienen y solo esa accion en cada una
		funcionalidades = funcionalidades.filter(fila => (filtrofuncionalidad == '' || fila['id_funcionalidad'] == filtrofuncionalidad)
				&& (filtroaccion == '' || (accionesde[fila['id_funcionalidad']] || []).includes(filtroaccion)))
			.sort((x, y) => Number(x['id_funcionalidad']) - Number(y['id_funcionalidad']));
		roles = roles.filter(fila => filtrorol == '' || fila['id_rol'] == filtrorol)
			.sort((x, y) => Number(x['id_rol']) - Number(y['id_rol']));
		if (filtroaccion != ''){
			for (var idfiltrado in accionesde){
				accionesde[idfiltrado] = [filtroaccion];
			}
		}

		// nombre de cada accion: id_accion -> fila de accion (para la cabecera "id - nombre" de cada fila)
		var accionesporid = {};
		for (var accion of acciones){
			accionesporid[accion['id_accion']] = accion;
		}

		// asignaciones existentes como "idfuncionalidad_idaccion_idrol" (el back puede devolver cada clave como objeto o como valor simple)
		var existentes = new Set(asignaciones.map(fila => this.clave_asignacion(
			this.valorclave(fila['id_funcionalidad'], 'id_funcionalidad'),
			this.valorclave(fila['id_accion'], 'id_accion'),
			this.valorclave(fila['id_rol'], 'id_rol'))));

		var contenedor = document.getElementById('IU_manage_table');
		contenedor.style.display = 'block';

		if (funcionalidades.length == 0 || roles.length == 0){
			// el mensaje va en un span con la clave de idioma (y no en el contenedor): setLang() vaciaria despues la tabla de cualquier
			// entidad que la pinte ahi si el contenedor tuviera la clase RECORDSET_VACIO
			contenedor.className = '';
			contenedor.innerHTML = '<span class="RECORDSET_VACIO">No se han encontrado elementos que coincidan con la búsqueda</span>';
		}
		else{
			// sin la clase del mensaje de vacio, para que setLang() no sustituya la matriz por el texto
			contenedor.className = '';
			contenedor.innerHTML = '';
			contenedor.append(this.crearMatriz(funcionalidades, roles, accionesde, accionesporid, existentes));
		}

		setLang();
	}

	/**
	 * El back pagina las respuestas de SEARCH: devuelve una pagina de filas (resource) y, junto a ella, total (filas que cumplen la busqueda),
	 * empieza (posicion de la primera fila de la pagina) y filas (cuantas trae esta pagina). Con la primera pagina solo se veria una parte de
	 * las tuplas, asi que se van pidiendo las siguientes (empieza = filas ya recibidas) hasta tener total filas.
	 * Si el back no respeta empieza (devuelve otra vez desde el principio) o deja de devolver filas se para para no repetirlas, y se indica
	 * en completo = false que faltan filas.
	 *
	 * @param {string} formulario id del formulario cuyos campos se envian como criterios de busqueda ('' = sin criterios)
	 * @param {string} controlador entidad del back que se consulta
	 * @param {Object} extra criterios de busqueda adicionales ({} = ninguno)
	 * @returns {Promise<{filas: Array, completo: boolean}>} las filas de todas las paginas y si estan todas
	 */
	async pedir_todo(formulario, controlador, extra = {}){

		var respuesta = await this.access_functions.peticionBackGeneral(formulario, controlador, 'SEARCH', Object.keys(extra).length > 0 ? extra : null);
		var filas = this.filasdelback(respuesta).slice();
		var total = Number(respuesta['total']);

		while (!isNaN(total) && filas.length < total){

			var siguiente = await this.access_functions.peticionBackGeneral(formulario, controlador, 'SEARCH',
				Object.assign({}, extra, {empieza: filas.length, filas: total - filas.length}));
			var nuevas = this.filasdelback(siguiente);

			if (nuevas.length == 0 || Number(siguiente['empieza']) != filas.length){
				break;
			}
			filas = filas.concat(nuevas);
		}

		return {filas: filas, completo: isNaN(total) || filas.length >= total};
	}

	/**
	 * Alternativa a pedir_todo() si el back no deja pedir las paginas siguientes: se piden las filas de cada funcionalidad
	 * mostrada (el criterio id_funcionalidad si lo respeta el back) y se juntan.
	 *
	 * @param {string} controlador entidad del back que se consulta
	 * @param {Array} funcionalidades funcionalidades que se muestran en la matriz
	 * @returns {Promise<Array>} filas de esas funcionalidades
	 */
	async filas_por_funcionalidad(controlador, funcionalidades){

		var grupos = await Promise.all(funcionalidades.map(fila =>
			this.pedir_todo('', controlador, {id_funcionalidad: fila['id_funcionalidad']}).then(resultado => resultado.filas)));

		return grupos.flat();
	}

	/**
	 * devuelve las filas de una respuesta del back, o un array vacio si no hay datos
	 *
	 * @param {Object} respuesta respuesta del back a un SEARCH
	 * @returns {Array} filas
	 */
	filasdelback(respuesta){

		return (respuesta['code'] == 'RECORDSET_DATOS') ? respuesta['resource'] : [];
	}

	/**
	 * clave de una asignacion (tripleta funcionalidad-accion-rol)
	 */
	clave_asignacion(idfuncionalidad, idaccion, idrol){

		return idfuncionalidad + '_' + idaccion + '_' + idrol;
	}

	/**
	 * Construye la tabla de la matriz (ver SEARCH()): cada funcionalidad es un bloque de filas, una por accion, y cada rol una columna.
	 * La matriz es editable de forma permanente: marcar una casilla asigna la accion de la funcionalidad al rol (ADD de la tripleta) y
	 * desmarcarla quita la asignacion (DELETE), ver cambiar_asignacion(). Las cabeceras muestran el texto traducido de la entidad, el id y el
	 * nombre (p.e. "Funcionalidad 3 - Gestion roles", "Accion 2 - modificar", "Rol 2 - gestor").
	 *
	 * @param {Array} funcionalidades filas de funcionalidad, ya filtradas y ordenadas
	 * @param {Array} roles filas de rol, ya filtradas y ordenadas
	 * @param {Object} accionesde acciones que se muestran de cada funcionalidad: id_funcionalidad -> ids de accion, ordenados
	 * @param {Object} accionesporid filas de accion por id_accion (para el nombre de cada fila)
	 * @param {Set} existentes asignaciones existentes, como "idfuncionalidad_idaccion_idrol"
	 * @returns {HTMLTableElement} tabla
	 */
	crearMatriz(funcionalidades, roles, accionesde, accionesporid, existentes){

		var tabla = document.createElement('table');
		tabla.id = 'tabla_matriz_rolaccionfuncionalidad';
		tabla.style.borderCollapse = 'collapse';

		// celda con el estilo comun a toda la matriz
		const celda = (tag) => {
			var elemento = document.createElement(tag);
			elemento.style.border = '1px solid black';
			elemento.style.padding = '4px 10px';
			elemento.style.textAlign = 'center';
			return elemento;
		};

		// cabecera de una fila o de una columna: texto traducido (clave de idioma como class: setLang() lo sustituye por "Funcionalidad" / "Rol"
		// o "Feature" / "Role") seguido de "id - nombre"
		const cabecera = (clavetexto, id, nombre) => {
			var th = celda('th');
			var texto = document.createElement('span');
			texto.className = clavetexto;
			th.append(texto);
			th.append(' ' + id + ((nombre !== undefined && nombre !== null) ? ' - ' + nombre : ''));
			return th;
		};

		// fila de cabecera: Funcionalidad, Accion y una cabecera "Rol id - nombre" por rol
		var trcabecera = document.createElement('tr');
		for (var clave of ['text_matriz_funcionalidad', 'text_matriz_accion']){
			var thfija = celda('th');
			var textofijo = document.createElement('span');
			textofijo.className = clave;
			thfija.append(textofijo);
			trcabecera.append(thfija);
		}
		for (var rol of roles){
			trcabecera.append(cabecera('text_matriz_rol', rol['id_rol'], rol['rol_name']));
		}
		var thead = document.createElement('thead');
		thead.append(trcabecera);
		tabla.append(thead);

		// un bloque de filas por funcionalidad: una fila por accion con una casilla por rol
		var tbody = document.createElement('tbody');
		for (const funcionalidad of funcionalidades){

			const idfuncionalidad = funcionalidad['id_funcionalidad'];
			const acciones = accionesde[idfuncionalidad] || [];

			// la celda de la funcionalidad abarca todas las filas de su bloque
			var thfuncionalidad = cabecera('text_matriz_funcionalidad', idfuncionalidad, funcionalidad['nombre_funcionalidad']);
			thfuncionalidad.rowSpan = Math.max(acciones.length, 1);
			thfuncionalidad.style.verticalAlign = 'middle';

			var filas = [];

			if (acciones.length == 0){
				// una funcionalidad sin acciones no tiene nada que asignar: una fila con el aviso y sin casillas
				var trvacia = document.createElement('tr');
				trvacia.append(thfuncionalidad);
				var thsinacciones = celda('th');
				var textosinacciones = document.createElement('span');
				textosinacciones.className = 'text_matriz_sin_acciones';
				thsinacciones.append(textosinacciones);
				trvacia.append(thsinacciones);
				for (var vacio of roles){
					trvacia.append(celda('td'));
				}
				filas.push(trvacia);
			}

			for (const idaccion of acciones){
				var tr = document.createElement('tr');
				if (filas.length == 0){
					tr.append(thfuncionalidad);
				}
				var accion = accionesporid[idaccion];
				tr.append(cabecera('text_matriz_accion', idaccion, accion ? accion['nombre_accion'] : null));

				for (const rol of roles){
					var td = celda('td');
					// const (y no var): el listener de cada casilla debe referirse a SU casilla y no a la ultima creada
					const casilla = document.createElement('input');
					casilla.type = 'checkbox';
					casilla.id = 'casilla_' + idfuncionalidad + '_' + idaccion + '_' + rol['id_rol'];
					casilla.checked = existentes.has(this.clave_asignacion(idfuncionalidad, idaccion, rol['id_rol']));

					// cada cambio de la casilla se envia al back (marcar = ADD, desmarcar = DELETE)
					casilla.addEventListener('change', () => this.cambiar_asignacion(casilla, idfuncionalidad, idaccion, rol['id_rol']));
					td.append(casilla);
					tr.append(td);
				}
				filas.push(tr);
			}

			// linea mas gruesa sobre la primera fila de cada funcionalidad para separar los bloques
			for (var celdainicial of filas[0].children){
				celdainicial.style.borderTop = '3px solid black';
			}
			for (var fila of filas){
				tbody.append(fila);
			}
		}
		tabla.append(tbody);

		return tabla;
	}

	/**
	 * Pregunta al back si el rol tiene asignada la accion de la funcionalidad. Se piden las asignaciones con esos tres criterios y se
	 * comprueban las claves de las filas devueltas (el back puede devolver cada clave como objeto o como valor simple), por si el back no
	 * aplicara el filtro.
	 *
	 * @param {*} idfuncionalidad id de la funcionalidad
	 * @param {*} idaccion id de la accion
	 * @param {*} idrol id del rol
	 * @returns {Promise<boolean>} true si la asignacion existe en el back
	 */
	async existe_asignacion(idfuncionalidad, idaccion, idrol){

		var resultado = await this.pedir_todo('', this.nombreentidad, {id_funcionalidad: idfuncionalidad, id_accion: idaccion, id_rol: idrol});

		return resultado.filas.some(fila =>
			this.valorclave(fila['id_funcionalidad'], 'id_funcionalidad') == idfuncionalidad
			&& this.valorclave(fila['id_accion'], 'id_accion') == idaccion
			&& this.valorclave(fila['id_rol'], 'id_rol') == idrol);
	}

	/**
	 * Se ejecuta al marcar o desmarcar una casilla de la matriz: marcar crea la tripleta (ADD) y desmarcar la borra (DELETE).
	 * La casilla queda deshabilitada mientras llega la respuesta del back. El back permite tripletas repetidas, por lo que antes de crear
	 * una se comprueba que no exista ya. Si el back responde error, la casilla vuelve al estado que tenia y se muestra el modal de error
	 * (el usuario confirma que lo ha recibido y la matriz sigue como antes de la peticion). Si responde ok, la casilla se queda con el nuevo
	 * estado. No se repinta la matriz: asi se conservan los filtros de SEARCH.
	 *
	 * @param {HTMLInputElement} casilla casilla que ha cambiado
	 * @param {*} idfuncionalidad id de la funcionalidad (bloque de filas) de la casilla
	 * @param {*} idaccion id de la accion (fila) de la casilla
	 * @param {*} idrol id del rol (columna) de la casilla
	 */
	async cambiar_asignacion(casilla, idfuncionalidad, idaccion, idrol){

		var marcada = casilla.checked;
		casilla.disabled = true;

		// el back permite tripletas repetidas: si se marca una asignacion que ya existe no se vuelve a crear
		if (marcada && (await this.existe_asignacion(idfuncionalidad, idaccion, idrol))){
			casilla.disabled = false;
			return;
		}

		var respuesta = await this.access_functions.peticionBackGeneral('', this.nombreentidad, marcada ? 'ADD' : 'DELETE',
			{id_funcionalidad: idfuncionalidad, id_accion: idaccion, id_rol: idrol});

		if (!respuesta['ok']){
			casilla.checked = !marcada;
			this.dom.abrirModalError(respuesta['code']);
		}

		casilla.disabled = false;
	}

	/***************************************************************************************************************************
                                 			Atributos con formato especial en la tabla
	****************************************************************************************************************************/

	/**
	 * Devuelve el formato especial con el que se muestra en la tabla el valor de un atributo incluido en mostrarespecial.
	 * El back devuelve cada clave foranea como el objeto completo y en la tabla solo se muestra su id (igual que el resto de entidades):
	 *  - id_funcionalidad: {id_funcionalidad, nombre_funcionalidad, descrip_funcionalidad} -> id_funcionalidad
	 *  - id_accion: {id_accion, nombre_accion, descrip_accion} -> id_accion
	 *  - id_rol: {id_rol, rol_name, rol_description} -> id_rol
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
	 * pide al back el listado de una entidad y rellena con el un select del formulario actual
	 * (value = el id, campovalor; texto = "id - nombre", campotexto). La primera opcion vacia viene de manual_form_creation().
	 * Se envia un FormData vacio ('') para que los campos del formulario no lleguen a la otra entidad como filtro.
	 *
	 * @param {string} idselect id del select a rellenar
	 * @param {string} controlador entidad del back que se consulta
	 * @param {string} campovalor columna del back que va en value
	 * @param {string} campotexto columna del back con el nombre que se muestra junto al id
	 */
	async cargar_select(idselect, controlador, campovalor, campotexto){

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
				opcion.text = fila[campovalor] + ((fila[campotexto] !== undefined && fila[campotexto] !== null) ? ' - ' + fila[campotexto] : '');
				select.append(opcion);
			}
			select.value = valoractual;
		}

	}

	/**
	 * rellena los tres select del formulario: funcionalidades, acciones y roles. Las peticiones son independientes y se lanzan a la vez;
	 * devuelve una promesa que se cumple cuando estan cargados los tres.
	 */
	async cargar_opciones(){

		await Promise.all([
			this.cargar_select('id_funcionalidad', 'funcionalidad', 'id_funcionalidad', 'nombre_funcionalidad'),
			this.cargar_select('id_accion', 'accion', 'id_accion', 'nombre_accion'),
			this.cargar_select('id_rol', 'rol', 'id_rol', 'rol_name')
		]);

	}
}
