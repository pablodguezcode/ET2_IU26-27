/* -----------------------------------------------------------------------------
   ENTIDAD: accion
   -----------------------------------------------------------------------------
   ESTRUCTURA:
 
   ["entidad", "campo", "tipo", "nº test", "descripción_Test", "metodo", "acción",
       "Resultado Esperado", "mensaje"]
----------------------------------------------------------------------------- */
 
/* -----------------------------------------------------------------------------
   DECISIONES DE DISEÑO Y ACLARACIONES (entidad accion)
   -----------------------------------------------------------------------------
   Requisitos del enunciado: id_accion numérico (min 1, max 11); nombre_accion
   alfabético con ñ (min 5, max 48); descrip_accion alfabético con ñ, espacio y
   signos de puntuación (min 5, max 200).
 
   Criterios comunes (decisiones propias, el enunciado no los especifica):
   1. ñ y acentos: se admiten en todos los campos de texto de esta entidad,
      salvo que el enunciado diga expresamente "sin" (aquí no lo dice en ninguno).
      Motivo: comodidad del usuario (Interfaces de Usuario); nombres y
      descripciones se escriben en español natural.
   2. Conjunto de caracteres "alfabético" que aceptados en caso de no indicarse lo
      contrario: A-Z a-z, ñ Ñ, áéíóúÁÉÍÓÚ y üÜ.
   3. Espacios: NO se admiten en los nombres (el enunciado solo los lista en las
      descripciones). Dígitos: no se admiten en ningún campo de texto.
   4. Puntuación admitida en las descripciones (puntuación española):
      . , ; : ¿ ? ¡ ! ( ) [ ] - " ' …
      No se admiten otros símbolos (% & # @ $ < >): las pruebas format_ko de las
      descripciones los usan.
   5. Cada prueba format_ko incumple UN solo criterio (un dígito, un símbolo o un
      espacio), para que el resultado esperado no tenga dos causas posibles.
   6. Tests y pruebas de id_* en ADD: se mantienen aunque el id sea autoincremental
      porque la entrega los exige.
   7. id_accion no se edita (es autoincremental): no hay tests ni pruebas de EDIT para
      id_accion. En SEARCH sí es criterio de búsqueda y tiene sus tests.
   8. Los valores "a".repeat(n) comprueban los límites exactos de tamaño.
----------------------------------------------------------------------------- */
 
var accion_def_tests = [
 
//Acción: ADD
 
    ["accion", "id_accion", "input", 1, "Comprobar tamaño mínimo", "min_size", "ADD", "id_accion_min_size_ko", "El identificador de la acción es obligatorio: debe tener al menos 1 dígito"],
 
    ["accion", "id_accion", "input", 2, "Comprobar tamaño máximo", "max_size", "ADD", "id_accion_max_size_ko", "El identificador de la acción supera los 11 dígitos numéricos permitidos"],
 
    ["accion", "id_accion", "input", 3, "Comprobar si el formato del identificador es correcto", "format", "ADD", "id_accion_format_ko", "El identificador de la acción solo puede estar formado por dígitos numéricos"],
 
    ["accion", "id_accion", "input", 4, "Valor correcto", "valid", "ADD", true, "Éxito"],
 
    ["accion", "nombre_accion", "input", 5, "Comprobar tamaño mínimo", "min_size", "ADD", "nombre_accion_min_size_ko", "El nombre de la acción es corto, introduzca por lo menos 5 caracteres"],
 
    ["accion", "nombre_accion", "input", 6, "Comprobar tamaño máximo", "max_size", "ADD", "nombre_accion_max_size_ko", "El nombre de la acción es demasiado largo, introduzca hasta 48 caracteres"],
 
    ["accion", "nombre_accion", "input", 7, "Comprobar si el formato del nombre de la acción es correcto", "format", "ADD", "nombre_accion_format_ko", "El formato del nombre de la acción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos"],
 
    ["accion", "nombre_accion", "input", 8, "Valor correcto", "valid", "ADD", true, "Éxito"],
 
    ["accion", "descrip_accion", "textarea", 9, "Comprobar tamaño mínimo", "min_size", "ADD", "descrip_accion_min_size_ko", "La descripción de la acción es corta, introduzca por lo menos 5 caracteres"],
 
    ["accion", "descrip_accion", "textarea", 10, "Comprobar tamaño máximo", "max_size", "ADD", "descrip_accion_max_size_ko", "La descripción de la acción es demasiado larga, introduzca hasta 200 caracteres"],
 
    ["accion", "descrip_accion", "textarea", 11, "Comprobar si el formato de la descripción es correcto", "format", "ADD", "descrip_accion_format_ko", "El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números"],
 
    ["accion", "descrip_accion", "textarea", 12, "Valor correcto", "valid", "ADD", true, "Éxito"],
 
 
 
//Acción: EDIT
 
    ["accion", "nombre_accion", "input", 13, "Comprobar tamaño mínimo", "min_size", "EDIT", "nombre_accion_min_size_ko", "El nombre de la acción es corto, introduzca por lo menos 5 caracteres"],
 
    ["accion", "nombre_accion", "input", 14, "Comprobar tamaño máximo", "max_size", "EDIT", "nombre_accion_max_size_ko", "El nombre de la acción es demasiado largo, introduzca hasta 48 caracteres"],
 
    ["accion", "nombre_accion", "input", 15, "Comprobar si el formato del nombre de la acción es correcto", "format", "EDIT", "nombre_accion_format_ko", "El formato del nombre de la acción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos"],
 
    ["accion", "nombre_accion", "input", 16, "Valor correcto", "valid", "EDIT", true, "Éxito"],
 
    ["accion", "descrip_accion", "textarea", 17, "Comprobar tamaño mínimo", "min_size", "EDIT", "descrip_accion_min_size_ko", "La descripción de la acción es corta, introduzca por lo menos 5 caracteres"],
 
    ["accion", "descrip_accion", "textarea", 18, "Comprobar tamaño máximo", "max_size", "EDIT", "descrip_accion_max_size_ko", "La descripción de la acción es demasiado larga, introduzca hasta 200 caracteres"],
 
    ["accion", "descrip_accion", "textarea", 19, "Comprobar si el formato de la descripción es correcto", "format", "EDIT", "descrip_accion_format_ko", "El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números"],
 
    ["accion", "descrip_accion", "textarea", 20, "Valor correcto", "valid", "EDIT", true, "Éxito"],
 
 
 
//Acción: SEARCH
 
    ["accion", "id_accion", "input", 21, "Comprobar tamaño máximo", "max_size", "SEARCH", "id_accion_max_size_ko", "El identificador de la acción supera los 11 dígitos numéricos permitidos"],
 
    ["accion", "id_accion", "input", 22, "Comprobar si el formato del identificador es correcto", "format", "SEARCH", "id_accion_format_ko", "El identificador de la acción solo puede estar formado por dígitos numéricos"],
 
    ["accion", "id_accion", "input", 23, "Valor correcto", "valid", "SEARCH", true, "Éxito"],
 
    ["accion", "nombre_accion", "input", 24, "Comprobar tamaño máximo", "max_size", "SEARCH", "nombre_accion_max_size_ko", "El nombre de la acción es demasiado largo, introduzca hasta 48 caracteres"],
 
    ["accion", "nombre_accion", "input", 25, "Comprobar si el formato del nombre de la acción es correcto", "format", "SEARCH", "nombre_accion_format_ko", "El formato del nombre de la acción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), sin espacios, números ni signos"],
 
    ["accion", "nombre_accion", "input", 26, "Valor correcto", "valid", "SEARCH", true, "Éxito"],
 
    ["accion", "descrip_accion", "textarea", 27, "Comprobar tamaño máximo", "max_size", "SEARCH", "descrip_accion_max_size_ko", "La descripción de la acción es demasiado larga, introduzca hasta 200 caracteres"],
 
    ["accion", "descrip_accion", "textarea", 28, "Comprobar si el formato de la descripción es correcto", "format", "SEARCH", "descrip_accion_format_ko", "El formato de la descripción es incorrecto. Los caracteres admitidos son el alfabeto (con la ñ y acentos incluidos), espacios y signos de puntuación, sin números"],
 
    ["accion", "descrip_accion", "textarea", 29, "Valor correcto", "valid", "SEARCH", true, "Éxito"],
 
 
];
 
 
/* -----------------------------------------------------------------------------
   ESTRUCTURA:
 
   ["entidad", "campo", "nº test", "nº prueba", "acción", {"atributo": "valor"},
        "Resultado Esperado"]
----------------------------------------------------------------------------- */
 
var accion_pruebas = [
 
//Acción: ADD
 
    ["accion", "id_accion", 1, 1, "ADD", {"id_accion": ""}, "id_accion_min_size_ko"],
 
    ["accion", "id_accion", 2, 2, "ADD", {"id_accion": "123456789012"}, "id_accion_max_size_ko"],
 
    ["accion", "id_accion", 3, 3, "ADD", {"id_accion": "1a"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 3, 4, "ADD", {"id_accion": "-3"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 3, 5, "ADD", {"id_accion": "1.5"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 3, 6, "ADD", {"id_accion": "1 2"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 4, 7, "ADD", {"id_accion": "7"}, true],
 
    ["accion", "id_accion", 4, 8, "ADD", {"id_accion": "12345678901"}, true],
 
    ["accion", "nombre_accion", 5, 9, "ADD", {"nombre_accion": "alta"}, "nombre_accion_min_size_ko"],
 
    ["accion", "nombre_accion", 6, 10, "ADD", {"nombre_accion": "a".repeat(49)}, "nombre_accion_max_size_ko"],
 
    ["accion", "nombre_accion", 7, 11, "ADD", {"nombre_accion": "borrar1"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 7, 12, "ADD", {"nombre_accion": "borrar_"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 7, 13, "ADD", {"nombre_accion": "borrar registro"}, "nombre_accion_format_ko"], // criterio propio: espacios no admitidos en nombres
 
    ["accion", "nombre_accion", 8, 14, "ADD", {"nombre_accion": "añadir"}, true],
 
    ["accion", "nombre_accion", 8, 15, "ADD", {"nombre_accion": "creación"}, true], // criterio propio: acentos admitidos
 
    ["accion", "nombre_accion", 8, 16, "ADD", {"nombre_accion": "altas"}, true],
 
    ["accion", "nombre_accion", 8, 17, "ADD", {"nombre_accion": "a".repeat(48)}, true],
 
    ["accion", "descrip_accion", 9, 18, "ADD", {"descrip_accion": "Alta"}, "descrip_accion_min_size_ko"],
 
    ["accion", "descrip_accion", 10, 19, "ADD", {"descrip_accion": "a".repeat(201)}, "descrip_accion_max_size_ko"],
 
    ["accion", "descrip_accion", 11, 20, "ADD", {"descrip_accion": "Acción de alta en 2 pasos"}, "descrip_accion_format_ko"],
 
    ["accion", "descrip_accion", 11, 21, "ADD", {"descrip_accion": "Acción de alta segura %"}, "descrip_accion_format_ko"], // símbolo fuera de la puntuación española admitida
 
    ["accion", "descrip_accion", 11, 22, "ADD", {"descrip_accion": "Acción de alta $interna"}, "descrip_accion_format_ko"], // símbolo fuera de la puntuación española admitida
 
    ["accion", "descrip_accion", 12, 23, "ADD", {"descrip_accion": "Añade un nuevo registro en la base de datos, comprobando antes que no exista otro igual."}, true],
 
    ["accion", "descrip_accion", 12, 24, "ADD", {"descrip_accion": "Altas"}, true],
 
    ["accion", "descrip_accion", 12, 25, "ADD", {"descrip_accion": "Acción de alta: ¿añade un registro? ¡Sí!"}, true], // puntuación española (¿ ? ¡ !)
 
    ["accion", "descrip_accion", 12, 26, "ADD", {"descrip_accion": "a".repeat(200)}, true],
 
 
 
//Acción: EDIT
 
    ["accion", "nombre_accion", 13, 27, "EDIT", {"nombre_accion": "leer"}, "nombre_accion_min_size_ko"],
 
    ["accion", "nombre_accion", 14, 28, "EDIT", {"nombre_accion": "a".repeat(49)}, "nombre_accion_max_size_ko"],
 
    ["accion", "nombre_accion", 15, 29, "EDIT", {"nombre_accion": "editar2"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 15, 30, "EDIT", {"nombre_accion": "editar-registro"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 15, 31, "EDIT", {"nombre_accion": "edición2"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 16, 32, "EDIT", {"nombre_accion": "modificar"}, true],
 
    ["accion", "nombre_accion", 16, 33, "EDIT", {"nombre_accion": "edición"}, true], // criterio propio: acentos admitidos
 
    ["accion", "nombre_accion", 16, 34, "EDIT", {"nombre_accion": "altas"}, true],
 
    ["accion", "nombre_accion", 16, 35, "EDIT", {"nombre_accion": "señalar"}, true],
 
    ["accion", "nombre_accion", 16, 36, "EDIT", {"nombre_accion": "a".repeat(48)}, true],
 
    ["accion", "descrip_accion", 17, 37, "EDIT", {"descrip_accion": "Edit"}, "descrip_accion_min_size_ko"],
 
    ["accion", "descrip_accion", 18, 38, "EDIT", {"descrip_accion": "a".repeat(201)}, "descrip_accion_max_size_ko"],
 
    ["accion", "descrip_accion", 19, 39, "EDIT", {"descrip_accion": "Modifica hasta 3 campos"}, "descrip_accion_format_ko"],
 
    ["accion", "descrip_accion", 19, 40, "EDIT", {"descrip_accion": "Modifica los campos & guarda"}, "descrip_accion_format_ko"], // símbolo fuera de la puntuación española admitida
 
    ["accion", "descrip_accion", 19, 41, "EDIT", {"descrip_accion": "Modifica la acción <total>"}, "descrip_accion_format_ko"], // símbolo fuera de la puntuación española admitida
 
    ["accion", "descrip_accion", 20, 42, "EDIT", {"descrip_accion": "Modifica los datos de un registro existente; requiere permisos de edición."}, true],
 
    ["accion", "descrip_accion", 20, 43, "EDIT", {"descrip_accion": "Edita"}, true],
 
    ["accion", "descrip_accion", 20, 44, "EDIT", {"descrip_accion": "Edita el diseño de un registro"}, true],
 
    ["accion", "descrip_accion", 20, 45, "EDIT", {"descrip_accion": "a".repeat(200)}, true],
 
 
 
//Acción: SEARCH
 
    ["accion", "id_accion", 21, 46, "SEARCH", {"id_accion": "123456789012"}, "id_accion_max_size_ko"],
 
    ["accion", "id_accion", 22, 47, "SEARCH", {"id_accion": "3b"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 22, 48, "SEARCH", {"id_accion": "+3"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 22, 49, "SEARCH", {"id_accion": "1 2"}, "id_accion_format_ko"],
 
    ["accion", "id_accion", 23, 50, "SEARCH", {"id_accion": "12"}, true],
 
    ["accion", "id_accion", 23, 51, "SEARCH", {"id_accion": ""}, true],
 
    ["accion", "id_accion", 23, 52, "SEARCH", {"id_accion": "12345678901"}, true],
 
    ["accion", "nombre_accion", 24, 53, "SEARCH", {"nombre_accion": "a".repeat(49)}, "nombre_accion_max_size_ko"],
 
    ["accion", "nombre_accion", 25, 54, "SEARCH", {"nombre_accion": "buscar3"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 25, 55, "SEARCH", {"nombre_accion": "buscar."}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 25, 56, "SEARCH", {"nombre_accion": "acción1"}, "nombre_accion_format_ko"],
 
    ["accion", "nombre_accion", 26, 57, "SEARCH", {"nombre_accion": "consultar"}, true],
 
    ["accion", "nombre_accion", 26, 58, "SEARCH", {"nombre_accion": "alt"}, true],
 
    ["accion", "nombre_accion", 26, 59, "SEARCH", {"nombre_accion": ""}, true],
 
    ["accion", "nombre_accion", 26, 60, "SEARCH", {"nombre_accion": "señalar"}, true],
 
    ["accion", "nombre_accion", 26, 61, "SEARCH", {"nombre_accion": "acción"}, true], // criterio propio: acentos admitidos
 
    ["accion", "nombre_accion", 26, 62, "SEARCH", {"nombre_accion": "a".repeat(48)}, true],
 
    ["accion", "descrip_accion", 27, 63, "SEARCH", {"descrip_accion": "a".repeat(201)}, "descrip_accion_max_size_ko"],
 
    ["accion", "descrip_accion", 28, 64, "SEARCH", {"descrip_accion": "Busca en 3 tablas"}, "descrip_accion_format_ko"],
 
    ["accion", "descrip_accion", 28, 65, "SEARCH", {"descrip_accion": "Busca con coincidencia %"}, "descrip_accion_format_ko"], // símbolo fuera de la puntuación española admitida
 
    ["accion", "descrip_accion", 28, 66, "SEARCH", {"descrip_accion": "Búsqueda $total"}, "descrip_accion_format_ko"], // símbolo fuera de la puntuación española admitida
 
    ["accion", "descrip_accion", 29, 67, "SEARCH", {"descrip_accion": "Busca registros por nombre o identificador."}, true],
 
    ["accion", "descrip_accion", 29, 68, "SEARCH", {"descrip_accion": "Busca reg"}, true],
 
    ["accion", "descrip_accion", 29, 69, "SEARCH", {"descrip_accion": "Búsqueda de registros"}, true],
 
    ["accion", "descrip_accion", 29, 70, "SEARCH", {"descrip_accion": "Busca el diseño"}, true],
 
    ["accion", "descrip_accion", 29, 71, "SEARCH", {"descrip_accion": ""}, true],
 
];