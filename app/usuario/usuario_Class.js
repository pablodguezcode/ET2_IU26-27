class usuario extends AbstractEntidad {

	constructor(esTest=null){

		super();

		// la contraseña no se muestra en la tabla
		this.columnasamostrar = ['dni','usuario','id_rol'];
		// id_rol es una columna con tratamiento especial: el back la devuelve como el objeto del rol
		// {id_rol, rol_name, rol_description} y en la tabla se muestra el id del rol (ver mostrarcambioatributo)
		this.mostrarespecial = ['id_rol'];
		this.nombreentidad = 'usuario';

		this.dom = new entity_dom_fields();
		this.validations = new entity_validations();
		this.access_functions = new ExternalAccess();

		// El back permite dni y usuario repetidos, asi que la unicidad se comprueba aqui (validacion personalized de dni y de usuario).
		// usuarios_existentes: {dni, usuario} de los usuarios del back. Se carga al abrir ADD y EDIT y se vuelve a pedir justo antes de enviar.
		// Vacia (modo test) no encuentra repetidos, de modo que las validaciones siguen siendo sincronas y no usan el back.
		this.usuarios_existentes = [];
		// dni de la tupla que se esta editando (null en ADD): su propio usuario no cuenta como repetido en EDIT
		this.dni_en_edicion = null;

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

			<label id="label_contrasena" class="label_contrasena">Contraseña</label>
			<input type='password' id='contrasena' name='contrasena'>
			<span id="span_error_contrasena"><a id="error_contrasena"></a></span>
			<br>

			<label class="label_id_rol">Rol</label>
			<select id='id_rol' name='id_rol'>
				<!-- la primera opcion vacia permite que min_size falle si no se elige rol (y es "sin filtro" en SEARCH).
				     Las demas opciones (value = id_rol, texto = "id_rol - rol_name") las rellena cargar_roles() desde el back. -->
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

	//El usuario puede escribir la letra del DNI en minuscula o mayuscula, pero al back siempre se le envia en mayuscula: el valor del
	//campo se pasa a mayuscula antes de validarlo, en el onblur del campo y en el onsubmit del formulario (ver createForm_ADD y
	//createForm_SEARCH). Las validaciones NO modifican el campo, asi que una letra en minuscula que llegue a ellas (como en las
	//pruebas de usuario_tests.js) se rechaza por formato (dni_format_ko).
	dni_a_mayusculas(){

		var campo = document.getElementById('dni');
		if (campo == null){ return; }
		campo.value = campo.value.toUpperCase();
	}

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//En ADD el dni ademas debe ser unico (personalized). En EDIT el dni va en solo lectura (es la clave que identifica la tupla), por lo que no se valida.
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
		//personalized: letra de control (modulo 23) y que no exista ya un usuario con ese dni. La funcion recibe el valor, no lee del DOM
		if (!(this.personalize_dni(document.getElementById('dni').value))){
			this.dom.mostrar_error_campo('dni','dni_personalized_ko');
			return "dni_personalized_ko";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;
	}

	//Retorna true si la letra de control (numero mod 23) coincide con la del DNI y no existe ya un usuario con ese DNI.
	//Si no, devuelve false. Recibe el valor por parametro (no lee del DOM). Se llama despues de comprobar el formato (8 digitos + letra).
	personalize_dni(dni){

		var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
		if (dni_letters.charAt(parseInt(dni.substring(0, 8), 10) % 23) != dni.charAt(8)){
			return false;
		}
		if (this.usuarios_existentes.some(existente => existente.dni == dni)){
			return false;
		}
		return true;
	}

//Atributo usuario

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	//En ADD el usuario ademas debe ser unico (personalized)
	ADD_usuario_validation(){

		return this.validar_usuario(null);
	}

	//Validacion del usuario compartida por ADD y EDIT.
	//dni_excluido: dni de la tupla que se edita (null en ADD), para que su propio usuario no cuente como repetido
	validar_usuario(dni_excluido){

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
		//personalized: el usuario es UNIQUE y el back no lo impide
		if (!(this.personalize_usuario(document.getElementById('usuario').value, dni_excluido))){
			this.dom.mostrar_error_campo('usuario','usuario_personalized_ko');
			return "usuario_personalized_ko";
		}
		this.dom.mostrar_exito_campo('usuario');
		return true;
	}

	//Retorna true si no existe otro usuario con ese nombre de usuario, si no devuelve false.
	//Recibe el valor por parametro (no lee del DOM). Se compara exactamente (el back es utf8_bin: distingue mayusculas).
	//dni_excluido: dni de la tupla que se edita; esa tupla no cuenta como repetida (null en ADD).
	personalize_usuario(usuario, dni_excluido=null){

		return !this.usuarios_existentes.some(existente => existente.usuario == usuario && existente.dni != dni_excluido);
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
//El dni va en solo lectura en EDIT (identifica la tupla en el back): no se puede modificar, por lo que no tiene validacion ni test en EDIT.
//Lo unico que cambia respecto a ADD es la unicidad del usuario: la propia tupla no cuenta como repetida y se compara solo con el resto de tuplas.

	EDIT_usuario_validation(){

		return this.validar_usuario(this.dni_en_edicion);
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

	//Si el dni empieza por una letra seguida de numeros (Z1234) se pasa la letra al final (1234Z): la letra de un DNI va siempre al final,
	//asi que en una busqueda parcial se corrige en el propio campo. Dos letras o una letra entre numeros no se corrigen y dan error de formato.
	//La letra llega en mayuscula (el formulario la pasa a mayuscula antes de validar, ver dni_a_mayusculas).
	corregir_letra_dni_search(){

		var campo = document.getElementById('dni');
		if (campo == null){ return; }
		var partes = campo.value.trim().match(/^([A-Z])([0-9]+)$/);
		if (partes !== null){
			campo.value = partes[2] + partes[1];
		}
	}

	//Retorna true si el campo es valido, si no devuelve un string con el error de validacion
	SEARCH_dni_validation(){

		this.corregir_letra_dni_search();
		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_ko');
			return "dni_max_size_ko";
		}
		//busqueda parcial: vacio (sin filtro), o hasta 8 digitos y opcionalmente UNA letra al final (cualquier trozo de un DNI); dos letras, o una letra
		//entre numeros, dan error. La letra va en mayuscula (el formulario la pasa a mayuscula antes de validar, ver dni_a_mayusculas). No se recalcula la letra (ver usuario_tests.js)
		if (!(this.validations.format('dni', '^[0-9]{0,8}[A-Z]?$'))){
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
		this.dom.assign_property_value('form_iu','onsubmit','entidad.dni_a_mayusculas(); return entidad.dom.validarsubmit(entidad.ADD_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');

		// los select de la entidad se rellenan desde el back (el formulario se acaba de repintar y solo tiene la opcion vacia)
		this.cargar_roles();

		// ADD no edita ninguna tupla y los usuarios existentes se piden al back para comprobar la unicidad de dni y usuario
		this.dni_en_edicion = null;
		this.cargar_usuarios_existentes();

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// el dni se pasa a mayuscula al salir del campo, antes de validarlo
		document.getElementById('dni').setAttribute('onblur','entidad.dni_a_mayusculas(); entidad.ADD_dni_validation();');

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

	/**
	 * Construye el formulario de EDIT de usuario, relleno con los datos de la fila, y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la accion (boton submit con el icono EDIT) o cancelarla (icono BACK de index.html).
	 * - dni es la clave primaria con la que el back identifica la tupla: se muestra pero en solo lectura.
	 * - id_rol es un select: se cargan primero los roles del back y despues se selecciona el de la fila.
	 * - contrasena no se muestra en la tabla; si el back no la envia en la fila el campo queda vacio y hay que escribirla.
	 * - Si el back responde ok, AbstractEntidad.EDIT() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono EDIT
	 */
	async createForm_EDIT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_usuario_EDIT');

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

		// la clave primaria no se puede modificar
		this.dom.assign_property_value('dni','readonly',true);

		// tupla que se edita: su propio usuario no cuenta como repetido (ver personalize_usuario)
		this.dni_en_edicion = fila['dni'];

		setLang();

		// los roles llegan del back: hasta que no estan cargados no se puede seleccionar el de la fila.
		// Los usuarios existentes se piden a la vez para comprobar la unicidad del usuario
		await Promise.all([this.cargar_roles(), this.cargar_usuarios_existentes()]);

		// el formulario puede haberse cerrado o sustituido por otro (ADD, SEARCH...) mientras llegaba la respuesta del back
		var form = document.getElementById('form_iu');
		if (form == null || form.getAttribute('action') != 'javascript:entidad.EDIT();'){ return; }

		// rellenar los campos con los valores de la fila (id_rol puede venir como objeto del rol)
		this.dom.rellenarvaloresform({
			dni: fila['dni'],
			usuario: fila['usuario'],
			contrasena: (fila['contrasena'] === undefined || fila['contrasena'] === null) ? '' : fila['contrasena'],
			id_rol: this.valorclave(fila['id_rol'], 'id_rol')
		});

		setLang();
	}

	/**
	 * Construye el formulario de SEARCH de usuario y lo muestra en el div modal (Div_IU_form).
	 * - Opciones del modal: realizar la busqueda (boton submit con el icono SEARCH) o cancelarla (icono BACK de index.html).
	 * - Todos los campos son opcionales: vacio significa "sin filtro" (ver SEARCH_<campo>_validation).
	 * - contrasena es un dato sensible y no se usa como criterio de busqueda: se oculta con su label y se deshabilita para que no se envie al back.
	 * - Si el back responde, AbstractEntidad.SEARCH() oculta el formulario y muestra en la tabla las tuplas que coinciden.
	 */
	createForm_SEARCH(){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_usuario_SEARCH');

		// formulario vacio y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','entidad.dni_a_mayusculas(); return entidad.dom.validarsubmit(entidad.SEARCH_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.SEARCH();');

		// la contrasena no es criterio de busqueda
		this.dom.hide_element_form('contrasena');
		this.dom.hide_element('span_error_contrasena');
		document.getElementById('contrasena').disabled = true;

		// los roles se rellenan desde el back
		this.cargar_roles();

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','SEARCH');

		// el dni se pasa a mayuscula al salir del campo, antes de validarlo
		document.getElementById('dni').setAttribute('onblur','entidad.dni_a_mayusculas(); entidad.SEARCH_dni_validation();');

		// colocar boton de submit
		this.dom.colocarboton('SEARCH');

		setLang();
	}

	/**
	 * Construye el formulario de SHOWCURRENT de usuario: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - La unica opcion del modal es cerrarlo (icono BACK de index.html): no hay boton de submit ni se envia nada al back.
	 * - id_rol es un select: se cargan primero los roles del back y despues se selecciona el de la fila.
	 * - contrasena es un dato sensible y no se muestra: se oculta con su label.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono SHOWCURRENT
	 */
	async createForm_SHOWCURRENT(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_usuario_SHOWCURRENT');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// el formulario no se envia: solo se identifica para saber si sigue siendo este cuando llegue la respuesta del back
		this.dom.assign_property_value('form_iu','onsubmit','return false');
		this.dom.assign_property_value('form_iu','data-accion','SHOWCURRENT');

		// la contrasena no se muestra
		this.dom.hide_element_form('contrasena');
		this.dom.hide_element('span_error_contrasena');

		setLang();

		// los roles llegan del back: hasta que no estan cargados no se puede seleccionar el de la fila
		await this.cargar_roles();

		// el formulario puede haberse cerrado o sustituido por otro (ADD, EDIT...) mientras llegaba la respuesta del back
		var form = document.getElementById('form_iu');
		if (form == null || form.getAttribute('data-accion') != 'SHOWCURRENT'){ return; }

		// rellenar los campos con los valores de la fila (id_rol puede venir como objeto del rol); la contrasena no se rellena
		this.dom.rellenarvaloresform({
			dni: fila['dni'],
			usuario: fila['usuario'],
			contrasena: '',
			id_rol: this.valorclave(fila['id_rol'], 'id_rol')
		});

		// todos los campos en solo lectura (el select se deshabilita porque readonly no le afecta)
		this.dom.colocartodosreadonly('form_iu');
		document.getElementById('id_rol').disabled = true;

		setLang();
	}

	/**
	 * Retorna true. En DELETE todos los campos van en solo lectura con los datos de la fila, asi que no hay nada que validar.
	 * Se mantiene para que el onsubmit tenga la misma forma que el de las demas acciones (ver createForm_DELETE()).
	 */
	DELETE_submit_usuario(){

		return true;
	}

	/**
	 * Construye el formulario de DELETE de usuario: los datos de la fila en solo lectura, en el div modal (Div_IU_form).
	 * - Opciones del modal: confirmar el borrado (boton submit con el icono DELETE) o cancelarlo (icono BACK de index.html).
	 * - El boton de submit solo se coloca cuando el formulario ya esta relleno, para no poder enviar un borrado sin datos.
	 * - Si el back responde ok, AbstractEntidad.DELETE() oculta el formulario y actualiza la tabla; si responde error, se muestra
	 *   el modal de error y el formulario sigue como antes del envio.
	 * - id_rol es un select: se cargan primero los roles del back, se selecciona el de la fila y se dejan solo esa opcion
	 *   (readonly no afecta a un select y un select deshabilitado no se envia al back).
	 * - contrasena no se muestra ni se envia: se oculta con su label y se deshabilita.
	 *
	 * @param {Object} fila datos de la tupla sobre la que se pulso el icono DELETE
	 */
	async createForm_DELETE(fila){

		// poner titulo al formulario
		this.dom.assign_property_value('class_contenido_titulo_form','class','text_contenido_titulo_form_usuario_DELETE');

		// formulario vacio (se regenera siempre para que no queden datos ni errores de una accion anterior) y visible como div modal
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form');

		// poner onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.dom.validarsubmit(entidad.DELETE_submit_'+this.nombreentidad+'())');
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

		// la contrasena no se muestra ni se envia
		this.dom.hide_element_form('contrasena');
		this.dom.hide_element('span_error_contrasena');
		document.getElementById('contrasena').disabled = true;

		setLang();

		// los roles llegan del back: hasta que no estan cargados no se puede seleccionar el de la fila
		await this.cargar_roles();

		// el formulario puede haberse cerrado o sustituido por otro (ADD, EDIT...) mientras llegaba la respuesta del back
		var form = document.getElementById('form_iu');
		if (form == null || form.getAttribute('action') != 'javascript:entidad.DELETE();'){ return; }

		// rellenar los campos con los valores de la fila (id_rol puede venir como objeto del rol)
		this.dom.rellenarvaloresform({
			dni: fila['dni'],
			usuario: fila['usuario'],
			contrasena: '',
			id_rol: this.valorclave(fila['id_rol'], 'id_rol')
		});

		// todos los campos en solo lectura; el select se queda solo con la opcion seleccionada para que no se pueda cambiar
		this.dom.colocartodosreadonly('form_iu');
		var select = document.getElementById('id_rol');
		Array.from(select.options).filter(opcion => !opcion.selected).forEach(opcion => opcion.remove());

		// colocar boton de submit
		this.dom.colocarboton('DELETE');

		setLang();
	}

	/**
	 * El back devuelve las claves foraneas como el objeto completo (p.e. {id_rol, rol_name, rol_description}) o como valor simple.
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
                                 			Unicidad de dni y usuario (el back no la impide)
****************************************************************************************************************************/

	/**
	 * Refactoriza AbstractEntidad.ADD() (misma definicion). El back permite dni y usuario repetidos, por lo que la unicidad la
	 * comprueba el front como validacion personalized (dni_personalized_ko / usuario_personalized_ko, ver personalize_dni y
	 * personalize_usuario). Las validaciones de campo usan la lista cargada al abrir el formulario; justo antes de enviar se vuelve a
	 * pedir al back por si otro usuario dio de alta uno mientras tanto y se validan de nuevo todos los campos. Si alguno falla no se
	 * envia nada y quedan marcados los errores; si todo es correcto el alta sigue como siempre (AbstractEntidad.ADD()).
	 */
	async ADD(){

		await this.cargar_usuarios_existentes();
		if (this.ADD_submit_usuario() !== true){ return; }
		await super.ADD();
	}

	/**
	 * Refactoriza AbstractEntidad.EDIT() (misma definicion): igual que ADD(), comprueba antes de enviar que el usuario modificado
	 * no lo tenga ya otra tupla (el usuario es UNIQUE y el back no lo impide).
	 */
	async EDIT(){

		await this.cargar_usuarios_existentes();
		if (this.EDIT_submit_usuario() !== true){ return; }
		await super.EDIT();
	}

	/**
	 * Pide al back todos los usuarios y guarda en usuarios_existentes su dni y su usuario, que son los que se comprueban en
	 * personalize_dni() y personalize_usuario(). Se envia un FormData vacio ('') para que los campos del formulario no filtren la busqueda.
	 */
	async cargar_usuarios_existentes(){

		var respuesta = await this.access_functions.peticionBackGeneral('', 'usuario', 'SEARCH');

		this.usuarios_existentes = (respuesta['code'] == 'RECORDSET_DATOS')
			? respuesta['resource'].map(fila => ({dni: this.valorclave(fila['dni'], 'dni'), usuario: fila['usuario']}))
			: [];
	}


/***************************************************************************************************************************
                                 			Atributos con formato especial en la tabla
****************************************************************************************************************************/

	/**
	 * Devuelve el formato especial con el que se muestra en la tabla el valor de un atributo incluido en mostrarespecial.
	 * - id_rol: el back devuelve el objeto del rol {id_rol, rol_name, rol_description} y se muestra id_rol
	 *   (si llegara como valor simple, se deja tal cual).
	 *
	 * @param {string} atributo nombre del atributo
	 * @param {*} valorentrada valor que manda el back
	 * @returns {*} valor a mostrar en la tabla
	 */
	mostrarcambioatributo(atributo, valorentrada){

		if (atributo == 'id_rol' && valorentrada !== null && typeof valorentrada == 'object'){
			return valorentrada['id_rol'];
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
	 * (value = id_rol, texto = "id_rol - rol_name": el usuario elige el rol por su nombre pero se valida y se envia al back el id_rol).
	 * La primera opcion vacia viene de manual_form_creation().
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
					opcion.text = fila['id_rol'] + ' - ' + fila['rol_name'];
					select.append(opcion);
				}
				select.value = valoractual;
			}
		});

	}

}