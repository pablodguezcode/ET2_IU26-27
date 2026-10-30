var textos_ES = {

	// ============================================================================
	// TEXTOS GENERALES Y NAVEGACION
	// ============================================================================
	'text_titulo_app': 'Interfaz ET2 IU',
	'text_titulo_menu': 'Opciones Menú',
	'text_titulo_pie': 'Pie de página',
	'label_seleccioncolumnas': 'Seleccionar columnas',

	// ============================================================================
	// MENU PRINCIPAL
	// ============================================================================
	'text_menu_persona': 'Gestionar persona',
	'text_menu_usuario': 'Gestionar usuario',
	'text_menu_rol': 'Gestionar rol',
	'text_menu_accion': 'Gestionar acción',
	'text_menu_funcionalidad': 'Gestionar funcionalidad',
	'text_menu_rolaccionfuncionalidad': 'Gestionar rol_accion_funcionalidad',
	'text_menu_funcionalidad_accion': 'Gestionar funcionalidad_accion',

	// ============================================================================
	// TITULOS DE PAGINAS POR ENTIDAD
	// ============================================================================
	'text_titulo_page_persona': 'Gestión de Datos Personales',
	'text_titulo_page_usuario': 'Gestión de Usuarios',
	'text_titulo_page_rol': 'Gestión de Roles',
	'text_titulo_page_accion': 'Gestión de Acciones',
	'text_titulo_page_funcionalidad': 'Gestión de Funcionalidades',
	'text_titulo_page_rolaccionfuncionalidad': 'Gestión de Roles, Acciones y Funcionalidades',
	'text_titulo_page_funcionalidad_accion': 'Gestión de Funcionalidades y Acciones',

	// ============================================================================
	// ENTIDAD: PERSONA
	// ============================================================================
	// --- Títulos de formularios
	'text_contenido_titulo_form_persona_ADD': 'Formulario Alta Datos Personales',
	'text_contenido_titulo_form_persona_EDIT': 'Formulario Modificación Datos Personales',
	'text_contenido_titulo_form_persona_SEARCH': 'Formulario Búsqueda Datos Personales',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Detalle de Datos Personales',
	'text_contenido_titulo_form_persona_DELETE': 'Formulario Baja Datos Personales',

	// --- Atributos (cabeceras de tabla)
	'dni': 'DNI',
	'nombre_persona': 'Nombre',
	'apellidos_persona': 'Apellidos',
	'fechaNacimiento_persona': 'Fecha de nacimiento',
	'direccion_persona': 'Dirección',
	'telefono_persona': 'Teléfono',
	'email_persona': 'Correo electrónico',
	'foto_persona': 'Foto',

	// --- Labels de formulario
	'label_dni': 'DNI',
	'label_nombre_persona': 'Nombre de pila',
	'label_apellidos_persona': 'Apellidos',
	'label_fechaNacimiento_persona': 'Fecha de Nacimiento',
	'label_direccion_persona': 'Dirección Postal',
	'label_telefono_persona': 'Teléfono Persona',
	'label_email_persona': 'Correo Electrónico',
	'label_foto_persona': 'Foto Persona',
	'label_nuevo_foto_persona': 'Nueva Foto Persona',

	// --- Errores de validación - DNI
	'dni_min_size_ko': 'El DNI es demasiado corto: debe tener 9 caracteres',
	'dni_max_size_ko': 'El DNI es demasiado largo: debe tener 9 caracteres',
	'dni_format_ko': 'El formato del DNI no es válido: deben ser 8 dígitos seguidos de una letra (mayúscula o minúscula). En la búsqueda se admite un DNI parcial',
	'dni_personalized_ko': 'El DNI no es válido: la letra de control no es correcta o el DNI ya está en uso',
	'dni_es_nulo_ko': 'El dni no puede ser vacio',
	'dni_EXISTE_en_persona_KO': 'Ya existe una persona con ese DNI',

	// --- Errores de validación - Nombre
	'nombre_persona_min_size_ko': 'El nombre es demasiado corto: debe tener al menos 2 caracteres',
	'nombre_persona_max_size_ko': 'El nombre es demasiado largo: no puede superar los 45 caracteres',
	'nombre_persona_format_ko': 'El nombre contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios',

	// --- Errores de validación - Apellidos
	'apellidos_persona_min_size_ko': 'Los apellidos son demasiado cortos: deben tener al menos 3 caracteres',
	'apellidos_persona_max_size_ko': 'Los apellidos son demasiado largos: no pueden superar los 100 caracteres',
	'apellidos_persona_format_ko': 'Los apellidos contienen caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios',

	// --- Errores de validación - Fecha de nacimiento
	'fechaNacimiento_persona_min_size_ko': 'La fecha de nacimiento es demasiado corta: debe tener 8 caracteres (dd/mm/aaaa) o (d/m/aaaa)',
	'fechaNacimiento_persona_max_size_ko': 'La fecha de nacimiento es demasiado larga: no puede superar los 10 caracteres (dd/mm/aaaa)',
	'fechaNacimiento_persona_format_ko': 'El formato de la fecha de nacimiento no es válido: debe ser dd/mm/aaaa (en la búsqueda solo se permiten dígitos y /)',
	'fechaNacimiento_persona_personalized_ko': 'La fecha de nacimiento no es válida: debe existir en el calendario y no ser posterior a hoy',

	// --- Errores de validación - Dirección
	'direccion_persona_min_size_ko': 'La dirección es demasiado corta: debe tener al menos 10 caracteres',
	'direccion_persona_max_size_ko': 'La dirección es demasiado larga: no puede superar los 200 caracteres',
	'direccion_persona_format_ko': 'La dirección contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), números, puntos, guiones, punto y coma, espacios y /',

	// --- Errores de validación - Teléfono
	'telefono_persona_min_size_ko': 'El teléfono es demasiado corto: debe tener 9 dígitos',
	'telefono_persona_max_size_ko': 'El teléfono es demasiado largo: no puede superar los 9 dígitos',
	'telefono_persona_format_ko': 'El formato del teléfono no es válido: solo se permiten dígitos numéricos (9 en total)',
	'telefono_persona_personalized_ko': 'El teléfono no es un número español válido: debe empezar por 6, 7, 8 o 9',

	// --- Errores de validación - Email
	'email_persona_min_size_ko': 'El email es demasiado corto: debe tener al menos 6 caracteres',
	'email_persona_max_size_ko': 'El email es demasiado largo: no puede superar los 45 caracteres',
	'email_persona_format_ko': 'El formato del email no es válido: debe ser del tipo usuario@dominio.ext (en la búsqueda se admite un trozo, con letras, números, @, puntos y guiones)',

	// --- Errores de validación - Foto (metadatos)
	'foto_persona_min_size_ko': 'El nombre del fichero es demasiado corto: debe tener al menos 5 caracteres extensión incluida',
	'foto_persona_max_size_ko': 'El nombre del fichero es demasiado largo: no puede superar los 15 caracteres extensión incluida',
	'foto_persona_format_ko': 'El nombre del fichero no es válido: solo se permiten letras y punto',
	'foto_persona_personalized_ko': 'El tipo de fichero no está permitido: solo se admite jpg o jpeg',

	// --- Errores de validación - Foto (carga)
	'nuevo_foto_persona_exist_file_ko': 'No se ha seleccionado ningún fichero: debe subir una foto',
	'nuevo_foto_persona_max_size_file_ko': 'El fichero es demasiado grande: no puede superar los 2 MB',
	'nuevo_foto_persona_type_file_ko': 'El tipo de fichero no está permitido: solo se admite jpg o jpeg',
	'nuevo_foto_persona_format_name_file_ko': 'El nombre del fichero no es válido: solo se permiten letras y punto',
	'nuevo_foto_persona_max_size_ko': 'El nombre del fichero es demasiado largo: no puede superar los 15 caracteres extensión incluida',

	// ============================================================================
	// ENTIDAD: USUARIO
	// ============================================================================
	// --- Títulos de formularios
	'text_contenido_titulo_form_usuario_ADD': 'Formulario Alta Usuario',
	'text_contenido_titulo_form_usuario_EDIT': 'Formulario Modificación Usuario',
	'text_contenido_titulo_form_usuario_SEARCH': 'Formulario Búsqueda Usuario',
	'text_contenido_titulo_form_usuario_SHOWCURRENT': 'Detalle de Usuario',
	'text_contenido_titulo_form_usuario_DELETE': 'Formulario Baja Usuario',

	// --- Atributos (cabeceras de tabla)
	'usuario': 'Usuario',
	'contrasena': 'Contraseña',
	'id_rol': 'Id. de rol',

	// --- Labels de formulario
	'label_usuario': 'Usuario',
	'label_contrasena': 'Contraseña',
	'label_id_rol': 'Identificador de rol',

	// --- Errores de validación - Usuario
	'usuario_min_size_ko': 'El nombre de usuario es demasiado corto. Debe tener una longitud mínima de 5 caracteres alfabéticos.',
	'usuario_max_size_ko': 'El nombre de usuario supera el límite máximo permitido. No puede exceder de 45 caracteres.',
	'usuario_format_ko': 'El nombre de usuario debe contener únicamente caracteres alfabéticos, sin \'ñ\' ni acentos.',
	'usuario_personalized_ko': 'Ya existe un usuario con ese nombre de usuario. Elija otro.',

	// --- Errores de validación - Contraseña
	'contrasena_min_size_ko': 'La contraseña es demasiado corta. Por seguridad, se exige un mínimo estricto de 8 caracteres.',
	'contrasena_max_size_ko': 'La contraseña sobrepasa el límite de capacidad permitido. No puede superar los 45 caracteres.',
	'contrasena_format_ko': 'La contraseña solo puede contener caracteres alfabéticos, sin \'ñ\' ni acentos.',

	// --- Errores de validación - Rol (en usuario)
	'id_rol_min_size_ko': 'El identificador del rol es obligatorio: debe tener al menos 1 dígito',
	'id_rol_max_size_ko': 'El identificador del rol supera los 11 dígitos numéricos permitidos',
	'id_rol_format_ko': 'El identificador del rol solo puede estar formado por dígitos numéricos',

	// --- Errores de acciones específicas
	'admin_no_se_puede_modificar_ko': 'El admin no se puede modificar',

	// ============================================================================
	// ENTIDAD: ROL
	// ============================================================================
	// --- Títulos de formularios
	'text_contenido_titulo_form_rol_ADD': 'Formulario Alta Rol',
	'text_contenido_titulo_form_rol_EDIT': 'Formulario Modificación Rol',
	'text_contenido_titulo_form_rol_SEARCH': 'Formulario Búsqueda Rol',
	'text_contenido_titulo_form_rol_SHOWCURRENT': 'Detalle de Rol',
	'text_contenido_titulo_form_rol_DELETE': 'Formulario Baja Rol',
	'text_contenido_titulo_form_funcionalidad_ADD': 'Formulario Alta Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_EDIT': 'Formulario Modificación Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_SEARCH': 'Formulario Búsqueda Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_SHOWCURRENT': 'Detalle de Funcionalidad',
	'text_contenido_titulo_form_funcionalidad_DELETE': 'Formulario Baja Funcionalidad',

	// --- Atributos (cabeceras de tabla)
	'rol_name': 'Nombre del rol',
	'rol_description': 'Descripción del rol',

	// --- Labels de formulario
	'label_rol_name': 'Nombre del rol',
	'label_rol_description': 'Descripción del rol',

	// --- Errores de validación - Nombre del rol
	'rol_name_min_size_ko': 'El nombre del rol es corto, introduzca por lo menos 5 caracteres',
	'rol_name_max_size_ko': 'El nombre del rol es demasiado largo, introduzca hasta 48 caracteres',
	'rol_name_format_ko': 'El formato del nombre del rol es incorrecto. Solo se admiten caracteres alfabéticos (con la ñ y acentos incluidos), sin espacios, números ni signos',

	// --- Errores de validación - Descripción del rol
	'rol_description_min_size_ko': 'La descripción del rol es corta, introduzca por lo menos 5 caracteres',
	'rol_description_max_size_ko': 'La descripción del rol es demasiado larga, introduzca hasta 200 caracteres',
	'rol_description_format_ko': 'El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números',

	// ============================================================================
	// ENTIDAD: ACCION
	// ============================================================================
	// --- Títulos de formularios
	'text_contenido_titulo_form_accion_ADD': 'Formulario Alta Acción',
	'text_contenido_titulo_form_accion_EDIT': 'Formulario Modificación Acción',
	'text_contenido_titulo_form_accion_SEARCH': 'Formulario Búsqueda Acción',
	'text_contenido_titulo_form_accion_SHOWCURRENT': 'Detalle de Acción',
	'text_contenido_titulo_form_accion_DELETE': 'Formulario Baja Acción',

	// --- Atributos (cabeceras de tabla)
	'id_accion': 'Id. de acción',
	'nombre_accion': 'Nombre de la acción',
	'descrip_accion': 'Descripción de la acción',

	// --- Labels de formulario
	'label_id_accion': 'Identificador de acción',
	'label_nombre_accion': 'Nombre de la acción',
	'label_descrip_accion': 'Descripción de la acción',

	// --- Errores de validación - Id de acción
	'id_accion_min_size_ko': 'El identificador de la acción es obligatorio: debe tener al menos 1 dígito',
	'id_accion_max_size_ko': 'El identificador de la acción supera los 11 dígitos numéricos permitidos',
	'id_accion_format_ko': 'El identificador de la acción solo puede estar formado por dígitos numéricos',

	// --- Errores de validación - Nombre de la acción
	'nombre_accion_min_size_ko': 'El nombre de la acción es corto, introduzca por lo menos 5 caracteres',
	'nombre_accion_max_size_ko': 'El nombre de la acción es demasiado largo, introduzca hasta 48 caracteres',
	'nombre_accion_format_ko': 'El formato del nombre de la acción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos',

	// --- Errores de validación - Descripción de la acción
	'descrip_accion_min_size_ko': 'La descripción de la acción es corta, introduzca por lo menos 5 caracteres',
	'descrip_accion_max_size_ko': 'La descripción de la acción es demasiado larga, introduzca hasta 200 caracteres',
	'descrip_accion_format_ko': 'El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números',

	// ============================================================================
	// ENTIDAD: FUNCIONALIDAD
	// ============================================================================
	// --- Atributos (cabeceras de tabla)
	'id_funcionalidad': 'Id. de funcionalidad',
	'nombre_funcionalidad': 'Nombre de la funcionalidad',
	'descrip_funcionalidad': 'Descripción de la funcionalidad',

	// --- Labels de formulario
	'label_id_funcionalidad': 'Identificador de funcionalidad',
	'label_nombre_funcionalidad': 'Nombre de la funcionalidad',
	'label_descrip_funcionalidad': 'Descripción de la funcionalidad',

	// --- Errores de validación - Id de funcionalidad
	'id_funcionalidad_min_size_ko': 'El identificador de la funcionalidad es obligatorio: debe tener al menos 1 dígito',
	'id_funcionalidad_max_size_ko': 'El identificador de la funcionalidad supera los 11 dígitos numéricos permitidos',
	'id_funcionalidad_format_ko': 'El identificador de la funcionalidad solo puede estar formado por dígitos numéricos',

	// --- Errores de validación - Nombre de la funcionalidad
	'nombre_funcionalidad_min_size_ko': 'El nombre de la funcionalidad es corto, introduzca por lo menos 5 caracteres',
	'nombre_funcionalidad_max_size_ko': 'El nombre de la funcionalidad es demasiado largo, introduzca hasta 48 caracteres',
	'nombre_funcionalidad_format_ko': 'El formato del nombre de la funcionalidad es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos',

	// --- Errores de validación - Descripción de la funcionalidad
	'descrip_funcionalidad_min_size_ko': 'La descripción de la funcionalidad es corta, introduzca por lo menos 5 caracteres',
	'descrip_funcionalidad_max_size_ko': 'La descripción de la funcionalidad es demasiado larga, introduzca hasta 200 caracteres',
	'descrip_funcionalidad_format_ko': 'El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números',

	// ============================================================================
	// ENTIDAD: FUNCIONALIDAD_ACCION (Relación)
	// ============================================================================
	// --- Títulos de formularios
	'text_contenido_titulo_form_funcionalidad_accion_ADD': 'Formulario Alta Funcionalidad_Acción',
	'text_contenido_titulo_form_funcionalidad_accion_EDIT': 'Formulario Modificación Funcionalidad_Acción',
	'text_contenido_titulo_form_funcionalidad_accion_SEARCH': 'Formulario Búsqueda Funcionalidad_Acción',
	'text_contenido_titulo_form_funcionalidad_accion_SHOWCURRENT': 'Detalle de Funcionalidad_Acción',
	'text_contenido_titulo_form_funcionalidad_accion_DELETE': 'Formulario Baja Funcionalidad_Acción',

	// ============================================================================
	// CABECERAS DE LAS COLUMNAS DE ACCION DE LA TABLA
	// (la clave es el nombre de la columna: dom_table la pone como class del th y setLang() la traduce)
	// ============================================================================
	'EDIT': 'Editar',
	'DELETE': 'Borrar',
	'SHOWCURRENT': 'Ver detalle',

	// ============================================================================
	// MENSAJES DE ERROR GENERALES
	// ============================================================================
	'RECORDSET_VACIO': 'No hay coincidencias para la búsqueda',
	// Texto que se muestra delante del codigo cuando el back devuelve un codigo de error que no tiene traduccion (ver abrirModalError)
	'text_error_back_generico': 'Se ha producido un error al realizar la operación',

	// ============================================================================
	// VENTANA DE RESULTADOS DE TEST
	// ============================================================================
	'text_test_titulo': 'Resultado de las pruebas de',
	'text_test_total': 'Pruebas',
	'text_test_correctas': 'Correctas',
	'text_test_incorrectas': 'Incorrectas',
	'text_test_col_entidad': 'Entidad',
	'text_test_col_campo': 'Campo',
	'text_test_col_NumDef': 'Nº test',
	'text_test_col_NumPrueba': 'Nº prueba',
	'text_test_col_descripcion': 'Descripción',
	'text_test_col_accion': 'Acción',
	'text_test_col_valorprueba': 'Valor de prueba',
	'text_test_col_respuestaesperada': 'Respuesta esperada',
	'text_test_col_resultadoprueba': 'Resultado obtenido',
	'text_test_col_pruebastatus': 'Estado',
	'text_test_col_traduccionError': 'Mensaje de respuesta',
	// Data_Test busca la traduccion con window.traduccion[resultadoprueba]; cuando la validacion devuelve true la clave es 'true'.
	// Sin esta clave la columna del mensaje mostraba 'sintraduccion' en todas las pruebas de exito.
	'true': 'Valor válido: cumple todas las comprobaciones',
	'text_matriz_id_funcionalidad': 'id funcionalidad',
	'text_matriz_id_accion': 'id acción',
	'test_ventana_bloqueada_ko': 'El navegador ha bloqueado la ventana de resultados de las pruebas. Permita las ventanas emergentes para esta página.',

}