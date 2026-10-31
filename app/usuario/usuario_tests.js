/*
----------------------------------------------
PARA LA ENTIDAD USUARIO:
 - dni
 - usuario
 - contrasena
 - id_rol
 ----------------------------------------------

DECISIONES DE DISEÑO PARA LA ENTIDAD USUARIO: Se han definido, para cada atributo y acción, solo los tests atómicos que tienen sentido según su formato. 
 --------------
 DNI: ADD y SEARCH. Es clave primaria (y FK de persona). En EDIT el campo va en solo lectura porque identifica la tupla en el back y no se puede modificar, por lo que no se valida ni tiene tests en EDIT.
      En ADD se incluyen min_size, max_size, format (8 dígitos + letra mayúscula), personalized y valid. personalized comprende la letra de control (algoritmo módulo 23) y que no exista ya
      un usuario con ese DNI (el back permite DNI repetidos, por lo que lo comprueba el front con la lista de usuarios del back; sin ella, como en estas pruebas, no hay repetidos). Los dos casos comparten el código
      dni_personalized_ko y las pruebas de este test se centran en la letra de control.
      En SEARCH se omiten min_size y personalized: el filtro es opcional (vacío = sin filtro) y puede ser parcial (hasta 8 dígitos y una letra mayúscula al final), por lo que max_size limita a 9 caracteres y format
      comprueba ese patrón: dos letras, o una letra entre números, dan error. Una letra seguida de números (Z1234) se corrige en el campo a números y letra (1234Z) antes de validar, y la prueba es válida.
      No se recalcula la letra porque el objetivo es localizar un registro, no darlo de alta ni modificarlo.
      Se considera DNI estándar válido el formado por 8 dígitos y una letra mayúscula de control; las letras minúsculas se rechazan en el test de formato (el formulario pasa la letra a mayúscula antes de validar,
      pero la validación en sí no la modifica). Adicionalmente, se rechaza el NIE al ser de 7 dígitos y 2 letras.
      Los mensajes de dni_format_ko y dni_personalized_ko los comparte la entidad persona (donde dni es clave foránea): el texto es el mismo en los tests de las dos entidades.
 --------------
 - USUARIO: se validan ADD, EDIT y SEARCH con min_size (5), max_size (45) y format (alfabético sin ñ ni acentos); en SEARCH se omite min_size porque el filtro puede
            ser parcial u omitirse. En ADD y EDIT hay además una validación personalized (usuario_personalized_ko): el usuario es UNIQUE y el back no lo impide, por lo que el front comprueba que
            no lo tenga ya otra tupla con la lista de usuarios del back (en EDIT no cuenta la propia tupla). Al depender del back, no se puede probar en estas pruebas y no tiene test.
 --------------
 - CONTRASENA: solo ADD y EDIT con min_size (8), max_size (45) y format alfabético sin ñ ni acentos; no se define SEARCH porque la contraseña es
               un dato sensible que nunca se utiliza como criterio de búsqueda. 
 --------------
 - ID_ROL: es un select y clave foránea (se muestra como "id_rol - rol_name", pero se valida y se envía el id_rol); se interpreta "numérico min 1 max 11" como número de dígitos (int(11)). En ADD y EDIT min_size equivale a seleccionar un rol obligatoriamente, y max_size y 
         format protegen frente a valores manipulados; en SEARCH se omite min_size porque el filtro es opcional. En todos los casos hay un test "valid" que confirma el caso correcto y su mensaje.

 ----------------------------------------------
*/
 
// [entidad, campo, elemento, num_def, descripcion, validacion_atomica, accion, resultado_esperado, mensaje]
var usuario_def_tests = [
    // 1.1. ATRIBUTO: "dni" con acción: "ADD"
    [ 
        "usuario", "dni", "input", 1, "Validar longitud mínima de los caracteres del dni en ADD", "min_size", "ADD", "dni_min_size_ko", 
        "El DNI es demasiado corto: debe tener 9 caracteres"
    ],
    [ 
        "usuario", "dni", "input", 2, "Validar longitud máxima de los caracteres del dni en ADD", "max_size", "ADD", "dni_max_size_ko", 
        "El DNI es demasiado largo: debe tener 9 caracteres"
    ],
    [ 
        "usuario", "dni", "input", 3, "Validar formato estandar de DNI (8 digitos y 1 letra) en ADD", "format", "ADD", "dni_format_ko", 
        "El formato del DNI no es válido: deben ser 8 dígitos y una letra mayúscula (en la búsqueda: solo dígitos y como mucho una letra, al final)"
    ],
    [ 
        "usuario", "dni", "input", 4, "Validar calculo de la letra del DNI en ADD", "personalized", "ADD", "dni_personalized_ko", 
        "El DNI no es válido: la letra de control no es correcta o el DNI ya está en uso"
    ],
    [ 
        "usuario", "dni", "input", 5, "Validar DNI correcto y verificado en ADD", "valid", "ADD", true,
        "El DNI proporcionado es válido y cumple con todas las reglas de estructura y control."
  
    ],
    // 1.2. ATRIBUTO: "dni" con acción: "SEARCH"
    [ 
        "usuario", "dni", "input", 6, "Validar longitud maxima en la busqueda de DNI en SEARCH", "max_size", "SEARCH", "dni_max_size_ko", 
        "El DNI es demasiado largo: debe tener 9 caracteres"
    ],
    [ 
        "usuario", "dni", "input", 7, "Validar formato del DNI en SEARCH (solo dígitos y como mucho una letra, al final)", "format", "SEARCH", "dni_format_ko", 
        "El formato del DNI no es válido: deben ser 8 dígitos y una letra mayúscula (en la búsqueda: solo dígitos y como mucho una letra, al final)"
    ],
    [ 
        "usuario", "dni", "input", 8, "Validar busqueda de DNI correcta en SEARCH (parcial, o con la letra antes de los números, que se corrige)", "valid", "SEARCH", true, 
        "Criterio de búsqueda por DNI aceptado correctamente."
    ],
    // 2.1. ATRIBUTO: "usuario" con acción: "ADD"
    [
        "usuario", "usuario", "input", 9, "Validar longitud minima de nombre de usuario en ADD", "min_size", "ADD", "usuario_min_size_ko",
        "El nombre de usuario es demasiado corto. Debe tener una longitud mínima de 5 caracteres alfabéticos."
    ],
    [
        "usuario", "usuario", "input", 10, "Validar longitud maxima de nombre de usuario en ADD", "max_size", "ADD", "usuario_max_size_ko",
        "El nombre de usuario supera el límite máximo permitido. No puede exceder de 45 caracteres."
    ],
    [
        "usuario", "usuario", "input", 11, "Validar formato alfabetico sin ñ ni acentos en ADD", "format", "ADD", "usuario_format_ko",
        "El nombre de usuario debe contener únicamente caracteres alfabéticos, sin 'ñ' ni acentos."
    ],
    [
        "usuario", "usuario", "input", 12, "Validar nombre de usuario valido en ADD", "valid", "ADD", true,
        "El nombre de usuario cumple con todas las restricciones de longitud y formato."
    ],
    // 2.2. ATRIBUTO: "usuario" con acción: "EDIT"
    [
        "usuario", "usuario", "input", 13, "Validar longitud minima de nombre de usuario en EDIT", "min_size", "EDIT", "usuario_min_size_ko",
        "El nombre de usuario es demasiado corto. Debe tener una longitud mínima de 5 caracteres alfabéticos."
    ],
    [
        "usuario", "usuario", "input", 14, "Validar longitud maxima de nombre de usuario en EDIT", "max_size", "EDIT", "usuario_max_size_ko",
        "El nombre de usuario supera el límite máximo permitido. No puede exceder de 45 caracteres."
    ],
    [
        "usuario", "usuario", "input", 15, "Validar formato alfabetico estricto en EDIT", "format", "EDIT", "usuario_format_ko",
        "El nombre de usuario debe contener únicamente caracteres alfabéticos, sin 'ñ' ni acentos."
    ],
    [
        "usuario", "usuario", "input", 16, "Validar nombre de usuario valido en EDIT", "valid", "EDIT", true,
        "La modificación del nombre de usuario se ha validado satisfactoriamente."
    ],
    // 2.3. ATRIBUTO: "usuario" con acción: "SEARCH"
    [
        "usuario", "usuario", "input", 17, "Validar longitud maxima de busqueda por usuario en SEARCH", "max_size", "SEARCH", "usuario_max_size_ko",
        "El nombre de usuario supera el límite máximo permitido. No puede exceder de 45 caracteres."
    ],
    [
        "usuario", "usuario", "input", 18, "Validar formato permitido en busqueda de usuario en SEARCH", "format", "SEARCH", "usuario_format_ko",
        "El nombre de usuario debe contener únicamente caracteres alfabéticos, sin 'ñ' ni acentos."
    ],
    [
        "usuario", "usuario", "input", 19, "Validar busqueda de usuario correcta en SEARCH", "valid", "SEARCH", true,
        "Criterio de búsqueda para el usuario validado correctamente."
    ],
    // 3.1. ATRIBUTO: "contrasena" con acción: "ADD"
    [
        "usuario", "contrasena", "input", 20, "Validar longitud minima de contrasena en ADD", "min_size", "ADD", "contrasena_min_size_ko",
        "La contraseña es demasiado corta. Por seguridad, se exige un mínimo estricto de 8 caracteres."
    ],
    [
        "usuario", "contrasena", "input", 21, "Validar longitud maxima de contrasena en ADD", "max_size", "ADD", "contrasena_max_size_ko",
        "La contraseña sobrepasa el límite de capacidad permitido. No puede superar los 45 caracteres."
    ],
    [
        "usuario", "contrasena", "input", 22, "Validar formato alfabetico estricto sin números ni ñ ni acentos en ADD", "format", "ADD", "contrasena_format_ko",
        "La contraseña solo puede contener caracteres alfabéticos, sin 'ñ' ni acentos."
    ],
    [
        "usuario", "contrasena", "input", 23, "Validar contrasena valida en ADD", "valid", "ADD", true,
        "La contraseña introducida satisface plenamente todas las políticas de formato y longitud."
    ],
    // 3.2. ATRIBUTO: "contrasena" con acción: "EDIT"
    [
        "usuario", "contrasena", "input", 24, "Validar longitud minima de contrasena en EDIT", "min_size", "EDIT", "contrasena_min_size_ko",
        "La contraseña es demasiado corta. Por seguridad, se exige un mínimo estricto de 8 caracteres."
    ],
    [
        "usuario", "contrasena", "input", 25, "Validar longitud maxima de contrasena en EDIT", "max_size", "EDIT", "contrasena_max_size_ko",
        "La contraseña sobrepasa el límite de capacidad permitido. No puede superar los 45 caracteres."
    ],
    [
        "usuario", "contrasena", "input", 26, "Validar formato alfabetico de contrasena en EDIT", "format", "EDIT", "contrasena_format_ko",
        "La contraseña solo puede contener caracteres alfabéticos, sin 'ñ' ni acentos."
    ],
    [
        "usuario", "contrasena", "input", 27, "Validar contrasena correcta en EDIT", "valid", "EDIT", true,
        "La nueva contraseña ha sido validada y aceptada con éxito."
    ],
    // 4.1. ATRIBUTO: "id_rol" con acción: "ADD"
    [
        "usuario", "id_rol", "select", 28, "Validar longitud minima de id_rol en ADD", "min_size", "ADD", "id_rol_min_size_ko",
        "El identificador del rol es obligatorio: debe tener al menos 1 dígito"
    ],
    [
        "usuario", "id_rol", "select", 29, "Validar longitud maxima de digitos para id_rol en ADD", "max_size", "ADD", "id_rol_max_size_ko",
        "El identificador del rol supera los 11 dígitos numéricos permitidos"
    ],
    [
        "usuario", "id_rol", "select", 30, "Validar formato numerico exclusivo para id_rol en ADD", "format", "ADD", "id_rol_format_ko",
        "El identificador del rol solo puede estar formado por dígitos numéricos"
    ],
    [
        "usuario", "id_rol", "select", 31, "Validar rol seleccionado correcto en ADD", "valid", "ADD", true,
        "El rol seleccionado para el usuario ha sido validado correctamente."
    ],
    // 4.2. ATRIBUTO: "id_rol" con acción: "EDIT"
    [
        "usuario", "id_rol", "select", 32, "Validar longitud mínima de id_rol en EDIT", "min_size", "EDIT", "id_rol_min_size_ko",
        "El identificador del rol es obligatorio: debe tener al menos 1 dígito"
    ],
    [
        "usuario", "id_rol", "select", 33, "Validar longitud máxima de dígitos para id_rol en EDIT", "max_size", "EDIT", "id_rol_max_size_ko",
        "El identificador del rol supera los 11 dígitos numéricos permitidos"
    ],
    [
        "usuario", "id_rol", "select", 34, "Validar formato numerico para id_rol en EDIT", "format", "EDIT", "id_rol_format_ko",
        "El identificador del rol solo puede estar formado por dígitos numéricos"
    ],
    [
        "usuario", "id_rol", "select", 35, "Validar rol correcto en EDIT", "valid", "EDIT", true,
        "El nuevo rol asignado al usuario es válido."
    ],
 
    // 4.3. ATRIBUTO: "id_rol" con acción: "SEARCH"
     [
        "usuario", "id_rol", "select", 36, "Validar longitud máxima del filtro por id_rol en SEARCH", "max_size", "SEARCH", "id_rol_max_size_ko",
        "El identificador del rol supera los 11 dígitos numéricos permitidos"
    ],
    [
        "usuario", "id_rol", "select", 37, "Validar formato de filtro por id_rol en SEARCH", "format", "SEARCH", "id_rol_format_ko",
        "El identificador del rol solo puede estar formado por dígitos numéricos"
    ],
    [
        "usuario", "id_rol", "select", 38, "Validar busqueda por id_rol correcta en SEARCH", "valid", "SEARCH", true,
        "Filtro de búsqueda por rol aplicado con éxito."
    ]
];
 
// [entidad, campo, num_def_test, num_prueba, accion, objeto_valores, resultado_esperado]
var usuario_pruebas = [
    // 1.1. ATRIBUTO: "dni" con acción: "ADD"
    ["usuario", "dni", 1, 1, "ADD", { "dni": "1234567" }, "dni_min_size_ko"],
    ["usuario", "dni", 2, 2, "ADD", { "dni": "1234567890" }, "dni_max_size_ko"],
    ["usuario", "dni", 3, 3, "ADD", { "dni": "12345678-" }, "dni_format_ko"],
    ["usuario", "dni", 3, 4, "ADD", { "dni": "ABCDEFGHJ" }, "dni_format_ko"],
    ["usuario", "dni", 3, 5, "ADD", { "dni": "12345678z" }, "dni_format_ko"],
    ["usuario", "dni", 3, 6, "ADD", { "dni": "1234567AZ" }, "dni_format_ko"],
    ["usuario", "dni", 4, 7, "ADD", { "dni": "53618492Z" }, "dni_personalized_ko"],
    ["usuario", "dni", 4, 8, "ADD", { "dni": "12345678A" }, "dni_personalized_ko"],
    ["usuario", "dni", 5, 9, "ADD", { "dni": "53618492H" }, true],

    // 1.2. ATRIBUTO: "dni" con acción: "SEARCH"
    ["usuario", "dni", 6, 10, "SEARCH", { "dni": "1234567890" }, "dni_max_size_ko"],
    ["usuario", "dni", 7, 11, "SEARCH", { "dni": "53618492%" }, "dni_format_ko"],
    ["usuario", "dni", 7, 12, "SEARCH", { "dni": "AB" }, "dni_format_ko"],
    ["usuario", "dni", 7, 13, "SEARCH", { "dni": "5361A492" }, "dni_format_ko"],
    ["usuario", "dni", 7, 14, "SEARCH", { "dni": "Z1234Z" }, "dni_format_ko"],
    ["usuario", "dni", 8, 15, "SEARCH", { "dni": "53618492H" }, true],
    ["usuario", "dni", 8, 16, "SEARCH", { "dni": "5361" }, true],
    ["usuario", "dni", 8, 17, "SEARCH", { "dni": "H" }, true],
    ["usuario", "dni", 8, 18, "SEARCH", { "dni": "Z1234" }, true],

    // 2.1. ATRIBUTO: "usuario" con acción: "ADD"
    ["usuario", "usuario", 9, 19, "ADD", { "usuario": "user" }, "usuario_min_size_ko"],
    ["usuario", "usuario", 10, 20, "ADD", { "usuario": "a".repeat(46) }, "usuario_max_size_ko"],
    ["usuario", "usuario", 11, 21, "ADD", { "usuario": "usüario" }, "usuario_format_ko"],
    ["usuario", "usuario", 11, 22, "ADD", { "usuario": "usuario123" }, "usuario_format_ko"],
    ["usuario", "usuario", 11, 23, "ADD", { "usuario": "pepe_admin" }, "usuario_format_ko"],
    ["usuario", "usuario", 12, 24, "ADD", { "usuario": "gestorPrincipal" }, true],

    // 2.2. ATRIBUTO: "usuario" con acción: "EDIT"
    ["usuario", "usuario", 13, 25, "EDIT", { "usuario": "adm" }, "usuario_min_size_ko"],
    ["usuario", "usuario", 14, 26, "EDIT", { "usuario": "a".repeat(46) }, "usuario_max_size_ko"],
    ["usuario", "usuario", 15, 27, "EDIT", { "usuario": "adminÑ" }, "usuario_format_ko"],
    ["usuario", "usuario", 16, 28, "EDIT", { "usuario": "operadorTurno" }, true],

    // 2.3. ATRIBUTO: "usuario" con acción: "SEARCH"
    ["usuario", "usuario", 17, 29, "SEARCH", { "usuario": "a".repeat(46) }, "usuario_max_size_ko"],
    ["usuario", "usuario", 18, 30, "SEARCH", { "usuario": "admin$" }, "usuario_format_ko"],
    ["usuario", "usuario", 18, 31, "SEARCH", { "usuario": "admin123" }, "usuario_format_ko"],
    ["usuario", "usuario", 19, 32, "SEARCH", { "usuario": "admin" }, true],

    // 3.1. ATRIBUTO: "contrasena" con acción: "ADD"
    ["usuario", "contrasena", 20, 33, "ADD", { "contrasena": "abcdefg" }, "contrasena_min_size_ko"],
    ["usuario", "contrasena", 21, 34, "ADD", { "contrasena": "a".repeat(46) }, "contrasena_max_size_ko"],
    ["usuario", "contrasena", 22, 35, "ADD", { "contrasena": "claveSegura123" }, "contrasena_format_ko"],
    ["usuario", "contrasena", 22, 36, "ADD", { "contrasena": "contraseñaValida" }, "contrasena_format_ko"],
    ["usuario", "contrasena", 23, 37, "ADD", { "contrasena": "superPasswordSegura" }, true],

    // 3.2. ATRIBUTO: "contrasena" con acción: "EDIT"
    ["usuario", "contrasena", 24, 38, "EDIT", { "contrasena": "corta" }, "contrasena_min_size_ko"],
    ["usuario", "contrasena", 25, 39, "EDIT", { "contrasena": "a".repeat(46) }, "contrasena_max_size_ko"],
    ["usuario", "contrasena", 26, 40, "EDIT", { "contrasena": "clave_con_guion" }, "contrasena_format_ko"],
    ["usuario", "contrasena", 27, 41, "EDIT", { "contrasena": "claveModificadaCorrecta" }, true],

    // 4.1. ATRIBUTO: "id_rol" con acción: "ADD"
    ["usuario", "id_rol", 28, 42, "ADD", { "id_rol": "" }, "id_rol_min_size_ko"],
    ["usuario", "id_rol", 29, 43, "ADD", { "id_rol": "123456789012" }, "id_rol_max_size_ko"],
    ["usuario", "id_rol", 30, 44, "ADD", { "id_rol": "rol_uno" }, "id_rol_format_ko"],
    ["usuario", "id_rol", 31, 45, "ADD", { "id_rol": "1" }, true],

    // 4.2. ATRIBUTO: "id_rol" con acción: "EDIT"
    ["usuario", "id_rol", 32, 46, "EDIT", { "id_rol": "" }, "id_rol_min_size_ko"],
    ["usuario", "id_rol", 33, 47, "EDIT", { "id_rol": "123456789012" }, "id_rol_max_size_ko"],
    ["usuario", "id_rol", 34, 48, "EDIT", { "id_rol": "abc" }, "id_rol_format_ko"],
    ["usuario", "id_rol", 35, 49, "EDIT", { "id_rol": "2" }, true],

    // 4.3. ATRIBUTO: "id_rol" con acción: "SEARCH"
    ["usuario", "id_rol", 36, 50, "SEARCH", { "id_rol": "123456789012" }, "id_rol_max_size_ko"],
    ["usuario", "id_rol", 37, 51, "SEARCH", { "id_rol": "1a" }, "id_rol_format_ko"],
    ["usuario", "id_rol", 37, 52, "SEARCH", { "id_rol": "rol" }, "id_rol_format_ko"],
    ["usuario", "id_rol", 38, 53, "SEARCH", { "id_rol": "1" }, true]
];