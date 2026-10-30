/* //-----------------//-----------------//-----------------//-----------------//
    ESTRUCTURA:

    ["entidad", "clase", "tipo", "nº test", "descripción_Test", "metodo", "acción",  
        "Resultado Esperado", "mensaje" ]

*/ //-----------------//-----------------//-----------------//-----------------//

/*
    ACLARACIONES (entidad funcionalidad):
    1. id_funcionalidad es autoincremental: no se pide en ADD ni se edita en EDIT. Sus tests y pruebas de ADD se mantienen (los exige la entrega),
       pero no hay tests ni pruebas de EDIT para id_funcionalidad. En SEARCH si es criterio de busqueda y tiene sus tests.
    2. El mensaje de cada test de error es el texto que la aplicacion muestra para su codigo de error (Textos_ES.js).
*/

var funcionalidad_def_tests = [
    
    //Acción: ADD

    //-----------------//-----------------/id_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "id_funcionalidad", "input", 1, "Comprobar el tamaño mínimo", "min_size",
        "ADD", "id_funcionalidad_min_size_ko",
        "El identificador de la funcionalidad es obligatorio: debe tener al menos 1 dígito"],

    ["funcionalidad", "id_funcionalidad", "input", 2, "Comprobar el tamaño máximo", "max_size",
        "ADD", "id_funcionalidad_max_size_ko",
        "El identificador de la funcionalidad supera los 11 dígitos numéricos permitidos"],
    
    ["funcionalidad", "id_funcionalidad", "input", 3, "Comprobar si cumple el formato", "format",
        "ADD", "id_funcionalidad_format_ko",
        "El identificador de la funcionalidad solo puede estar formado por dígitos numéricos"],
    
    ["funcionalidad", "id_funcionalidad", "input", 4, "Estado de éxito", "valid",
        "ADD", true, "Caso de Éxito"],
    
    //-----------------//-----------------/nombre_funcionalidad/-----------------//-----------------//
    ["funcionalidad", "nombre_funcionalidad", "input", 5, "Comprobar el tamaño mínimo", "min_size",
        "ADD", "nombre_funcionalidad_min_size_ko",
        "El nombre de la funcionalidad es corto, introduzca por lo menos 5 caracteres"],

    ["funcionalidad", "nombre_funcionalidad", "input", 6, "Comprobar el tamaño máximo", "max_size",
        "ADD", "nombre_funcionalidad_max_size_ko", 
        "El nombre de la funcionalidad es demasiado largo, introduzca hasta 48 caracteres"],

    ["funcionalidad", "nombre_funcionalidad", "input", 7, "Comprobar si cumple el formato", "format",
        "ADD", "nombre_funcionalidad_format_ko", 
        "El formato del nombre de la funcionalidad es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos"],
    
    ["funcionalidad", "nombre_funcionalidad", "input", 8, "Estado de éxito", "valid",
        "ADD", true, "Caso de Éxito"],
    
    //-----------------//-----------------/descrip_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "descrip_funcionalidad", "textarea", 9, "Comprobar el tamaño mínimo", "min_size",
        "ADD", "descrip_funcionalidad_min_size_ko",
        "La descripción de la funcionalidad es corta, introduzca por lo menos 5 caracteres"],

    ["funcionalidad", "descrip_funcionalidad", "textarea", 10, "Comprobar el tamaño máximo", "max_size",
        "ADD", "descrip_funcionalidad_max_size_ko", 
        "La descripción de la funcionalidad es demasiado larga, introduzca hasta 200 caracteres"],

    ["funcionalidad", "descrip_funcionalidad", "textarea", 11, "Comprobar si cumple el formato", "format",
        "ADD", "descrip_funcionalidad_format_ko", 
        "El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números"],
    
    ["funcionalidad", "descrip_funcionalidad", "textarea", 12, "Estado de éxito", "valid",
        "ADD", true, "Caso de Éxito"],

    //Acción: EDIT

    //-----------------//-----------------/id_funcionalidad/-----------------//-----------------//

    //-----------------//-----------------/nombre_funcionalidad/-----------------//-----------------//
    
    ["funcionalidad", "nombre_funcionalidad", "input", 13, "Comprobar el tamaño mínimo", "min_size",
        "EDIT", "nombre_funcionalidad_min_size_ko",
        "El nombre de la funcionalidad es corto, introduzca por lo menos 5 caracteres"],

    ["funcionalidad", "nombre_funcionalidad", "input", 14, "Comprobar el tamaño máximo", "max_size",
        "EDIT", "nombre_funcionalidad_max_size_ko", 
        "El nombre de la funcionalidad es demasiado largo, introduzca hasta 48 caracteres"],

    ["funcionalidad", "nombre_funcionalidad", "input", 15, "Comprobar si cumple el formato", "format",
        "EDIT", "nombre_funcionalidad_format_ko", 
        "El formato del nombre de la funcionalidad es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos"],
    
    ["funcionalidad", "nombre_funcionalidad", "input", 16, "Estado de éxito", "valid",
        "EDIT", true, "Caso de Éxito"],
    
    //-----------------//-----------------/descrip_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "descrip_funcionalidad", "textarea", 17, "Comprobar el tamaño mínimo", "min_size",
        "EDIT", "descrip_funcionalidad_min_size_ko",
        "La descripción de la funcionalidad es corta, introduzca por lo menos 5 caracteres"],

    ["funcionalidad", "descrip_funcionalidad", "textarea", 18, "Comprobar el tamaño máximo", "max_size",
        "EDIT", "descrip_funcionalidad_max_size_ko", 
        "La descripción de la funcionalidad es demasiado larga, introduzca hasta 200 caracteres"],

    ["funcionalidad", "descrip_funcionalidad", "textarea", 19, "Comprobar si cumple el formato", "format",
        "EDIT", "descrip_funcionalidad_format_ko", 
        "El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números"],
    
    ["funcionalidad", "descrip_funcionalidad", "textarea", 20, "Estado de éxito", "valid",
        "EDIT", true, "Caso de Éxito"],

    //Acción: SEARCH

    //-----------------//-----------------/id_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "id_funcionalidad", "input", 21, "Comprobar el tamaño máximo", "max_size",
        "SEARCH", "id_funcionalidad_max_size_ko",
        "El identificador de la funcionalidad supera los 11 dígitos numéricos permitidos"],
    
    ["funcionalidad", "id_funcionalidad", "input", 22, "Comprobar si cumple el formato", "format",
        "SEARCH", "id_funcionalidad_format_ko",
        "El identificador de la funcionalidad solo puede estar formado por dígitos numéricos"],
    
    ["funcionalidad", "id_funcionalidad", "input", 23, "Estado de éxito", "valid",
        "SEARCH", true, "Caso de Éxito"],

    //-----------------//-----------------/nombre_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "nombre_funcionalidad", "input", 24, "Comprobar el tamaño máximo", "max_size",
        "SEARCH", "nombre_funcionalidad_max_size_ko", 
        "El nombre de la funcionalidad es demasiado largo, introduzca hasta 48 caracteres"],

    ["funcionalidad", "nombre_funcionalidad", "input", 25, "Comprobar si cumple el formato", "format",
        "SEARCH", "nombre_funcionalidad_format_ko", 
        "El formato del nombre de la funcionalidad es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos"],
    
    ["funcionalidad", "nombre_funcionalidad", "input", 26, "Estado de éxito", "valid",
        "SEARCH", true, "Caso de Éxito"],

    //-----------------//-----------------/descrip_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "descrip_funcionalidad", "textarea", 27, "Comprobar el tamaño máximo", "max_size",
        "SEARCH", "descrip_funcionalidad_max_size_ko", 
        "La descripción de la funcionalidad es demasiado larga, introduzca hasta 200 caracteres"],

    ["funcionalidad", "descrip_funcionalidad", "textarea", 28, "Comprobar si cumple el formato", "format",
        "SEARCH", "descrip_funcionalidad_format_ko", 
        "El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números"],
    
    ["funcionalidad", "descrip_funcionalidad", "textarea", 29, "Estado de éxito", "valid",
        "SEARCH", true, "Caso de Éxito"]
];

/* //-----------------//-----------------//-----------------//-----------------//
   ESTRUCTURA:
 
   ["entidad", "clase", "nº test", "nº prueba", "acción", {"atributo": "valor"},
        "Resultado Esperado"]

*/ //-----------------//-----------------//-----------------//-----------------//

var funcionalidad_pruebas = [
    //Acción: ADD

    //-----------------//-----------------/id_funcionalidad/-----------------//-----------------//
    
    ["funcionalidad", "id_funcionalidad", 1, 1, "ADD", {"id_funcionalidad" : ""},
        "id_funcionalidad_min_size_ko"],

    ["funcionalidad", "id_funcionalidad", 2, 2, "ADD", {"id_funcionalidad" : "111111111111"},
        "id_funcionalidad_max_size_ko"],

    ["funcionalidad", "id_funcionalidad", 3, 3, "ADD", {"id_funcionalidad" : "id"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 3, 4, "ADD", {"id_funcionalidad" : "1.5"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 3, 5, "ADD", {"id_funcionalidad" : "-83"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 3, 6, "ADD", {"id_funcionalidad" : "46*"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 3, 7, "ADD", {"id_funcionalidad" : "uno"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 4, 8, "ADD", {"id_funcionalidad" : "1234"},
        true],

    //-----------------//-----------------/nombre_funcionalidad/-----------------//-----------------//  
    
    ["funcionalidad", "nombre_funcionalidad", 5, 9, "ADD", {"nombre_funcionalidad" : "fun"},
        "nombre_funcionalidad_min_size_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 6, 10, "ADD", {"nombre_funcionalidad" : "a".repeat(49)},
        "nombre_funcionalidad_max_size_ko"],

    ["funcionalidad", "nombre_funcionalidad", 7, 11, "ADD", {"nombre_funcionalidad" : "function1"},
        "nombre_funcionalidad_format_ko"],

    ["funcionalidad", "nombre_funcionalidad", 7, 12, "ADD", {"nombre_funcionalidad" : "function*"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 7, 13, "ADD", {"nombre_funcionalidad" : "function_"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 7, 14, "ADD", {"nombre_funcionalidad" : "function name"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 8, 15, "ADD", {"nombre_funcionalidad" : "function"},
        true],

    //-----------------//-----------------/descrip_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "descrip_funcionalidad", 9, 16, "ADD", {"descrip_funcionalidad": "cut"},
        "descrip_funcionalidad_min_size_ko"],

    ["funcionalidad", "descrip_funcionalidad", 10, 17, "ADD", {"descrip_funcionalidad": "a".repeat(201)},
        "descrip_funcionalidad_max_size_ko"],

    ["funcionalidad", "descrip_funcionalidad", 11, 18, "ADD", {"descrip_funcionalidad": "descripcion*"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 11, 19, "ADD", {"descrip_funcionalidad": "decripcion_"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 11, 20, "ADD", {"descrip_funcionalidad": "descripcion&"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 12, 21, "ADD", {"descrip_funcionalidad": "descripcion"},
        true],

    //Acción: EDIT

    //-----------------//-----------------/id_funcionalidad/-----------------//-----------------//
    
    //-----------------//-----------------/nombre_funcionalidad/-----------------//-----------------//  
    
    ["funcionalidad", "nombre_funcionalidad", 13, 22, "EDIT", {"nombre_funcionalidad" : "fun"},
        "nombre_funcionalidad_min_size_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 14, 23, "EDIT", {"nombre_funcionalidad" : "a".repeat(49)},
        "nombre_funcionalidad_max_size_ko"],

    ["funcionalidad", "nombre_funcionalidad", 15, 24, "EDIT", {"nombre_funcionalidad" : "function1"},
        "nombre_funcionalidad_format_ko"],

    ["funcionalidad", "nombre_funcionalidad", 15, 25, "EDIT", {"nombre_funcionalidad" : "function*"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 15, 26, "EDIT", {"nombre_funcionalidad" : "function_"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 15, 27, "EDIT", {"nombre_funcionalidad" : "function name"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 16, 28, "EDIT", {"nombre_funcionalidad" : "function"},
        true],

    //-----------------//-----------------/descrip_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "descrip_funcionalidad", 17, 29, "EDIT", {"descrip_funcionalidad": "cut"},
        "descrip_funcionalidad_min_size_ko"],

    ["funcionalidad", "descrip_funcionalidad", 18, 30, "EDIT", {"descrip_funcionalidad": "a".repeat(201)},
        "descrip_funcionalidad_max_size_ko"],

    ["funcionalidad", "descrip_funcionalidad", 19, 31, "EDIT", {"descrip_funcionalidad": "descripcion*"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 19, 32, "EDIT", {"descrip_funcionalidad": "decripcion_"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 19, 33, "EDIT", {"descrip_funcionalidad": "descripcion&"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 20, 34, "EDIT", {"descrip_funcionalidad": "descripcion"},
        true],

    //Acción: SEARCH

    //-----------------//-----------------/id_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "id_funcionalidad", 21, 35, "SEARCH", {"id_funcionalidad" : "111111111111"},
        "id_funcionalidad_max_size_ko"],

    ["funcionalidad", "id_funcionalidad", 22, 36, "SEARCH", {"id_funcionalidad" : "id"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 22, 37, "SEARCH", {"id_funcionalidad" : "1.5"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 22, 38, "SEARCH", {"id_funcionalidad" : "-83"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 22, 39, "SEARCH", {"id_funcionalidad" : "46*"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 22, 40, "SEARCH", {"id_funcionalidad" : "uno"},
        "id_funcionalidad_format_ko"],

    ["funcionalidad", "id_funcionalidad", 23, 41, "SEARCH", {"id_funcionalidad" : "1234"},
        true],

    //-----------------//-----------------/nombre_funcionalidad/-----------------//-----------------//  
    
    ["funcionalidad", "nombre_funcionalidad", 24, 42, "SEARCH", {"nombre_funcionalidad" : "a".repeat(49)},
        "nombre_funcionalidad_max_size_ko"],

    ["funcionalidad", "nombre_funcionalidad", 25, 43, "SEARCH", {"nombre_funcionalidad" : "function1"},
        "nombre_funcionalidad_format_ko"],

    ["funcionalidad", "nombre_funcionalidad", 25, 44, "SEARCH", {"nombre_funcionalidad" : "function*"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 25, 45, "SEARCH", {"nombre_funcionalidad" : "function_"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 25, 46, "SEARCH", {"nombre_funcionalidad" : "function name"},
        "nombre_funcionalidad_format_ko"],
    
    ["funcionalidad", "nombre_funcionalidad", 26, 47, "SEARCH", {"nombre_funcionalidad" : "function"},
        true],

    //-----------------//-----------------/descrip_funcionalidad/-----------------//-----------------//

    ["funcionalidad", "descrip_funcionalidad", 27, 48, "SEARCH", {"descrip_funcionalidad": "a".repeat(201)},
        "descrip_funcionalidad_max_size_ko"],

    ["funcionalidad", "descrip_funcionalidad", 28, 49, "SEARCH", {"descrip_funcionalidad": "descripcion*"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 28, 50, "SEARCH", {"descrip_funcionalidad": "decripcion_"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 28, 51, "SEARCH", {"descrip_funcionalidad": "descripcion&"},
        "descrip_funcionalidad_format_ko"],

    ["funcionalidad", "descrip_funcionalidad", 29, 52, "SEARCH", {"descrip_funcionalidad": "descripcion"},
        true]

];