class usuario extends AbstractEntidad {

	constructor(esTest=null){

		super();

		// la contraseña no se muestra en la tabla
		this.columnasamostrar = ['dni','usuario','id_rol'];
		// id_rol es una columna con tratamiento especial: el back la devuelve como el objeto del rol
		// {id_rol, rol_name, rol_description} y en la tabla se muestra el nombre del rol (ver mostrarcambioatributo)
		this.mostrarespecial = ['id_rol'];
		this.nombreentidad = 'usuario';

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
	 * @returns {string}
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>


			<label class="label_dni">DNI</label>
			<input type='text' id='dni' name='dni'>
			<span id="span_error_dni"><a id="error_dni"></a></span>
			<br>

			<label class="label_usuario">Usuario</label>
			<input type='text' id='usuario' name='usuario'>
			<span id="span_error_usuario"><a id="error_usuario"></a></span>
			<br>

			<label class="label_contrasena">Contraseña</label>
			<input type='password' id='contrasena' name='contrasena'>
			<span id="span_error_contrasena"><a id="error_contrasena"></a></span>
			<br>

			<label class="label_id_rol">Rol</label>
			<select id='id_rol' name='id_rol'>
				<!-- la primera opcion vacia permite que min_size falle si no se elige rol (y es "sin filtro" en SEARCH).
				     Las demas opciones (value = id_rol, texto = rol_name) las rellena cargar_roles() desde el back. -->
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
		if (!(this.personalize_dni(document.getElementById('dni').value))){
			this.dom.mostrar_error_campo('dni','dni_personalized_ko');
			return "dni_personalized_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	//Retorna true si la letra de control (numero mod 23) coincide con la del DNI, si no devuelve false.
	//Recibe el valor por parametro (no lee del DOM). Se llama despues de comprobar el formato (8 digitos + letra).
	personalize_dni(dni){

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

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	ADD_submit_usuario(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.dni = this.ADD_dni_validation();
		set_result.usuario = this.ADD_usuario_validation();
		set_result.contrasena = this.ADD_contrasena_validation();
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

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	EDIT_submit_usuario(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.dni = this.EDIT_dni_validation();
		set_result.usuario = this.EDIT_usuario_validation();
		set_result.contrasena = this.EDIT_contrasena_validation();
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
	//ni campo contrasena en el formulario de busqueda. El metodo existe para que haya un SEARCH_<campo>_validation()
	//por cada atributo. No toca el DOM y siempre devuelve true.
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

	//Retorna true si todos los campos son validos. Si alguno no lo es devuelve un objeto con el id de cada campo y su resultado
	//(true o el codigo de error). Se ejecutan TODAS las validaciones para que se muestren todos los errores a la vez.
	//Se invoca desde el onsubmit del formulario a traves de dom.validarsubmit().
	SEARCH_submit_usuario(){

		// objeto donde se almacena el resultado de la validacion de cada campo (id del campo -> true o codigo de error)
		var set_result = {};

		set_result.dni = this.SEARCH_dni_validation();
		set_result.usuario = this.SEARCH_usuario_validation();
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
	 * Construye el formulario de ADD de usuario y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono ADD) o cancelarla (icono BACK de index.html).
	 * - Cada campo se valida al salir de el (colocarvalidaciones) y todos se comprueban en el onsubmit antes de enviar al back.
	 * - Si el back responde ok, AbstractEntidad.ADD() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 * - id_rol es un select con los roles que devuelve el back (cargar_roles()); contrasena es de tipo password.
	 */
	createForm_ADD(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_usuario_ADD');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de un ADD anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

		// los select de la entidad se rellenan desde el back (el formulario se acaba de repintar y solo tiene la opcion vacia)
		this.cargar_roles();

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	//Stubs (alert): los formularios de EDIT, DELETE, SHOWCURRENT y SEARCH todavia no estan implementados
	//(se mantienen tal y como estaban en la entrega anterior).

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.dni);
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


/***************************************************************************************************************************
                                 			Atributos con formato especial en la tabla
****************************************************************************************************************************/

	/**
	 * Devuelve el formato especial con el que se muestra en la tabla el valor de un atributo incluido en mostrarespecial.
	 * - id_rol: el back devuelve el objeto del rol {id_rol, rol_name, rol_description} y se muestra rol_name
	 *   (si llegara como valor simple, se deja tal cual).
	 *
	 * @param {string} atributo nombre del atributo
	 * @param {*} valorentrada valor que manda el back
	 * @returns {*} valor a mostrar en la tabla
	 */
	mostrarcambioatributo(atributo, valorentrada){

		if (atributo == 'id_rol' && valorentrada !== null && typeof valorentrada == 'object'){
			return (valorentrada['rol_name'] !== undefined) ? valorentrada['rol_name'] : valorentrada['id_rol'];
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

}
