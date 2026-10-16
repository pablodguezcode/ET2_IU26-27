class funcionalidad_accion {

	constructor(esTest){

		this.dom = new dom();
		this.validations = new Validations();
		this.access_functions = new ExternalAccess();

		this.columnasamostrar = ['id_funcionalidad','id_accion'];
		// funcionalidad_accion no tiene columnas con tratamiento especial (persona usa foto_persona)
		this.mostrarespecial = [];
		this.nombreentidad = 'funcionalidad_accion';

		//init
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';

			//crear el formulario vacio
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();

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
			<form id = 'form_iu' action="http://193.147.87.202/procesaform.php" method="POST" onsubmit="return entidad.ADD_submit_funcionalidad_accion();">

			<label class="label_id_funcionalidad">Funcionalidad</label>
			<select id='id_funcionalidad' name='id_funcionalidad' onblur=" return entidad.ADD_id_funcionalidad_validation();">
				<!-- la primera opcion vacia permite que min_size falle si no se elige funcionalidad (y es "sin filtro" en SEARCH).
				     Las demas opciones (value = id_funcionalidad, texto = nombre_funcionalidad) las rellena cargar_opciones() desde el back. -->
				<option value=""></option>
			</select>
			<span id="span_error_id_funcionalidad"><a id="error_id_funcionalidad"></a></span>
			<br>

			<label class="label_id_accion">Acción</label>
			<select id='id_accion' name='id_accion' onblur=" return entidad.ADD_id_accion_validation();">
				<!-- igual que id_funcionalidad: opciones (value = id_accion, texto = nombre_accion) rellenadas por cargar_opciones() -->
				<option value=""></option>
			</select>
			<span id="span_error_id_accion"><a id="error_id_accion"></a></span>
			<br>

			<input id="submit_button" type="submit" value="Submit">

		</form>
		`;
		return form_content;

	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/
//id_funcionalidad e id_accion son la clave primaria compuesta y claves foraneas: ambos son select

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


/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	//Se ejecutan TODAS las validaciones (el array se evalua entero) para que se muestren todos los errores a la vez
	ADD_submit_funcionalidad_accion(){

		let resultados = [
			this.ADD_id_funcionalidad_validation(),
			this.ADD_id_accion_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/
//Los codigos de error y las restricciones de EDIT son los mismos que los de ADD (ver funcionalidad_accion_tests.js).

	EDIT_id_funcionalidad_validation(){

		return this.ADD_id_funcionalidad_validation();
	}

	EDIT_id_accion_validation(){

		return this.ADD_id_accion_validation();
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	EDIT_submit_funcionalidad_accion(){

		let resultados = [
			this.EDIT_id_funcionalidad_validation(),
			this.EDIT_id_accion_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 			Campos de validacion para SEARCH
****************************************************************************************************************************/
//En SEARCH no hay min_size: el filtro es opcional y vacio significa "sin filtro". Si hay maximo y formato.

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



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	SEARCH_submit_funcionalidad_accion(){

		let resultados = [
			this.SEARCH_id_funcionalidad_validation(),
			this.SEARCH_id_accion_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 				Otras Cosas, No tocar
****************************************************************************************************************************/

	//Stubs (alert), igual que en persona: los formularios reales de EDIT, DELETE, SHOWCURRENT, ADD y SEARCH
	//todavia no estan implementados.

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.id_funcionalidad+' '+fila.id_accion);
	}

	createForm_DELETE(){
		alert('crear formulario DELETE');
	}

	createForm_SHOWCURRENT(){
		alert('crear formulario DETALLE');
	}

	createForm_ADD(){
		alert('crear formulario ADD');
	}

	createForm_SEARCH(){
		alert('crear formulario SEARCH');
	}


// candidatas dom
//(codigo generico copiado de persona: no depende de la entidad salvo por this.columnasamostrar y this.atributos)

	/**
	 * Recibe la información a mostrar en columnas y el array de columnas a las cuales se modificara su contenido para mostrarsele al usuario
	 * Se le incluyen tres columnas mas a cada fila para poder tener un icono con la accion a realizar para esa fila y se le coloca un evento onclick
	 * para poder llamar a los metodos createForm_accion pasando como parametros de esos metodos la información de la fila de datos
	 *
	 * @param {Objeto} datos
	 * @param {Array} mostrarespecial
	 */
	crearTablaDatos(datos, mostrarespecial){

		var misdatos = datos;
		/*
		recorrer todas las filas de datos y cada atributo para si tiene una funcion de transformación de valor modificarlo en el momento
		*/
		if (mostrarespecial.length > 0){
			for (var i=0;i<misdatos.length;i++){
				for (var clave in misdatos[i]){
						if (clave in mostrarespecial){
							//misdatos[i][clave] = this.cambiarmostrarespecial(clave, misdatos[i][clave]);
						}
				}
			}
		}
		// proceso los datos de la tabla para incluir en cada fila los tres botones conectados a createForm_ACCION()
		for (var i=0;i<misdatos.length;i++){

			var linedit = `<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(`+JSON.stringify(misdatos[i])+`);'>`;
			var lindelete = `<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(`+JSON.stringify(misdatos[i])+`);'>`;
			var linshowcurrent = `<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(`+JSON.stringify(misdatos[i])+`);'>`;
			misdatos[i]['EDIT'] = linedit;
			misdatos[i]['DELETE'] = lindelete;
			misdatos[i]['SHOWCURRENT'] = linshowcurrent;

		}

		//muestro datos en tabla
		this.dom.showData('IU_manage_table', misdatos);
		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);


	}



	/**
	 * Redibuja el select en funcion del contenido de columnasamostrar
	 *
	 * @param {*} columnasamostrar
	 * @param {*} atributos
	 */
	crearSeleccionablecolumnas(columnasamostrar,atributos){

		document.getElementById("seleccioncolumnas").innerHTML = '';

		for (let atributo of atributos){

			var optionselect = document.createElement('option');
			optionselect.className = atributo;
			optionselect.innerHTML = atributo;
			var textofuncion = "entidad.modificarcolumnasamostrar('"+atributo+"');";
			optionselect.setAttribute("onclick",textofuncion);
			if (columnasamostrar.includes(atributo)){
				optionselect.selected = true;
			}
			document.getElementById("seleccioncolumnas").append(optionselect);
		}
		//setLang();

	}

// candidatas abstract

	/**
	 * muestra o no las columnas de la tabla segun indique columnasamostrar
	 */
	mostrarocultarcolumnas(){

		var estadodisplay = '';
		// recorro todos los atributos de la tabla
		for (let columna of this.atributos){
			// si el atributo esta en columnas a mostrar
			// lo dejo como esta
			if (this.columnasamostrar.includes(columna)){
				estadodisplay = '';
			}
			// si el atributo no esta en columnas a mostrar lo oculto
			else{
				estadodisplay = 'none';
			}
			document.querySelector("th[class='tabla-th-"+columna+"']").style.display = estadodisplay;
			let arraytds = document.querySelectorAll("td[class='tabla-td-"+columna+"']");
			for (let i=0;i<arraytds.length;i++){
				arraytds[i].style.display = estadodisplay;
			}
		}


	}

	/**
	 * Modifica el array de columnas a mostrar al hacer click sobre el atributo en el select poniendolo como oculto o como visible
	 * @param {string} atributo
	 */
	modificarcolumnasamostrar(atributo){

		if (this.columnasamostrar.includes(atributo)){
			// borrar ese atributo
			this.columnasamostrar = this.columnasamostrar.filter(columna => columna != atributo);
		}
		else{
			// añadir
			this.columnasamostrar.push(atributo);
		}

		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);

	}

	/**
	 * pide al back el listado de una entidad y rellena con el un select del formulario actual
	 * (value = campovalor, texto = campotexto). La primera opcion vacia viene de manual_form_creation().
	 * Se envia un FormData vacio ('') para que los campos del formulario no lleguen a la otra entidad como filtro.
	 *
	 * @param {string} idselect id del select a rellenar
	 * @param {string} controlador entidad del back que se consulta
	 * @param {string} campovalor columna del back que va en value
	 * @param {string} campotexto columna del back que se muestra como texto
	 */
	async cargar_select(idselect, controlador, campovalor, campotexto){

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
					opcion.text = fila[campotexto];
					select.append(opcion);
				}
				select.value = valoractual;
			}
		});

	}

	/**
	 * rellena los dos select del formulario: funcionalidades y acciones (sin await, son peticiones independientes)
	 */
	cargar_opciones(){

		this.cargar_select('id_funcionalidad', 'funcionalidad', 'id_funcionalidad', 'nombre_funcionalidad');
		this.cargar_select('id_accion', 'accion', 'id_accion', 'nombre_accion');

	}

	/**
	 * el método realiza una petición de search al back pudiendo enviar un formulario con datos, enviando
	 * el nombre de la entidad del back y la acción a realizar sobre la misma.
	 * los datos respondidos se usan para indicar o bien que no hay datos o mostrandolos en una tabla.
	 */
	async SEARCH(){

		await this.access_functions.peticionBackGeneral('form_iu', this.nombreentidad, 'SEARCH')
		.then((respuesta) => {

			//limpiar el formulario
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();
			//el formulario se acaba de repintar: hay que volver a cargar las opciones de los select id_funcionalidad e id_accion
			this.cargar_opciones();

			if (respuesta['code'] == 'RECORDSET_DATOS'){
				this.datos = respuesta['resource'];
				this.atributos = Object.keys(this.datos[0]);
				//crear la tabla de datos de la entidad del back
				this.crearTablaDatos(this.datos, this.mostrarespecial);
			}
			else{
				document.getElementById("IU_manage_table").style.display = 'block';
				document.getElementById('IU_manage_table').innerHTML = 'No se han encontrado elementos que coincidan con la búsqueda';
				document.getElementById('IU_manage_table').className = 'RECORDSET_VACIO';
			}

			//setLang();

		});

	}


}
