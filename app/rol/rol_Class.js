/* -----------------------------------------------------------------------------
   Entidad: rol
   Campos : id_rol (input, PK), rol_name (input), rol_description (textarea)

   Fichero escrito solo con caracteres ASCII: n con tilde, acentos y puntos
   suspensivos de las expresiones regulares van como escapes \uXXXX, para que
   funcione igual aunque el servidor no declare UTF-8.

     \u00f1 \u00d1 = n, N con tilde
     \u00e1 \u00e9 \u00ed \u00f3 \u00fa = a e i o u con acento
     \u00c1 \u00c9 \u00cd \u00d3 \u00da = A E I O U con acento
     \u00fc \u00dc = u, U con dieresis
     \u00bf \u00a1 = signos de apertura de interrogacion y exclamacion
     \u2026 = puntos suspensivos
----------------------------------------------------------------------------- */
class rol {

	constructor(esTest){

		this.dom = new dom();
		this.validations = new Validations();
		this.access_functions = new ExternalAccess();

		this.columnasamostrar = ['id_rol', 'rol_name', 'rol_description'];
		this.mostrarespecial = [];
		this.nombreentidad = 'rol';

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
	 * devuelve el html del formulario de la entidad
	 * id_rol va como type='text' (no 'number'): el navegador vacia el value de un
	 * input number con "1a" y Validations.min_size lo daria por vacio.
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="http://193.147.87.202/procesaform.php" method="POST" onsubmit="return entidad.ADD_submit_rol();">

			<label class="label_id_rol">Identificador del rol</label>
			<input type='text' id='id_rol' name='id_rol' onblur=" return entidad.ADD_id_rol_validation();" />
			<span id="span_error_id_rol"><a id="error_id_rol"></a></span>
			<br>

			<label class="label_rol_name">Nombre del rol</label>
			<input type='text' id='rol_name' name='rol_name' onblur=" return entidad.ADD_rol_name_validation();" />
			<span id="span_error_rol_name"><a id="error_rol_name"></a></span>
			<br>

			<label class="label_rol_description">Descripci&oacute;n del rol</label>
			<textarea rows="5" cols="33" id='rol_description' name='rol_description' onblur=" return entidad.ADD_rol_description_validation();"></textarea>
			<span id="span_error_rol_description"><a id="error_rol_description"></a></span>
			<br>

			<input id="submit_button" type="submit" value="Submit">

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
		if (!(this.validations.format('rol_name', '^[A-Za-z\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00fc\u00dc]*$'))){
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
		if (!(this.validations.format('rol_description', '^[A-Za-z\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00fc\u00dc .,;:\u00bf?\u00a1!()\\[\\]\\-"\'\u2026]*$'))){
			this.dom.mostrar_error_campo('rol_description','rol_description_format_ko');
			return "rol_description_format_ko";
		}
		this.dom.mostrar_exito_campo('rol_description');
		return true;

	}



/***************************************************************************************************************************
                                 			SUMMIT ADD formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	//Se ejecutan las tres validaciones siempre (el array las evalua todas), asi se muestran todos los errores a la vez
	ADD_submit_rol(){

		let resultados = [
			this.ADD_id_rol_validation(),
			this.ADD_rol_name_validation(),
			this.ADD_rol_description_validation()
		];

		return resultados.every(resultado => resultado === true);
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

	//Retorna true si todos los campos son validos, si no devuelve false
	EDIT_submit_rol(){

		let resultados = [
			this.EDIT_id_rol_validation(),
			this.EDIT_rol_name_validation(),
			this.EDIT_rol_description_validation()
		];

		return resultados.every(resultado => resultado === true);
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
		if (!(this.validations.format('rol_name', '^[A-Za-z\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00fc\u00dc]*$'))){
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
		if (!(this.validations.format('rol_description', '^[A-Za-z\u00f1\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00fc\u00dc .,;:\u00bf?\u00a1!()\\[\\]\\-"\'\u2026]*$'))){
			this.dom.mostrar_error_campo('rol_description','rol_description_format_ko');
			return "rol_description_format_ko";
		}
		this.dom.mostrar_exito_campo('rol_description');
		return true;
	}



/***************************************************************************************************************************
                                 			SUMMIT SEARCH formulario validaciones
****************************************************************************************************************************/

	//Retorna true si todos los campos son validos, si no devuelve false
	SEARCH_submit_rol(){

		let resultados = [
			this.SEARCH_id_rol_validation(),
			this.SEARCH_rol_name_validation(),
			this.SEARCH_rol_description_validation()
		];

		return resultados.every(resultado => resultado === true);
	}



/***************************************************************************************************************************
                                 				Otras Cosas, No tocar
****************************************************************************************************************************/
//Igual que en persona: los createForm_* son de momento stubs con alert.

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.id_rol);
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


	/**
	 * Recibe la informacion a mostrar en columnas y el array de columnas a las cuales se modificara su contenido para mostrarsele al usuario
	 * Se le incluyen tres columnas mas a cada fila para poder tener un icono con la accion a realizar para esa fila y se le coloca un evento onclick
	 * para poder llamar a los metodos createForm_accion pasando como parametros de esos metodos la informacion de la fila de datos
	 *
	 * @param {Objeto} datos
	 * @param {Array} mostrarespecial
	 */
	crearTablaDatos(datos, mostrarespecial){

		var misdatos = datos;
		/*
		recorrer todas las filas de datos y cada atributo para si tiene una funcion de transformacion de valor modificarlo en el momento
		*/
		if (mostrarespecial.length > 0){
			for (var i=0;i<misdatos.length;i++){
				for (var clave in misdatos[i]){
						if (mostrarespecial.includes(clave)){
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
			// anadir
			this.columnasamostrar.push(atributo);
		}

		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);

	}

	/**
	 * el metodo realiza una peticion de search al back pudiendo enviar un formulario con datos, enviando
	 * el nombre de la entidad del back y la accion a realizar sobre la misma.
	 * los datos respondidos se usan para indicar o bien que no hay datos o mostrandolos en una tabla.
	 */
	async SEARCH(){

		await this.access_functions.peticionBackGeneral('form_iu', this.nombreentidad, 'SEARCH')
		.then((respuesta) => {

			//limpiar el formulario
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();

			if (respuesta['code'] == 'RECORDSET_DATOS'){
				this.datos = respuesta['resource'];
				this.atributos = Object.keys(this.datos[0]);
				//crear la tabla de datos de la entidad del back
				this.crearTablaDatos(this.datos, this.mostrarespecial);
				//rellenar el select de columnas a mostrar
				//this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
				//this.mostrarocultarcolumnas();
			}
			else{
				document.getElementById("IU_manage_table").style.display = 'block';
				document.getElementById('IU_manage_table').innerHTML = 'No se han encontrado elementos que coincidan con la b\u00fasqueda';
				document.getElementById('IU_manage_table').className = 'RECORDSET_VACIO';
			}

			//setLang();

		});

	}


}
