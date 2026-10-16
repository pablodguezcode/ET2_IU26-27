class usuario {

	constructor(esTest){

		this.dom = new dom();
		this.validations = new Validations();
		this.access_functions = new ExternalAccess();

		// la contraseña no se muestra en la tabla
		this.columnasamostrar = ['dni','usuario','id_rol'];
		// usuario no tiene columnas con tratamiento especial (persona usa foto_persona)
		this.mostrarespecial = [];
		this.nombreentidad = 'usuario';

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
			<form id = 'form_iu' action="http://193.147.87.202/procesaform.php" method="POST" onsubmit="return entidad.ADD_submit_usuario();">

			<label class="label_dni">DNI</label>
			<input type='text' id='dni' name='dni' onblur=" return entidad.ADD_dni_validation();">
			<span id="span_error_dni"><a id="error_dni"></a></span>
			<br>

			<label class="label_usuario">Usuario</label>
			<input type='text' id='usuario' name='usuario' onblur=" return entidad.ADD_usuario_validation();">
			<span id="span_error_usuario"><a id="error_usuario"></a></span>
			<br>

			<label class="label_contrasena">Contraseña</label>
			<input type='password' id='contrasena' name='contrasena' onblur=" return entidad.ADD_contrasena_validation();">
			<span id="span_error_contrasena"><a id="error_contrasena"></a></span>
			<br>

			<label class="label_id_rol">Rol</label>
			<select id='id_rol' name='id_rol' onblur=" return entidad.ADD_id_rol_validation();">
				<!-- la primera opcion vacia permite que min_size falle si no se elige rol (y es "sin filtro" en SEARCH).
				     Las demas opciones (value = id_rol, texto = rol_name) las rellena cargar_roles() desde el back. -->
				<option value=""></option>
			</select>
			<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
			<br>

			<input id="submit_button" type="submit" value="Submit">

		</form>
		`;
		return form_content;

	}

/***************************************************************************************************************************
                                 			Campos de validacion para ADD
****************************************************************************************************************************/

//Atributo dni

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_dni_validation(){

		if (!(this.validations.min_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_min_size_ko');
			return "dni_min_size_ko";
		}
		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_ko');
			return "dni_max_size_ko";
		}
		//8 digitos + letra mayuscula
		if (!(this.validations.format('dni', '^[0-9]{8}[A-Z]$'))){
			this.dom.mostrar_error_campo('dni','dni_format_ko');
			return "dni_format_ko";
		}
		//letra de control (modulo 23). La funcion recibe el valor, no lee del DOM
		if (!(this.dni_personalize_validation(document.getElementById('dni').value))){
			this.dom.mostrar_error_campo('dni','dni_personalized_ko');
			return "dni_personalized_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	//Retorna true si la letra de control (numero mod 23) coincide con la del DNI, si no devuelve false.
	//Recibe el valor por parametro (no lee del DOM). Se llama despues de comprobar el formato (8 digitos + letra).
	dni_personalize_validation(dni){

		var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
		return dni_letters.charAt(parseInt(dni.substring(0, 8), 10) % 23) == dni.charAt(8);
	}

//Atributo usuario

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_usuario_validation(){

		if (!(this.validations.min_size('usuario',5))){
			this.dom.mostrar_error_campo('usuario','usuario_min_size_ko');
			return "usuario_min_size_ko";
		}
		if (!(this.validations.max_size('usuario',45))){
			this.dom.mostrar_error_campo('usuario','usuario_max_size_ko');
			return "usuario_max_size_ko";
		}
		//solo letras A-Z a-z (sin ñ ni acentos)
		if (!(this.validations.format('usuario', '^[A-Za-z]*$'))){
			this.dom.mostrar_error_campo('usuario','usuario_format_ko');
			return "usuario_format_ko";
		}
		this.dom.mostrar_exito_campo('usuario');
		return true;
	}

//Atributo contrasena

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	ADD_contrasena_validation(){

		if (!(this.validations.min_size('contrasena',8))){
			this.dom.mostrar_error_campo('contrasena','contrasena_min_size_ko');
			return "contrasena_min_size_ko";
		}
		if (!(this.validations.max_size('contrasena',45))){
			this.dom.mostrar_error_campo('contrasena','contrasena_max_size_ko');
			return "contrasena_max_size_ko";
		}
		//solo letras A-Z a-z (sin ñ ni acentos)
		if (!(this.validations.format('contrasena', '^[A-Za-z]*$'))){
			this.dom.mostrar_error_campo('contrasena','contrasena_format_ko');
			return "contrasena_format_ko";
		}
		this.dom.mostrar_exito_campo('contrasena');
		return true;
	}

//Atributo id_rol

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//id_rol es un select: min_size falla si se deja la opcion vacia
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
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	//Se ejecutan TODAS las validaciones (el array se evalua entero) para que se muestren todos los errores a la vez
	ADD_submit_usuario(){

		let resultados = [
			this.ADD_dni_validation(),
			this.ADD_usuario_validation(),
			this.ADD_contrasena_validation(),
			this.ADD_id_rol_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 			Campos de validacion para EDIT
****************************************************************************************************************************/
//En usuario los codigos de error y las restricciones de EDIT son los mismos que los de ADD (ver usuario_tests.js).
//dni se puede modificar en EDIT, por eso lleva las mismas restricciones que en ADD.

	EDIT_dni_validation(){

		return this.ADD_dni_validation();
	}

	EDIT_usuario_validation(){

		return this.ADD_usuario_validation();
	}

	EDIT_contrasena_validation(){

		return this.ADD_contrasena_validation();
	}

	EDIT_id_rol_validation(){

		return this.ADD_id_rol_validation();
	}


/***************************************************************************************************************************
                                 			SUMMIT EDIT formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	EDIT_submit_usuario(){

		let resultados = [
			this.EDIT_dni_validation(),
			this.EDIT_usuario_validation(),
			this.EDIT_contrasena_validation(),
			this.EDIT_id_rol_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 			Campos de validacion para SEARCH
****************************************************************************************************************************/
//En SEARCH no hay min_size: el filtro es opcional y vacio significa "sin filtro". Si hay maximo y formato.

//Atributo dni

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_dni_validation(){

		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_ko');
			return "dni_max_size_ko";
		}
		//vacio (sin filtro) o DNI completo: 8 digitos + letra mayuscula. No se recalcula la letra (ver usuario_tests.js)
		if (!(this.validations.format('dni', '^([0-9]{8}[A-Z])?$'))){
			this.dom.mostrar_error_campo('dni','dni_format_ko');
			return "dni_format_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;
	}

//Atributo usuario

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_usuario_validation(){

		if (!(this.validations.max_size('usuario',45))){
			this.dom.mostrar_error_campo('usuario','usuario_max_size_ko');
			return "usuario_max_size_ko";
		}
		if (!(this.validations.format('usuario', '^[A-Za-z]*$'))){
			this.dom.mostrar_error_campo('usuario','usuario_format_ko');
			return "usuario_format_ko";
		}
		this.dom.mostrar_exito_campo('usuario');
		return true;
	}

//Atributo contrasena

	//La contraseña es un dato sensible y nunca se usa como criterio de busqueda: no hay tests de SEARCH
	//ni campo contrasena en el formulario de busqueda. El metodo existe solo porque Unit_Test comprueba
	//ADD_, EDIT_ y SEARCH_ para todos los atributos. No toca el DOM y siempre devuelve true.
	SEARCH_contrasena_validation(){

		return true;
	}

//Atributo id_rol

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//El select tiene la primera opcion vacia ("sin filtro")
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

	//Retorna true si todos los campos son validos, si no devuelve false
	//No incluye contrasena: no existe en el formulario de busqueda
	SEARCH_submit_usuario(){

		let resultados = [
			this.SEARCH_dni_validation(),
			this.SEARCH_usuario_validation(),
			this.SEARCH_id_rol_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 				Otras Cosas, No tocar
****************************************************************************************************************************/

	//Stubs (alert), igual que en persona: los formularios reales de EDIT, DELETE, SHOWCURRENT, ADD y SEARCH
	//todavia no estan implementados.

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.dni);
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
	 * pide al back el listado de la entidad rol y rellena el select id_rol del formulario actual
	 * (value = id_rol, texto = rol_name). La primera opcion vacia viene de manual_form_creation().
	 * Se envia un FormData vacio ('') para que los campos del formulario de usuario no lleguen a rol como filtro.
	 */
	async cargar_roles(){

		await this.access_functions.peticionBackGeneral('', 'rol', 'SEARCH')
		.then((respuesta) => {

			var select = document.getElementById('id_rol');
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
					opcion.value = fila['id_rol'];
					opcion.text = fila['rol_name'];
					select.append(opcion);
				}
				select.value = valoractual;
			}
		});

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
			//el formulario se acaba de repintar: hay que volver a cargar las opciones del select id_rol (sin await)
			this.cargar_roles();

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