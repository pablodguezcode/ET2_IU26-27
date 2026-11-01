var textos_EN = {

	// ============================================================================
	// GENERAL TITLES AND NAVIGATION
	// ============================================================================
	'text_titulo_app': 'IU ET2 Interface',
	'text_titulo_menu': 'Menu Options',
	'text_titulo_pie': 'Footer',
	'label_seleccioncolumnas': 'Select columns',

	// ============================================================================
	// MAIN MENU
	// ============================================================================
	'text_menu_persona': 'Person Management',
	'text_menu_usuario': 'User Management',
	'text_menu_rol': 'Role Management',
	'text_menu_accion': 'Action Management',
	'text_menu_funcionalidad': 'Feature Management',
	'text_menu_rolaccionfuncionalidad': 'Role-Action-Feature Management',
	'text_menu_funcionalidad_accion': 'Feature-Action Management',

	// ============================================================================
	// PAGE TITLES BY ENTITY
	// ============================================================================
	'text_titulo_page_persona': 'Personal Data Management',
	'text_titulo_page_usuario': 'User Management',
	'text_titulo_page_rol': 'Role Management',
	'text_titulo_page_accion': 'Action Management',
	'text_titulo_page_funcionalidad': 'Feature Management',
	'text_titulo_page_rolaccionfuncionalidad': 'Role, Action and Feature Management',
	'text_titulo_page_funcionalidad_accion': 'Feature and Action Management',

	// ============================================================================
	// ENTITY: PERSON
	// ============================================================================
	// --- Form titles
	'text_contenido_titulo_form_persona_ADD': 'Personal Data ADD Form',
	'text_contenido_titulo_form_persona_EDIT': 'Personal Data EDIT Form',
	'text_contenido_titulo_form_persona_SEARCH': 'Personal Data SEARCH Form',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Personal Data Detail',
	'text_contenido_titulo_form_persona_DELETE': 'Personal Data DELETE Form',

	// --- Attributes (table headers)
	'dni': 'ID number (DNI)',
	'nombre_persona': 'First name',
	'apellidos_persona': 'Last name',
	'fechaNacimiento_persona': 'Date of birth',
	'direccion_persona': 'Address',
	'telefono_persona': 'Phone',
	'email_persona': 'Email',
	'foto_persona': 'Photo',

	// --- Form labels
	'label_dni': 'ID number (DNI)',
	'label_nombre_persona': 'First name',
	'label_apellidos_persona': 'Last name',
	'label_fechaNacimiento_persona': 'Date of Birth',
	'label_direccion_persona': 'Postal Address',
	'label_telefono_persona': 'Phone Number',
	'label_email_persona': 'Email',
	'label_foto_persona': 'Photo',
	'label_nuevo_foto_persona': 'New Photo',

	// --- Validation errors - DNI
	'dni_min_size_ko': 'The ID number is too short: it must have 9 characters',
	'dni_max_size_ko': 'The ID number is too long: it must have 9 characters',
	'dni_format_ko': 'The ID number format is not valid: it must be 8 digits and an uppercase letter (in searches: only digits and at most one letter, at the end)',
	'dni_personalized_ko': 'The ID number is not valid: the control letter is not correct or the ID number is already in use',

	// --- Validation errors - Name
	'nombre_persona_min_size_ko': 'The name is too short: it must have at least 2 characters',
	'nombre_persona_max_size_ko': 'The name is too long: it cannot exceed 45 characters',
	'nombre_persona_format_ko': 'The name contains invalid characters: only letters (including ñ and accents), periods, hyphens and spaces are allowed',

	// --- Validation errors - Last name
	'apellidos_persona_min_size_ko': 'The last name is too short: it must have at least 3 characters',
	'apellidos_persona_max_size_ko': 'The last name is too long: it cannot exceed 100 characters',
	'apellidos_persona_format_ko': 'The last name contains invalid characters: only letters (including ñ and accents), periods, hyphens and spaces are allowed',

	// --- Validation errors - Date of birth
	'fechaNacimiento_persona_min_size_ko': 'The date of birth is too short: it must have at least 8 characters (d/m/yyyy or d-m-yyyy)',
	'fechaNacimiento_persona_max_size_ko': 'The date of birth is too long: it cannot exceed 10 characters (dd/mm/yyyy or dd-mm-yyyy)',
	'fechaNacimiento_persona_format_ko': 'The date of birth format is not valid: it must be dd/mm/yyyy or dd-mm-yyyy (in ADD and EDIT also yyyy/mm/dd or mm/dd/yyyy with a day greater than 12, which are reordered; in the search only digits, / and -)',
	'fechaNacimiento_persona_personalized_ko': 'The date of birth is not valid: it must exist in the calendar and cannot be later than today',

	// --- Validation errors - Address
	'direccion_persona_min_size_ko': 'The address is too short: it must have at least 10 characters',
	'direccion_persona_max_size_ko': 'The address is too long: it cannot exceed 200 characters',
	'direccion_persona_format_ko': 'The address contains invalid characters: only letters (including ñ and accents), numbers, periods, hyphens, semicolons, spaces and / are allowed',

	// --- Validation errors - Phone
	'telefono_persona_min_size_ko': 'The phone number is too short: it must have 9 digits',
	'telefono_persona_max_size_ko': 'The phone number is too long: it cannot exceed 9 digits',
	'telefono_persona_format_ko': 'The phone number format is not valid: only numeric digits are allowed (9 in total)',
	'telefono_persona_personalized_ko': 'The phone number is not a valid Spanish number: it must start with 6, 7, 8 or 9',

	// --- Validation errors - Email
	'email_persona_min_size_ko': 'The email is too short: it must have at least 6 characters',
	'email_persona_max_size_ko': 'The email is too long: it cannot exceed 45 characters',
	'email_persona_format_ko': 'The email format is not valid: it must be of the form user@domain.ext (in the search a fragment is accepted, with letters, numbers, @, periods, hyphens and underscores)',

	// --- Validation errors - Photo (metadata)
	'foto_persona_min_size_ko': 'The file name is too short: it must have at least 5 characters including the extension',
	'foto_persona_max_size_ko': 'The file name is too long: it cannot exceed 15 characters including the extension',
	'foto_persona_format_ko': 'The file name is not valid: only letters and periods',
	'foto_persona_personalized_ko': 'The file type is not allowed: only jpg or jpeg is accepted',

	// --- Validation errors - Photo (upload)
	'nuevo_foto_persona_exist_file_ko': 'No file selected: a photo must be uploaded',
	'nuevo_foto_persona_max_size_file_ko': 'The file is too large: it cannot exceed 2 MB',
	'nuevo_foto_persona_type_file_ko': 'The file type is not allowed: only jpg or jpeg is accepted',
	'nuevo_foto_persona_format_name_file_ko': 'The file name is not valid: only letters and periods are allowed, and it must be between 5 and 15 characters long including the extension',
	'nuevo_foto_persona_max_size_ko': 'The file name is too long: it cannot exceed 15 characters including the extension',

	// ============================================================================
	// ENTITY: USER
	// ============================================================================
	// --- Form titles
	'text_contenido_titulo_form_usuario_ADD': 'User ADD Form',
	'text_contenido_titulo_form_usuario_EDIT': 'User EDIT Form',
	'text_contenido_titulo_form_usuario_SEARCH': 'User SEARCH Form',
	'text_contenido_titulo_form_usuario_SHOWCURRENT': 'User Detail',
	'text_contenido_titulo_form_usuario_DELETE': 'User DELETE Form',

	// --- Attributes (table headers)
	'usuario': 'User',
	'contrasena': 'Password',
	'id_rol': 'Role ID',

	// --- Form labels
	'label_usuario': 'User',
	'label_contrasena': 'Password',
	'label_id_rol': 'Role ID',

	// --- Validation errors - User name
	'usuario_min_size_ko': 'The user name is too short. It must have a minimum length of 5 alphabetic characters.',
	'usuario_max_size_ko': 'The user name exceeds the maximum allowed. It cannot exceed 45 characters.',
	'usuario_format_ko': 'The user name must contain only alphabetic characters, without \'ñ\' or accents.',
	'usuario_personalized_ko': 'A user with that user name already exists. Choose another one.',

	// --- Validation errors - Password
	'contrasena_min_size_ko': 'The password is too short. For security reasons, a strict minimum of 8 characters is required.',
	'contrasena_max_size_ko': 'The password exceeds the maximum allowed. It cannot exceed 45 characters.',
	'contrasena_format_ko': 'The password can only contain alphabetic characters, without \'ñ\' or accents.',

	// --- Validation errors - Role (in user)
	'id_rol_min_size_ko': 'The role identifier is required: it must have at least 1 digit',
	'id_rol_max_size_ko': 'The role identifier exceeds the 11 numeric digits allowed',
	'id_rol_format_ko': 'The role identifier can only consist of numeric digits',

	// ============================================================================
	// ENTITY: ROLE
	// ============================================================================
	// --- Form titles
	'text_contenido_titulo_form_rol_ADD': 'Role ADD Form',
	'text_contenido_titulo_form_rol_EDIT': 'Role EDIT Form',
	'text_contenido_titulo_form_rol_SEARCH': 'Role SEARCH Form',
	'text_contenido_titulo_form_rol_SHOWCURRENT': 'Role Detail',
	'text_contenido_titulo_form_rol_DELETE': 'Role DELETE Form',

	// --- Attributes (table headers)
	'rol_name': 'Role name',
	'rol_description': 'Role description',

	// --- Form labels
	'label_rol_name': 'Role name',
	'label_rol_description': 'Role description',

	// --- Validation errors - Role name
	'rol_name_min_size_ko': 'The role name is too short, enter at least 5 characters',
	'rol_name_max_size_ko': 'The role name is too long, enter up to 48 characters',
	'rol_name_format_ko': 'The role name format is incorrect. Only alphabetic characters (including ñ and accents) are allowed, without spaces, numbers or symbols',

	// --- Validation errors - Role description
	'rol_description_min_size_ko': 'The role description is too short, enter at least 5 characters',
	'rol_description_max_size_ko': 'The role description is too long, enter up to 200 characters',
	'rol_description_format_ko': 'The description format is incorrect. Allowed characters are the alphabet (including ñ and accents), spaces and punctuation marks, without numbers',

	// ============================================================================
	// ENTITY: ACTION
	// ============================================================================
	// --- Form titles
	'text_contenido_titulo_form_accion_ADD': 'Action ADD Form',
	'text_contenido_titulo_form_accion_EDIT': 'Action EDIT Form',
	'text_contenido_titulo_form_accion_SEARCH': 'Action SEARCH Form',
	'text_contenido_titulo_form_accion_SHOWCURRENT': 'Action Detail',
	'text_contenido_titulo_form_accion_DELETE': 'Action DELETE Form',

	// --- Attributes (table headers)
	'id_accion': 'Action ID',
	'nombre_accion': 'Action name',
	'descrip_accion': 'Action description',

	// --- Form labels
	'label_id_accion': 'Action ID',
	'label_nombre_accion': 'Action name',
	'label_descrip_accion': 'Action description',

	// --- Validation errors - Action ID
	'id_accion_min_size_ko': 'The action identifier is required: it must have at least 1 digit',
	'id_accion_max_size_ko': 'The action identifier exceeds the 11 numeric digits allowed',
	'id_accion_format_ko': 'The action identifier can only consist of numeric digits',

	// --- Validation errors - Action name
	'nombre_accion_min_size_ko': 'The action name is too short, enter at least 5 characters',
	'nombre_accion_max_size_ko': 'The action name is too long, enter up to 48 characters',
	'nombre_accion_format_ko': 'The action name format is incorrect. Allowed characters are the alphabet (including ñ and accents), without spaces, numbers or symbols',

	// --- Validation errors - Action description
	'descrip_accion_min_size_ko': 'The action description is too short, enter at least 5 characters',
	'descrip_accion_max_size_ko': 'The action description is too long, enter up to 200 characters',
	'descrip_accion_format_ko': 'The description format is incorrect. Allowed characters are the alphabet (including ñ and accents), spaces and punctuation marks, without numbers',

	// ============================================================================
	// ENTITY: FEATURE
	// ============================================================================
	// --- Form titles
	'text_contenido_titulo_form_funcionalidad_ADD': 'Feature ADD Form',
	'text_contenido_titulo_form_funcionalidad_EDIT': 'Feature EDIT Form',
	'text_contenido_titulo_form_funcionalidad_SEARCH': 'Feature SEARCH Form',
	'text_contenido_titulo_form_funcionalidad_SHOWCURRENT': 'Feature Detail',
	'text_contenido_titulo_form_funcionalidad_DELETE': 'Feature DELETE Form',

	// --- Attributes (table headers)
	'id_funcionalidad': 'Feature ID',
	'nombre_funcionalidad': 'Feature name',
	'descrip_funcionalidad': 'Feature description',

	// --- Form labels
	'label_id_funcionalidad': 'Feature ID',
	'label_nombre_funcionalidad': 'Feature name',
	'label_descrip_funcionalidad': 'Feature description',

	// --- Validation errors - Feature ID
	'id_funcionalidad_min_size_ko': 'The feature identifier is required: it must have at least 1 digit',
	'id_funcionalidad_max_size_ko': 'The feature identifier exceeds the 11 numeric digits allowed',
	'id_funcionalidad_format_ko': 'The feature identifier can only consist of numeric digits',

	// --- Validation errors - Feature name
	'nombre_funcionalidad_min_size_ko': 'The feature name is too short, enter at least 5 characters',
	'nombre_funcionalidad_max_size_ko': 'The feature name is too long, enter up to 48 characters',
	'nombre_funcionalidad_format_ko': 'The feature name format is incorrect. Allowed characters are the alphabet (including ñ and accents), without spaces, numbers or symbols',

	// --- Validation errors - Feature description
	'descrip_funcionalidad_min_size_ko': 'The feature description is too short, enter at least 5 characters',
	'descrip_funcionalidad_max_size_ko': 'The feature description is too long, enter up to 200 characters',
	'descrip_funcionalidad_format_ko': 'The description format is incorrect. Allowed characters are the alphabet (including ñ and accents), spaces and punctuation marks, without numbers',

	// ============================================================================
	// ENTITY: FEATURE-ACTION (Relationship)
	// ============================================================================
	// --- Form titles
	'text_contenido_titulo_form_funcionalidad_accion_ADD': 'Feature-Action ADD Form',
	'text_contenido_titulo_form_funcionalidad_accion_EDIT': 'Feature-Action EDIT Form',
	'text_contenido_titulo_form_funcionalidad_accion_SEARCH': 'Feature-Action SEARCH Form',
	'text_contenido_titulo_form_funcionalidad_accion_SHOWCURRENT': 'Feature-Action Detail',
	'text_contenido_titulo_form_funcionalidad_accion_DELETE': 'Feature-Action DELETE Form',
	// the rolaccionfuncionalidad matrix only has the SEARCH form
	'text_contenido_titulo_form_rolaccionfuncionalidad_SEARCH': 'Role-Action-Feature SEARCH Form',

	// ============================================================================
	// TABLE ACTION COLUMN HEADERS
	// (the key is the column name: dom_table sets it as the th class and setLang() translates it)
	// ============================================================================
	'EDIT': 'Edit',
	'DELETE': 'Delete',
	'SHOWCURRENT': 'Details',

	// ============================================================================
	// GENERAL ERROR MESSAGES
	// ============================================================================
	'RECORDSET_VACIO': 'There are not results for your search',
	// Text shown before the code when the back returns an error code that has no translation (see abrirModalError)
	'text_error_back_generico': 'An error occurred while performing the operation',

	// ============================================================================
	// TEST RESULTS WINDOW
	// ============================================================================
	'text_test_titulo': 'Test results for',
	'text_test_total': 'Tests',
	'text_test_correctas': 'Passed',
	'text_test_incorrectas': 'Failed',
	'text_test_col_entidad': 'Entity',
	'text_test_col_campo': 'Field',
	'text_test_col_NumDef': 'Test no.',
	'text_test_col_NumPrueba': 'Trial no.',
	'text_test_col_descripcion': 'Description',
	'text_test_col_accion': 'Action',
	'text_test_col_valorprueba': 'Test value',
	'text_test_col_respuestaesperada': 'Expected result',
	'text_test_col_resultadoprueba': 'Actual result',
	'text_test_col_pruebastatus': 'Status',
	'text_test_col_traduccionError': 'Response message',
	// Data_Test busca la traduccion con window.traduccion[resultadoprueba]; cuando la validacion devuelve true la clave es 'true'.
	// Sin esta clave la columna del mensaje mostraba 'sintraduccion' en todas las pruebas de exito.
	'true': 'Valid value: it passes all the checks',
	// headers of the funcionalidad_accion matrix: fixed text before "id - name" (e.g. "Feature 3 - Roles management")
	'text_matriz_funcionalidad': 'Feature',
	'text_matriz_accion': 'Action',
	// headers of the rolaccionfuncionalidad matrix: rows are features (text_matriz_funcionalidad) and columns roles
	'text_matriz_rol': 'Role',
	'test_ventana_bloqueada_ko': 'The browser has blocked the test results window. Allow pop-ups for this page.',

}