/* fecha de hoy (+ n dias) en formato d/m/aaaa, para las pruebas de "no posterior a hoy" */
function fecha_hoy_mas(dias){
    var d = new Date();
    d.setDate(d.getDate() + dias);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

/*ESTRUCTURA:

    ["entidad", "campo", "tipo", "nº test", "descripción_Test", "metodo", "acción",  
        "Resultado Esperado", "mensaje"],

*/

var persona_def_tests = [

    //Campo: dni

        //Acción: ADD

            ["persona", "dni", "select", 1, "Validar tamaño mínimo (9 caracteres) del dni en ADD", "min_size", "ADD",
        "dni_min_size_ko", "El DNI es demasiado corto: debe tener 9 caracteres"],

            ["persona", "dni", "select", 2, "Validar tamaño máximo (9 caracteres) del dni en ADD", "max_size", "ADD",
        "dni_max_size_ko", "El DNI es demasiado largo: debe tener 9 caracteres"],

            ["persona", "dni", "select", 3, "Validar formato (8 dígitos y una letra) del dni en ADD", "format", "ADD",
        "dni_format_ko", "El formato del DNI no es válido: deben ser 8 dígitos y una letra mayúscula (en la búsqueda: solo dígitos y como mucho una letra, al final)"],

            ["persona", "dni", "select", 4, "Validar que la letra del dni es correcta en ADD ", "personalized", "ADD",
        "dni_personalized_ko", "El DNI no es válido: la letra de control no es correcta o el DNI ya está en uso"],

            ["persona", "dni", "select", 5, "Validar dni correcto en ADD", "valid", "ADD",
        true, "DNI correcto"],

        //Acción: SEARCH
            
            ["persona", "dni", "input", 6, "Validar tamaño máximo (9 caracteres) del dni en SEARCH", "max_size", "SEARCH",
        "dni_max_size_ko", "El DNI es demasiado largo: debe tener 9 caracteres"],

            ["persona", "dni", "input", 7, "Validar formato (solo dígitos y como mucho una letra, al final) del dni en SEARCH; una letra antes de los números se pasa al final", "format", "SEARCH",
        "dni_format_ko", "El formato del DNI no es válido: deben ser 8 dígitos y una letra mayúscula (en la búsqueda: solo dígitos y como mucho una letra, al final)"],

            ["persona", "dni", "input", 8, "Validar dni correcto en SEARCH (parcial, o con la letra antes de los números, que se corrige)", "valid", "SEARCH",
        true, "DNI correcto"],

    //Campo: nombre_persona

        //Acción: ADD

            ["persona", "nombre_persona", "input", 9, "Validar tamaño mínimo (2 caracteres) del nombre en ADD", "min_size", "ADD",
        "nombre_persona_min_size_ko", "El nombre es demasiado corto: debe tener al menos 2 caracteres"],

            ["persona", "nombre_persona", "input", 10, "Validar tamaño máximo (45 caracteres) del nombre en ADD", "max_size", "ADD",
        "nombre_persona_max_size_ko", "El nombre es demasiado largo: no puede superar los 45 caracteres"],

            ["persona", "nombre_persona", "input", 11, "Validar formato del nombre en ADD", "format", "ADD",
        "nombre_persona_format_ko", "El nombre contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios"],

            ["persona", "nombre_persona", "input", 12, "Validar nombre correcto en ADD", "valid", "ADD",
        true, "Nombre correcto"],

        //Acción: EDIT

            ["persona", "nombre_persona", "input", 13, "Validar tamaño mínimo (2 caracteres) del nombre en EDIT", "min_size", "EDIT",
        "nombre_persona_min_size_ko", "El nombre es demasiado corto: debe tener al menos 2 caracteres"],

            ["persona", "nombre_persona", "input", 14, "Validar tamaño máximo (45 caracteres) del nombre en EDIT", "max_size", "EDIT",
        "nombre_persona_max_size_ko", "El nombre es demasiado largo: no puede superar los 45 caracteres"],

            ["persona", "nombre_persona", "input", 15, "Validar formato del nombre en EDIT", "format", "EDIT",
        "nombre_persona_format_ko", "El nombre contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios"],

            ["persona", "nombre_persona", "input", 16, "Validar nombre correcto en EDIT", "valid", "EDIT",
        true, "Nombre correcto"],
            
        //Acción: SEARCH

            ["persona", "nombre_persona", "input", 17, "Validar tamaño máximo (45 caracteres) del nombre en SEARCH", "max_size", "SEARCH",
        "nombre_persona_max_size_ko", "El nombre es demasiado largo: no puede superar los 45 caracteres"],

            ["persona", "nombre_persona", "input", 18, "Validar formato del nombre en SEARCH", "format", "SEARCH",
        "nombre_persona_format_ko", "El nombre contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios"],

            ["persona", "nombre_persona", "input", 19, "Validar nombre correcto en SEARCH", "valid", "SEARCH",
        true, "Nombre correcto"],

    //Campo: apellidos_persona

        //Acción: ADD

            ["persona", "apellidos_persona", "input", 20, "Validar tamaño mínimo (3 caracteres) de los apellidos en ADD", "min_size", "ADD",
        "apellidos_persona_min_size_ko", "Los apellidos son demasiado cortos: deben tener al menos 3 caracteres"],

            ["persona", "apellidos_persona", "input", 21, "Validar tamaño máximo (100 caracteres) de los apellidos en ADD", "max_size", "ADD",
        "apellidos_persona_max_size_ko", "Los apellidos son demasiado largos: no pueden superar los 100 caracteres"],

            ["persona", "apellidos_persona", "input", 22, "Validar formato de los apellidos en ADD", "format", "ADD",
        "apellidos_persona_format_ko", "Los apellidos contienen caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios"],

            ["persona", "apellidos_persona", "input", 23, "Validar apellidos correctos en ADD", "valid", "ADD",
        true, "Apellidos correctos"],

        //Acción: EDIT

            ["persona", "apellidos_persona", "input", 24, "Validar tamaño mínimo (3 caracteres) de los apellidos en EDIT", "min_size", "EDIT",
        "apellidos_persona_min_size_ko", "Los apellidos son demasiado cortos: deben tener al menos 3 caracteres"],

            ["persona", "apellidos_persona", "input", 25, "Validar tamaño máximo (100 caracteres) de los apellidos en EDIT", "max_size", "EDIT",
        "apellidos_persona_max_size_ko", "Los apellidos son demasiado largos: no pueden superar los 100 caracteres"],

            ["persona", "apellidos_persona", "input", 26, "Validar formato de los apellidos en EDIT", "format", "EDIT",
        "apellidos_persona_format_ko", "Los apellidos contienen caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios"],

            ["persona", "apellidos_persona", "input", 27, "Validar apellidos correctos en EDIT", "valid", "EDIT",
        true, "Apellidos correctos"],

        //Acción: SEARCH

            ["persona", "apellidos_persona", "input", 28, "Validar tamaño máximo (100 caracteres) de los apellidos en SEARCH", "max_size", "SEARCH",
        "apellidos_persona_max_size_ko", "Los apellidos son demasiado largos: no pueden superar los 100 caracteres"],

            ["persona", "apellidos_persona", "input", 29, "Validar formato de los apellidos en SEARCH", "format", "SEARCH",
        "apellidos_persona_format_ko", "Los apellidos contienen caracteres no válidos: solo se permiten letras (incluida ñ y acentos), puntos, guiones y espacios"],

            ["persona", "apellidos_persona", "input", 30, "Validar apellidos correctos en SEARCH", "valid", "SEARCH",
        true, "Apellidos correctos"],

    //Campo: fechaNacimiento_persona

        //Acción: ADD

            ["persona", "fechaNacimiento_persona", "input", 31, "Validar tamaño mínimo (8 caracteres) de la fecha de nacimiento en ADD", "min_size", "ADD",
        "fechaNacimiento_persona_min_size_ko", "La fecha de nacimiento es demasiado corta: debe tener al menos 8 caracteres (d/m/aaaa o d-m-aaaa)"],

            ["persona", "fechaNacimiento_persona", "input", 32, "Validar tamaño máximo (10 caracteres) de la fecha de nacimiento en ADD", "max_size", "ADD",
        "fechaNacimiento_persona_max_size_ko", "La fecha de nacimiento es demasiado larga: no puede superar los 10 caracteres (dd/mm/aaaa o dd-mm-aaaa)"],

            ["persona", "fechaNacimiento_persona", "input", 33, "Validar formato dd/mm/aaaa o dd-mm-aaaa (mismo separador) de la fecha de nacimiento en ADD; el formato anglosajón se reordena antes de validar", "format", "ADD",
        "fechaNacimiento_persona_format_ko", "El formato de la fecha de nacimiento no es válido: debe ser dd/mm/aaaa o dd-mm-aaaa (en ADD y EDIT también se admiten aaaa/mm/dd y mm/dd/aaaa con día mayor que 12, que se reordenan; en la búsqueda solo dd/mm/aaaa, completo o parcial: el formato aaaa/mm/dd no es válido)"],

            ["persona", "fechaNacimiento_persona", "input", 34, "Validar que la fecha de nacimiento existe en el calendario y no es posterior a la fecha actual en ADD", "personalized", "ADD",
        "fechaNacimiento_persona_personalized_ko", "La fecha de nacimiento no es válida: debe existir en el calendario y no ser posterior a hoy"],

            ["persona", "fechaNacimiento_persona", "input", 35, "Validar fecha de nacimiento correcta en ADD", "valid", "ADD",
        true, "Fecha de nacimiento correcta"],

        //Acción: EDIT

            ["persona", "fechaNacimiento_persona", "input", 36, "Validar tamaño mínimo (8 caracteres) de la fecha de nacimiento en EDIT", "min_size", "EDIT",
        "fechaNacimiento_persona_min_size_ko", "La fecha de nacimiento es demasiado corta: debe tener al menos 8 caracteres (d/m/aaaa o d-m-aaaa)"],

            ["persona", "fechaNacimiento_persona", "input", 37, "Validar tamaño máximo (10 caracteres) de la fecha de nacimiento en EDIT", "max_size", "EDIT",
        "fechaNacimiento_persona_max_size_ko", "La fecha de nacimiento es demasiado larga: no puede superar los 10 caracteres (dd/mm/aaaa o dd-mm-aaaa)"],

            ["persona", "fechaNacimiento_persona", "input", 38, "Validar formato dd/mm/aaaa o dd-mm-aaaa (mismo separador) de la fecha de nacimiento en EDIT; el formato anglosajón se reordena antes de validar", "format", "EDIT",
        "fechaNacimiento_persona_format_ko", "El formato de la fecha de nacimiento no es válido: debe ser dd/mm/aaaa o dd-mm-aaaa (en ADD y EDIT también se admiten aaaa/mm/dd y mm/dd/aaaa con día mayor que 12, que se reordenan; en la búsqueda solo dd/mm/aaaa, completo o parcial: el formato aaaa/mm/dd no es válido)"],

            ["persona", "fechaNacimiento_persona", "input", 39, "Validar que la fecha de nacimiento existe en el calendario y no es posterior a la fecha actual en EDIT", "personalized", "EDIT",
        "fechaNacimiento_persona_personalized_ko", "La fecha de nacimiento no es válida: debe existir en el calendario y no ser posterior a hoy"],

            ["persona", "fechaNacimiento_persona", "input", 40, "Validar fecha de nacimiento correcta en EDIT", "valid", "EDIT",
        true, "Fecha de nacimiento correcta"],
            
        //Acción: SEARCH

            ["persona", "fechaNacimiento_persona", "input", 41, "Validar tamaño máximo (10 caracteres) de la fecha de nacimiento en SEARCH", "max_size", "SEARCH",
        "fechaNacimiento_persona_max_size_ko", "La fecha de nacimiento es demasiado larga: no puede superar los 10 caracteres (dd/mm/aaaa o dd-mm-aaaa)"],

            ["persona", "fechaNacimiento_persona", "input", 42, "Validar formato dd/mm/aaaa (completo o parcial, con / o -) de la fecha de nacimiento en SEARCH; el formato anglosajón (aaaa/...) es un error de formato y no se reordena nada", "format", "SEARCH",
        "fechaNacimiento_persona_format_ko", "El formato de la fecha de nacimiento no es válido: debe ser dd/mm/aaaa o dd-mm-aaaa (en ADD y EDIT también se admiten aaaa/mm/dd y mm/dd/aaaa con día mayor que 12, que se reordenan; en la búsqueda solo dd/mm/aaaa, completo o parcial: el formato aaaa/mm/dd no es válido)"],

            ["persona", "fechaNacimiento_persona", "input", 43, "Validar que la fecha de nacimiento, cuando está completa (d/m/aaaa), existe en el calendario en SEARCH", "personalized", "SEARCH",
        "fechaNacimiento_persona_personalized_ko", "La fecha de nacimiento no es válida: debe existir en el calendario y no ser posterior a hoy"],

            ["persona", "fechaNacimiento_persona", "input", 44, "Validar fecha de nacimiento correcta en SEARCH", "valid", "SEARCH",
        true, "Fecha de nacimiento correcta"],

    //Campo: direccion_persona

        //Acción: ADD

            ["persona", "direccion_persona", "textarea", 45, "Validar tamaño mínimo (10 caracteres) de la dirección en ADD", "min_size", "ADD",
        "direccion_persona_min_size_ko", "La dirección es demasiado corta: debe tener al menos 10 caracteres"],

            ["persona", "direccion_persona", "textarea", 46, "Validar tamaño máximo (200 caracteres) de la dirección en ADD", "max_size", "ADD",
        "direccion_persona_max_size_ko", "La dirección es demasiado larga: no puede superar los 200 caracteres"],

            ["persona", "direccion_persona", "textarea", 47, "Validar formato de la dirección en ADD", "format", "ADD",
        "direccion_persona_format_ko", "La dirección contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), números, puntos, guiones, punto y coma, espacios y /"],

            ["persona", "direccion_persona", "textarea", 48, "Validar dirección correcta en ADD", "valid", "ADD",
        true, "Dirección correcta"],

        //Acción: EDIT

            ["persona", "direccion_persona", "textarea", 49, "Validar tamaño mínimo (10 caracteres) de la dirección en EDIT", "min_size", "EDIT",
        "direccion_persona_min_size_ko", "La dirección es demasiado corta: debe tener al menos 10 caracteres"],

            ["persona", "direccion_persona", "textarea", 50, "Validar tamaño máximo (200 caracteres) de la dirección en EDIT", "max_size", "EDIT",
        "direccion_persona_max_size_ko", "La dirección es demasiado larga: no puede superar los 200 caracteres"],

            ["persona", "direccion_persona", "textarea", 51, "Validar formato de la dirección en EDIT", "format", "EDIT",
        "direccion_persona_format_ko", "La dirección contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), números, puntos, guiones, punto y coma, espacios y /"],

            ["persona", "direccion_persona", "textarea", 52, "Validar dirección correcta en EDIT", "valid", "EDIT",
        true, "Dirección correcta"],

        //Acción: SEARCH

            ["persona", "direccion_persona", "textarea", 53, "Validar tamaño máximo (200 caracteres) de la dirección en SEARCH", "max_size", "SEARCH",
        "direccion_persona_max_size_ko", "La dirección es demasiado larga: no puede superar los 200 caracteres"],

            ["persona", "direccion_persona", "textarea", 54, "Validar formato de la dirección en SEARCH", "format", "SEARCH",
        "direccion_persona_format_ko", "La dirección contiene caracteres no válidos: solo se permiten letras (incluida ñ y acentos), números, puntos, guiones, punto y coma, espacios y /"],

            ["persona", "direccion_persona", "textarea", 55, "Validar dirección correcta en SEARCH", "valid", "SEARCH",
        true, "Dirección correcta"],

    //Campo: telefono_persona

        //Acción: ADD

            ["persona", "telefono_persona", "input", 56, "Validar tamaño mínimo (9 caracteres) del teléfono en ADD", "min_size", "ADD",
        "telefono_persona_min_size_ko", "El teléfono es demasiado corto: debe tener 9 dígitos"],

            ["persona", "telefono_persona", "input", 57, "Validar tamaño máximo (9 caracteres) del teléfono en ADD", "max_size", "ADD",
        "telefono_persona_max_size_ko", "El teléfono es demasiado largo: no puede superar los 9 dígitos"],

            ["persona", "telefono_persona", "input", 58, "Validar formato (9 dígitos numéricos) del teléfono en ADD", "format", "ADD",
        "telefono_persona_format_ko", "El formato del teléfono no es válido: solo se permiten dígitos numéricos (9 en total)"],

            ["persona", "telefono_persona", "input", 59, "Validar que el teléfono es español (empieza por 6, 7, 8 o 9) en ADD", "personalized", "ADD",
        "telefono_persona_personalized_ko", "El teléfono no es un número español válido: debe empezar por 6, 7, 8 o 9"],

            ["persona", "telefono_persona", "input", 60, "Validar teléfono correcto en ADD", "valid", "ADD",
        true, "Teléfono correcto"],

        //Acción: EDIT

            ["persona", "telefono_persona", "input", 61, "Validar tamaño mínimo (9 caracteres) del teléfono en EDIT", "min_size", "EDIT",
        "telefono_persona_min_size_ko", "El teléfono es demasiado corto: debe tener 9 dígitos"],

            ["persona", "telefono_persona", "input", 62, "Validar tamaño máximo (9 caracteres) del teléfono en EDIT", "max_size", "EDIT",
        "telefono_persona_max_size_ko", "El teléfono es demasiado largo: no puede superar los 9 dígitos"],

            ["persona", "telefono_persona", "input", 63, "Validar formato (9 dígitos numéricos) del teléfono en EDIT", "format", "EDIT",
        "telefono_persona_format_ko", "El formato del teléfono no es válido: solo se permiten dígitos numéricos (9 en total)"],

            ["persona", "telefono_persona", "input", 64, "Validar que el teléfono es español (empieza por 6, 7, 8 o 9) en EDIT", "personalized", "EDIT",
        "telefono_persona_personalized_ko", "El teléfono no es un número español válido: debe empezar por 6, 7, 8 o 9"],

            ["persona", "telefono_persona", "input", 65, "Validar teléfono correcto en EDIT", "valid", "EDIT",
        true, "Teléfono correcto"],
            
        //Acción: SEARCH

            ["persona", "telefono_persona", "input", 66, "Validar tamaño máximo (9 caracteres) del teléfono en SEARCH", "max_size", "SEARCH",
        "telefono_persona_max_size_ko", "El teléfono es demasiado largo: no puede superar los 9 dígitos"],

            ["persona", "telefono_persona", "input", 67, "Validar formato (solo dígitos) del teléfono en SEARCH", "format", "SEARCH",
        "telefono_persona_format_ko", "El formato del teléfono no es válido: solo se permiten dígitos numéricos (9 en total)"],

            ["persona", "telefono_persona", "input", 68, "Validar que el teléfono (completo o su comienzo) es español, empieza por 6, 7, 8 o 9, en SEARCH", "personalized", "SEARCH",
        "telefono_persona_personalized_ko", "El teléfono no es un número español válido: debe empezar por 6, 7, 8 o 9"],

            ["persona", "telefono_persona", "input", 69, "Validar teléfono correcto en SEARCH", "valid", "SEARCH",
        true, "Teléfono correcto"],

    //Campo: email_persona

        //Acción: ADD
            ["persona", "email_persona", "input", 70, "Validar tamaño mínimo (6 caracteres) del email en ADD", "min_size", "ADD",
        "email_persona_min_size_ko", "El email es demasiado corto: debe tener al menos 6 caracteres"],

            ["persona", "email_persona", "input", 71, "Validar tamaño máximo (45 caracteres) del email en ADD", "max_size", "ADD",
        "email_persona_max_size_ko", "El email es demasiado largo: no puede superar los 45 caracteres"],

            ["persona", "email_persona", "input", 72, "Validar formato del email en ADD", "format", "ADD",
        "email_persona_format_ko", "El formato del email no es válido: debe ser del tipo usuario@dominio.ext (en la búsqueda se admite un trozo, con letras, números, @, puntos, guiones y guiones bajos)"],

            ["persona", "email_persona", "input", 73, "Validar email correcto en ADD", "valid", "ADD",
        true, "Email correcto"],

        //Acción: EDIT
            ["persona", "email_persona", "input", 74, "Validar tamaño mínimo (6 caracteres) del email en EDIT", "min_size", "EDIT",
        "email_persona_min_size_ko", "El email es demasiado corto: debe tener al menos 6 caracteres"],

            ["persona", "email_persona", "input", 75, "Validar tamaño máximo (45 caracteres) del email en EDIT", "max_size", "EDIT",
        "email_persona_max_size_ko", "El email es demasiado largo: no puede superar los 45 caracteres"],

            ["persona", "email_persona", "input", 76, "Validar formato del email en EDIT", "format", "EDIT",
        "email_persona_format_ko", "El formato del email no es válido: debe ser del tipo usuario@dominio.ext (en la búsqueda se admite un trozo, con letras, números, @, puntos, guiones y guiones bajos)"],

            ["persona", "email_persona", "input", 77, "Validar email correcto en EDIT", "valid", "EDIT",
        true, "Email correcto"],

        //Acción: SEARCH

            ["persona", "email_persona", "input", 78, "Validar tamaño máximo (45 caracteres) del email en SEARCH", "max_size", "SEARCH",
        "email_persona_max_size_ko", "El email es demasiado largo: no puede superar los 45 caracteres"],

            ["persona", "email_persona", "input", 79, "Validar formato (solo letras, números, @, puntos, guiones y guiones bajos; no se exige estructura completa) del email en SEARCH", "format", "SEARCH",
        "email_persona_format_ko", "El formato del email no es válido: debe ser del tipo usuario@dominio.ext (en la búsqueda se admite un trozo, con letras, números, @, puntos, guiones y guiones bajos)"],

            ["persona", "email_persona", "input", 80, "Validar email correcto en SEARCH", "valid", "SEARCH",
        true, "Email correcto"],

    //Campo: foto_persona     //input de texto (nombre del fichero): solo se muestra editable en SEARCH (en ADD no se muestra y en EDIT es de solo lectura)

        //Acción: SEARCH

            ["persona", "foto_persona", "input", 81, "Validar tamaño máximo (15 caracteres) del nombre del fichero en SEARCH", "max_size", "SEARCH",
        "foto_persona_max_size_ko", "El nombre del fichero es demasiado largo: no puede superar los 15 caracteres extensión incluida"],

            ["persona", "foto_persona", "input", 82, "Validar formato del nombre del fichero (alfabético y punto) en SEARCH", "format", "SEARCH",
        "foto_persona_format_ko", "El nombre del fichero no es válido: solo se permiten letras y punto."],

            ["persona", "foto_persona", "input", 83, "Validar foto correcta en SEARCH", "valid", "SEARCH",
        true, "Foto correcta"],

    //Campo: nuevo_foto_persona

        //Acción: ADD

            ["persona", "nuevo_foto_persona", "file", 84, "Validar que se ha seleccionado un fichero en ADD", "exist_file", "ADD",
        "nuevo_foto_persona_exist_file_ko", "No se ha seleccionado ningún fichero: debe subir una foto"],

            ["persona", "nuevo_foto_persona", "file", 85, "Validar formato del nombre del fichero (alfabético y punto) a la vez de validar su tamaño maximo(15) y minimo(5) incluidas las extensiones en ADD", "format_name_file", "ADD",
        "nuevo_foto_persona_format_name_file_ko", "El nombre del fichero no es válido: solo se permiten letras y punto, y debe tener entre 5 y 15 caracteres extensión incluida"],

            ["persona", "nuevo_foto_persona", "file", 86, "Validar tipo de fichero (jpg o jpeg) en ADD", "type_file", "ADD",
        "nuevo_foto_persona_type_file_ko", "El tipo de fichero no está permitido: solo se admite jpg o jpeg"],

            ["persona", "nuevo_foto_persona", "file", 87, "Validar tamaño máximo del fichero (2 MB) en ADD", "max_size_file", "ADD",
        "nuevo_foto_persona_max_size_file_ko", "El fichero es demasiado grande: no puede superar los 2 MB"],

            ["persona", "nuevo_foto_persona", "file", 88, "Validar foto correcta en ADD", "valid", "ADD",
        true, "Foto correcta"],

        //Acción: EDIT

            ["persona", "nuevo_foto_persona", "file", 89, "Validar que en EDIT no es obligatorio seleccionar un fichero (puede no existir)", "exist_file", "EDIT",
        true, "Fichero no obligatorio en EDIT"],

            ["persona", "nuevo_foto_persona", "file", 90, "Validar formato del nombre del fichero (alfabético y punto) a la vez de validar su tamaño maximo(15) y minimo(5) incluidas las extensiones en EDIT", "format_name_file", "EDIT",
        "nuevo_foto_persona_format_name_file_ko", "El nombre del fichero no es válido: solo se permiten letras y punto, y debe tener entre 5 y 15 caracteres extensión incluida"],

            ["persona", "nuevo_foto_persona", "file", 91, "Validar tipo de fichero (jpg o jpeg) en EDIT", "type_file", "EDIT",
        "nuevo_foto_persona_type_file_ko", "El tipo de fichero no está permitido: solo se admite jpg o jpeg"],

            ["persona", "nuevo_foto_persona", "file", 92, "Validar tamaño máximo del fichero (2 MB) en EDIT", "max_size_file", "EDIT",
        "nuevo_foto_persona_max_size_file_ko", "El fichero es demasiado grande: no puede superar los 2 MB"],

            ["persona", "nuevo_foto_persona", "file", 93, "Validar foto correcta en EDIT o puede ser vacío", "valid", "EDIT",
        true, "Foto correcta"],

];

/*ESTRUCTURA:

    ["entidad", "campo", "nº test", "nº prueba", "acción", {"atributo" : "valor"},
         "Resultado Esperado"],

*/

var persona_pruebas = [

    //Campo: dni

        //Acción: ADD

            ["persona", "dni", 1, 1, "ADD", {"dni": "1234567Z"}, "dni_min_size_ko"],
            ["persona", "dni", 1, 2, "ADD", {"dni": ""}, "dni_min_size_ko"],

            ["persona", "dni", 2, 3, "ADD", {"dni": "12345678ZZ"}, "dni_max_size_ko"],
            ["persona", "dni", 2, 4, "ADD", {"dni": "123456789012345"}, "dni_max_size_ko"],

            ["persona", "dni", 3, 5, "ADD", {"dni": "123456789"}, "dni_format_ko"],
            ["persona", "dni", 3, 6, "ADD", {"dni": "1234A678Z"}, "dni_format_ko"],
            ["persona", "dni", 3, 7, "ADD", {"dni": "ABCDEFGHI"}, "dni_format_ko"],
            ["persona", "dni", 3, 8, "ADD", {"dni": "12345678z"}, "dni_format_ko"],

            ["persona", "dni", 4, 9, "ADD", {"dni": "12345678A"}, "dni_personalized_ko"],

            ["persona", "dni", 5, 10, "ADD", {"dni": "12345678Z"}, true],
            ["persona", "dni", 5, 11, "ADD", {"dni": "00000000T"}, true],
            ["persona", "dni", 5, 12, "ADD", {"dni": "11111111H"}, true],

        //Acción: SEARCH

            ["persona", "dni", 6, 13, "SEARCH", {"dni": "12345678ZZ"}, "dni_max_size_ko"],

            ["persona", "dni", 7, 14, "SEARCH", {"dni": "1234@678Z"}, "dni_format_ko"],
            ["persona", "dni", 7, 15, "SEARCH", {"dni": "AB"}, "dni_format_ko"],
            ["persona", "dni", 7, 16, "SEARCH", {"dni": "12AB"}, "dni_format_ko"],
            ["persona", "dni", 7, 17, "SEARCH", {"dni": "12A34"}, "dni_format_ko"],
            ["persona", "dni", 7, 18, "SEARCH", {"dni": "Z1234Z"}, "dni_format_ko"],

            ["persona", "dni", 8, 19, "SEARCH", {"dni": "12345678Z"}, true],
            ["persona", "dni", 8, 20, "SEARCH", {"dni": "1234"}, true],
            ["persona", "dni", 8, 21, "SEARCH", {"dni": ""}, true],
            ["persona", "dni", 8, 22, "SEARCH", {"dni": "12345678z"}, true],
            ["persona", "dni", 8, 23, "SEARCH", {"dni": "Z1234"}, true],
            ["persona", "dni", 8, 24, "SEARCH", {"dni": "z12345678"}, true],
            ["persona", "dni", 8, 25, "SEARCH", {"dni": "A"}, true],
            ["persona", "dni", 8, 26, "SEARCH", {"dni": "5678Z"}, true],

    //Campo: nombre_persona

        //Acción: ADD

            ["persona", "nombre_persona", 9, 27, "ADD", {"nombre_persona": "A"}, "nombre_persona_min_size_ko"],
            ["persona", "nombre_persona", 9, 28, "ADD", {"nombre_persona": ""}, "nombre_persona_min_size_ko"],

            ["persona", "nombre_persona", 10, 29, "ADD", {"nombre_persona": "A".repeat(46)}, "nombre_persona_max_size_ko"],

            ["persona", "nombre_persona", 11, 30, "ADD", {"nombre_persona": "Ana123"}, "nombre_persona_format_ko"],
            ["persona", "nombre_persona", 11, 31, "ADD", {"nombre_persona": "Ana_María"}, "nombre_persona_format_ko"],

            ["persona", "nombre_persona", 12, 32, "ADD", {"nombre_persona": "Al"}, true],
            ["persona", "nombre_persona", 12, 33, "ADD", {"nombre_persona": "A".repeat(45)}, true],
            ["persona", "nombre_persona", 12, 34, "ADD", {"nombre_persona": "María-José"}, true],
            ["persona", "nombre_persona", 12, 35, "ADD", {"nombre_persona": "José Luis"}, true],
            ["persona", "nombre_persona", 12, 36, "ADD", {"nombre_persona": "Ana M."}, true],
            ["persona", "nombre_persona", 12, 37, "ADD", {"nombre_persona": "Begoña"}, true],

        //Acción: EDIT

            ["persona", "nombre_persona", 13, 38, "EDIT", {"nombre_persona": "A"}, "nombre_persona_min_size_ko"],

            ["persona", "nombre_persona", 14, 39, "EDIT", {"nombre_persona": "A".repeat(46)}, "nombre_persona_max_size_ko"],

            ["persona", "nombre_persona", 15, 40, "EDIT", {"nombre_persona": "Ana123"}, "nombre_persona_format_ko"],

            ["persona", "nombre_persona", 16, 41, "EDIT", {"nombre_persona": "Al"}, true],
            ["persona", "nombre_persona", 16, 42, "EDIT", {"nombre_persona": "A".repeat(45)}, true],
            ["persona", "nombre_persona", 16, 43, "EDIT", {"nombre_persona": "María-José"}, true],
            ["persona", "nombre_persona", 16, 44, "EDIT", {"nombre_persona": "José Luis"}, true],

        //Acción: SEARCH

            ["persona", "nombre_persona", 17, 45, "SEARCH", {"nombre_persona": "A".repeat(46)}, "nombre_persona_max_size_ko"],

            ["persona", "nombre_persona", 18, 46, "SEARCH", {"nombre_persona": "Ana123"}, "nombre_persona_format_ko"],

            ["persona", "nombre_persona", 19, 47, "SEARCH", {"nombre_persona": "A".repeat(45)}, true],
            ["persona", "nombre_persona", 19, 48, "SEARCH", {"nombre_persona": "An"}, true],
            ["persona", "nombre_persona", 19, 49, "SEARCH", {"nombre_persona": "María"}, true],
            ["persona", "nombre_persona", 19, 50, "SEARCH", {"nombre_persona": ""}, true],

    //Campo: apellidos_persona

        //Acción: ADD

            ["persona", "apellidos_persona", 20, 51, "ADD", {"apellidos_persona": "Ru"}, "apellidos_persona_min_size_ko"],
            ["persona", "apellidos_persona", 20, 52, "ADD", {"apellidos_persona": ""}, "apellidos_persona_min_size_ko"],

            ["persona", "apellidos_persona", 21, 53, "ADD", {"apellidos_persona": "A".repeat(101)}, "apellidos_persona_max_size_ko"],

            ["persona", "apellidos_persona", 22, 54, "ADD", {"apellidos_persona": "Pérez 2"}, "apellidos_persona_format_ko"],

            ["persona", "apellidos_persona", 23, 55, "ADD", {"apellidos_persona": "Paz"}, true],
            ["persona", "apellidos_persona", 23, 56, "ADD", {"apellidos_persona": "A".repeat(100)}, true],
            ["persona", "apellidos_persona", 23, 57, "ADD", {"apellidos_persona": "Pérez-Núñez"}, true],
            ["persona", "apellidos_persona", 23, 58, "ADD", {"apellidos_persona": "García López"}, true],
            ["persona", "apellidos_persona", 23, 59, "ADD", {"apellidos_persona": "Da Silva Jr."}, true],
            ["persona", "apellidos_persona", 23, 60, "ADD", {"apellidos_persona": "Muñoz"}, true],

        //Acción: EDIT

            ["persona", "apellidos_persona", 24, 61, "EDIT", {"apellidos_persona": "Ru"}, "apellidos_persona_min_size_ko"],

            ["persona", "apellidos_persona", 25, 62, "EDIT", {"apellidos_persona": "A".repeat(101)}, "apellidos_persona_max_size_ko"],

            ["persona", "apellidos_persona", 26, 63, "EDIT", {"apellidos_persona": "Pérez 2"}, "apellidos_persona_format_ko"],

            ["persona", "apellidos_persona", 27, 64, "EDIT", {"apellidos_persona": "Paz"}, true],
            ["persona", "apellidos_persona", 27, 65, "EDIT", {"apellidos_persona": "A".repeat(100)}, true],
            ["persona", "apellidos_persona", 27, 66, "EDIT", {"apellidos_persona": "Pérez-Núñez"}, true],
            ["persona", "apellidos_persona", 27, 67, "EDIT", {"apellidos_persona": "García López"}, true],

        //Acción: SEARCH

            ["persona", "apellidos_persona", 28, 68, "SEARCH", {"apellidos_persona": "A".repeat(101)}, "apellidos_persona_max_size_ko"],

            ["persona", "apellidos_persona", 29, 69, "SEARCH", {"apellidos_persona": "Pérez 2"}, "apellidos_persona_format_ko"],

            ["persona", "apellidos_persona", 30, 70, "SEARCH", {"apellidos_persona": "A".repeat(100)}, true],
            ["persona", "apellidos_persona", 30, 71, "SEARCH", {"apellidos_persona": "Pé"}, true],
            ["persona", "apellidos_persona", 30, 72, "SEARCH", {"apellidos_persona": "García"}, true],
            ["persona", "apellidos_persona", 30, 73, "SEARCH", {"apellidos_persona": ""}, true],

    //Campo: fechaNacimiento_persona

        //Acción: ADD

            ["persona", "fechaNacimiento_persona", 31, 74, "ADD", {"fechaNacimiento_persona": "1/1/200"}, "fechaNacimiento_persona_min_size_ko"],
            ["persona", "fechaNacimiento_persona", 31, 75, "ADD", {"fechaNacimiento_persona": ""}, "fechaNacimiento_persona_min_size_ko"],
            ["persona", "fechaNacimiento_persona", 31, 76, "ADD", {"fechaNacimiento_persona": "1-1-200"}, "fechaNacimiento_persona_min_size_ko"],

            ["persona", "fechaNacimiento_persona", 32, 77, "ADD", {"fechaNacimiento_persona": "15/01/20000"}, "fechaNacimiento_persona_max_size_ko"],
            ["persona", "fechaNacimiento_persona", 32, 78, "ADD", {"fechaNacimiento_persona": "15-01-20000"}, "fechaNacimiento_persona_max_size_ko"],

            ["persona", "fechaNacimiento_persona", 33, 79, "ADD", {"fechaNacimiento_persona": "15/01-2000"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 33, 80, "ADD", {"fechaNacimiento_persona": "15.01.2000"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 33, 81, "ADD", {"fechaNacimiento_persona": "15-13-2000"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 33, 82, "ADD", {"fechaNacimiento_persona": "2000/13/15"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 33, 83, "ADD", {"fechaNacimiento_persona": "13/15/2000"}, "fechaNacimiento_persona_format_ko"],

            ["persona", "fechaNacimiento_persona", 34, 84, "ADD", {"fechaNacimiento_persona": "30/02/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 34, 85, "ADD", {"fechaNacimiento_persona": "31/04/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 34, 86, "ADD", {"fechaNacimiento_persona": fecha_hoy_mas(1)}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 34, 87, "ADD", {"fechaNacimiento_persona": "30-02-2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 34, 88, "ADD", {"fechaNacimiento_persona": "31-04-2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 34, 89, "ADD", {"fechaNacimiento_persona": "2000-02-30"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 34, 90, "ADD", {"fechaNacimiento_persona": "02/30/2000"}, "fechaNacimiento_persona_personalized_ko"],

            ["persona", "fechaNacimiento_persona", 35, 91, "ADD", {"fechaNacimiento_persona": "1/1/2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 92, "ADD", {"fechaNacimiento_persona": "15/01/2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 93, "ADD", {"fechaNacimiento_persona": "29/02/2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 94, "ADD", {"fechaNacimiento_persona": fecha_hoy_mas(0)}, true],
            ["persona", "fechaNacimiento_persona", 35, 95, "ADD", {"fechaNacimiento_persona": fecha_hoy_mas(-1)}, true],
            ["persona", "fechaNacimiento_persona", 35, 96, "ADD", {"fechaNacimiento_persona": "31/12/1999"}, true],
            ["persona", "fechaNacimiento_persona", 35, 97, "ADD", {"fechaNacimiento_persona": "1-1-2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 98, "ADD", {"fechaNacimiento_persona": "15-01-2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 99, "ADD", {"fechaNacimiento_persona": "29-02-2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 100, "ADD", {"fechaNacimiento_persona": "2000-01-15"}, true],
            ["persona", "fechaNacimiento_persona", 35, 101, "ADD", {"fechaNacimiento_persona": "2000/1/5"}, true],
            ["persona", "fechaNacimiento_persona", 35, 102, "ADD", {"fechaNacimiento_persona": "01/15/2000"}, true],
            ["persona", "fechaNacimiento_persona", 35, 103, "ADD", {"fechaNacimiento_persona": "12/25/1999"}, true],

        //Acción: EDIT

            ["persona", "fechaNacimiento_persona", 36, 104, "EDIT", {"fechaNacimiento_persona": "1/1/200"}, "fechaNacimiento_persona_min_size_ko"],
            ["persona", "fechaNacimiento_persona", 36, 105, "EDIT", {"fechaNacimiento_persona": "1-1-200"}, "fechaNacimiento_persona_min_size_ko"],

            ["persona", "fechaNacimiento_persona", 37, 106, "EDIT", {"fechaNacimiento_persona": "15/01/20000"}, "fechaNacimiento_persona_max_size_ko"],

            ["persona", "fechaNacimiento_persona", 38, 107, "EDIT", {"fechaNacimiento_persona": "15/01-2000"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 38, 108, "EDIT", {"fechaNacimiento_persona": "2000/13/15"}, "fechaNacimiento_persona_format_ko"],

            ["persona", "fechaNacimiento_persona", 39, 109, "EDIT", {"fechaNacimiento_persona": "30/02/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 39, 110, "EDIT", {"fechaNacimiento_persona": "01/01/2100"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 39, 111, "EDIT", {"fechaNacimiento_persona": "31/04/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 39, 112, "EDIT", {"fechaNacimiento_persona": fecha_hoy_mas(1)}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 39, 113, "EDIT", {"fechaNacimiento_persona": "30-02-2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 39, 114, "EDIT", {"fechaNacimiento_persona": "2000/02/30"}, "fechaNacimiento_persona_personalized_ko"],

            ["persona", "fechaNacimiento_persona", 40, 115, "EDIT", {"fechaNacimiento_persona": "1/1/2000"}, true],
            ["persona", "fechaNacimiento_persona", 40, 116, "EDIT", {"fechaNacimiento_persona": "15/01/2000"}, true],
            ["persona", "fechaNacimiento_persona", 40, 117, "EDIT", {"fechaNacimiento_persona": "29/02/2000"}, true],
            ["persona", "fechaNacimiento_persona", 40, 118, "EDIT", {"fechaNacimiento_persona": fecha_hoy_mas(0)}, true],
            ["persona", "fechaNacimiento_persona", 40, 119, "EDIT", {"fechaNacimiento_persona": fecha_hoy_mas(-1)}, true],
            ["persona", "fechaNacimiento_persona", 40, 120, "EDIT", {"fechaNacimiento_persona": "31/12/1999"}, true],
            ["persona", "fechaNacimiento_persona", 40, 121, "EDIT", {"fechaNacimiento_persona": "1-1-2000"}, true],
            ["persona", "fechaNacimiento_persona", 40, 122, "EDIT", {"fechaNacimiento_persona": "15-01-2000"}, true],
            ["persona", "fechaNacimiento_persona", 40, 123, "EDIT", {"fechaNacimiento_persona": "2000-01-15"}, true],
            ["persona", "fechaNacimiento_persona", 40, 124, "EDIT", {"fechaNacimiento_persona": "01/15/2000"}, true],

        //Acción: SEARCH

            ["persona", "fechaNacimiento_persona", 41, 125, "SEARCH", {"fechaNacimiento_persona": "15/01/20000"}, "fechaNacimiento_persona_max_size_ko"],

            ["persona", "fechaNacimiento_persona", 42, 126, "SEARCH", {"fechaNacimiento_persona": "15.01.2000"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 42, 127, "SEARCH", {"fechaNacimiento_persona": "15/01/200a"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 42, 128, "SEARCH", {"fechaNacimiento_persona": "2000/01/15"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 42, 129, "SEARCH", {"fechaNacimiento_persona": "2000-01-15"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 42, 130, "SEARCH", {"fechaNacimiento_persona": "2000/01"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 42, 131, "SEARCH", {"fechaNacimiento_persona": "2000/"}, "fechaNacimiento_persona_format_ko"],
            ["persona", "fechaNacimiento_persona", 42, 132, "SEARCH", {"fechaNacimiento_persona": "15//01"}, "fechaNacimiento_persona_format_ko"],

            ["persona", "fechaNacimiento_persona", 43, 133, "SEARCH", {"fechaNacimiento_persona": "30/02/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 43, 134, "SEARCH", {"fechaNacimiento_persona": "31/04/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 43, 135, "SEARCH", {"fechaNacimiento_persona": "32/01/2000"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 43, 136, "SEARCH", {"fechaNacimiento_persona": "29/02/2001"}, "fechaNacimiento_persona_personalized_ko"],
            ["persona", "fechaNacimiento_persona", 43, 137, "SEARCH", {"fechaNacimiento_persona": "30-02-2000"}, "fechaNacimiento_persona_personalized_ko"],

            ["persona", "fechaNacimiento_persona", 44, 138, "SEARCH", {"fechaNacimiento_persona": "15/01/2000"}, true],
            ["persona", "fechaNacimiento_persona", 44, 139, "SEARCH", {"fechaNacimiento_persona": "15/01"}, true],
            ["persona", "fechaNacimiento_persona", 44, 140, "SEARCH", {"fechaNacimiento_persona": "2000"}, true],
            ["persona", "fechaNacimiento_persona", 44, 141, "SEARCH", {"fechaNacimiento_persona": ""}, true],
            ["persona", "fechaNacimiento_persona", 44, 142, "SEARCH", {"fechaNacimiento_persona": "15-01-2000"}, true],
            ["persona", "fechaNacimiento_persona", 44, 143, "SEARCH", {"fechaNacimiento_persona": "15-01"}, true],
            ["persona", "fechaNacimiento_persona", 44, 144, "SEARCH", {"fechaNacimiento_persona": "01-2000"}, true],
            ["persona", "fechaNacimiento_persona", 44, 145, "SEARCH", {"fechaNacimiento_persona": "01/15"}, true],
            ["persona", "fechaNacimiento_persona", 44, 146, "SEARCH", {"fechaNacimiento_persona": "15/"}, true],
            ["persona", "fechaNacimiento_persona", 44, 147, "SEARCH", {"fechaNacimiento_persona": "15/01/"}, true],
            ["persona", "fechaNacimiento_persona", 44, 148, "SEARCH", {"fechaNacimiento_persona": "15/01/2"}, true],
            ["persona", "fechaNacimiento_persona", 44, 149, "SEARCH", {"fechaNacimiento_persona": "1"}, true],

    //Campo: direccion_persona

        //Acción: ADD

            ["persona", "direccion_persona", 45, 150, "ADD", {"direccion_persona": "Calle 1"}, "direccion_persona_min_size_ko"],
            ["persona", "direccion_persona", 45, 151, "ADD", {"direccion_persona": ""}, "direccion_persona_min_size_ko"],

            ["persona", "direccion_persona", 46, 152, "ADD", {"direccion_persona": "C".repeat(201)}, "direccion_persona_max_size_ko"],

            ["persona", "direccion_persona", 47, 153, "ADD", {"direccion_persona": "Calle Mayor #5"}, "direccion_persona_format_ko"],
            ["persona", "direccion_persona", 47, 154, "ADD", {"direccion_persona": "Calle Mayor, 5"}, "direccion_persona_format_ko"],

            ["persona", "direccion_persona", 48, 155, "ADD", {"direccion_persona": "Calle May."}, true],
            ["persona", "direccion_persona", 48, 156, "ADD", {"direccion_persona": "C".repeat(200)}, true],
            ["persona", "direccion_persona", 48, 157, "ADD", {"direccion_persona": "Rúa do Vilar 12; 3/B"}, true],
            ["persona", "direccion_persona", 48, 158, "ADD", {"direccion_persona": "Avenida de Vigo 45/2-A"}, true],

        //Acción: EDIT

            ["persona", "direccion_persona", 49, 159, "EDIT", {"direccion_persona": "Calle 1"}, "direccion_persona_min_size_ko"],

            ["persona", "direccion_persona", 50, 160, "EDIT", {"direccion_persona": "C".repeat(201)}, "direccion_persona_max_size_ko"],

            ["persona", "direccion_persona", 51, 161, "EDIT", {"direccion_persona": "Calle Mayor #5"}, "direccion_persona_format_ko"],

            ["persona", "direccion_persona", 52, 162, "EDIT", {"direccion_persona": "Calle May."}, true],
            ["persona", "direccion_persona", 52, 163, "EDIT", {"direccion_persona": "C".repeat(200)}, true],
            ["persona", "direccion_persona", 52, 164, "EDIT", {"direccion_persona": "Rúa do Vilar 12; 3/B"}, true],

        //Acción: SEARCH

            ["persona", "direccion_persona", 53, 165, "SEARCH", {"direccion_persona": "C".repeat(201)}, "direccion_persona_max_size_ko"],

            ["persona", "direccion_persona", 54, 166, "SEARCH", {"direccion_persona": "Calle #5"}, "direccion_persona_format_ko"],

            ["persona", "direccion_persona", 55, 167, "SEARCH", {"direccion_persona": "C".repeat(200)}, true],
            ["persona", "direccion_persona", 55, 168, "SEARCH", {"direccion_persona": "Rúa do Vilar"}, true],
            ["persona", "direccion_persona", 55, 169, "SEARCH", {"direccion_persona": "Vigo"}, true],
            ["persona", "direccion_persona", 55, 170, "SEARCH", {"direccion_persona": ""}, true],

    //Campo: telefono_persona

        //Acción: ADD

            ["persona", "telefono_persona", 56, 171, "ADD", {"telefono_persona": "61234567"}, "telefono_persona_min_size_ko"],
            ["persona", "telefono_persona", 56, 172, "ADD", {"telefono_persona": ""}, "telefono_persona_min_size_ko"],

            ["persona", "telefono_persona", 57, 173, "ADD", {"telefono_persona": "6123456789"}, "telefono_persona_max_size_ko"],

            ["persona", "telefono_persona", 58, 174, "ADD", {"telefono_persona": "61234567A"}, "telefono_persona_format_ko"],
            ["persona", "telefono_persona", 58, 175, "ADD", {"telefono_persona": "6123-5678"}, "telefono_persona_format_ko"],

            ["persona", "telefono_persona", 59, 176, "ADD", {"telefono_persona": "512345678"}, "telefono_persona_personalized_ko"],
            ["persona", "telefono_persona", 59, 177, "ADD", {"telefono_persona": "112345678"}, "telefono_persona_personalized_ko"],
            ["persona", "telefono_persona", 59, 178, "ADD", {"telefono_persona": "012345678"}, "telefono_persona_personalized_ko"],

            ["persona", "telefono_persona", 60, 179, "ADD", {"telefono_persona": "612345678"}, true],
            ["persona", "telefono_persona", 60, 180, "ADD", {"telefono_persona": "912345678"}, true],
            ["persona", "telefono_persona", 60, 181, "ADD", {"telefono_persona": "789123456"}, true],
            ["persona", "telefono_persona", 60, 182, "ADD", {"telefono_persona": "812345678"}, true],

        //Acción: EDIT

            ["persona", "telefono_persona", 61, 183, "EDIT", {"telefono_persona": "61234567"}, "telefono_persona_min_size_ko"],

            ["persona", "telefono_persona", 62, 184, "EDIT", {"telefono_persona": "6123456789"}, "telefono_persona_max_size_ko"],

            ["persona", "telefono_persona", 63, 185, "EDIT", {"telefono_persona": "61234567A"}, "telefono_persona_format_ko"],

            ["persona", "telefono_persona", 64, 186, "EDIT", {"telefono_persona": "512345678"}, "telefono_persona_personalized_ko"],

            ["persona", "telefono_persona", 65, 187, "EDIT", {"telefono_persona": "612345678"}, true],
            ["persona", "telefono_persona", 65, 188, "EDIT", {"telefono_persona": "912345678"}, true],

        //Acción: SEARCH

            ["persona", "telefono_persona", 66, 189, "SEARCH", {"telefono_persona": "6123456789"}, "telefono_persona_max_size_ko"],

            ["persona", "telefono_persona", 67, 190, "SEARCH", {"telefono_persona": "61234567A"}, "telefono_persona_format_ko"],

            ["persona", "telefono_persona", 68, 191, "SEARCH", {"telefono_persona": "5"}, "telefono_persona_personalized_ko"],
            ["persona", "telefono_persona", 68, 192, "SEARCH", {"telefono_persona": "512345678"}, "telefono_persona_personalized_ko"],
            ["persona", "telefono_persona", 68, 193, "SEARCH", {"telefono_persona": "012"}, "telefono_persona_personalized_ko"],

            ["persona", "telefono_persona", 69, 194, "SEARCH", {"telefono_persona": "612345678"}, true],
            ["persona", "telefono_persona", 69, 195, "SEARCH", {"telefono_persona": "612"}, true],
            ["persona", "telefono_persona", 69, 196, "SEARCH", {"telefono_persona": ""}, true],

    //Campo: email_persona

        //Acción: ADD
            ["persona", "email_persona", 70, 197, "ADD", {"email_persona": "a@b.e"}, "email_persona_min_size_ko"],
            ["persona", "email_persona", 70, 198, "ADD", {"email_persona": ""}, "email_persona_min_size_ko"],

            ["persona", "email_persona", 71, 199, "ADD", {"email_persona": "a".repeat(37) + "@mail.com"}, "email_persona_max_size_ko"],

            ["persona", "email_persona", 72, 200, "ADD", {"email_persona": "juanmail.com"}, "email_persona_format_ko"],
            ["persona", "email_persona", 72, 201, "ADD", {"email_persona": "juan@mail"}, "email_persona_format_ko"],
            ["persona", "email_persona", 72, 202, "ADD", {"email_persona": "juan@@mail.com"}, "email_persona_format_ko"],

            ["persona", "email_persona", 73, 203, "ADD", {"email_persona": "a".repeat(36) + "@mail.com"}, true],
            ["persona", "email_persona", 73, 204, "ADD", {"email_persona": "juan.perez@mail.com"}, true],
            ["persona", "email_persona", 73, 205, "ADD", {"email_persona": "ana_ruiz@correo.es"}, true],
            ["persona", "email_persona", 73, 206, "ADD", {"email_persona": "a@b.es"}, true],

        //Acción: EDIT
            ["persona", "email_persona", 74, 207, "EDIT", {"email_persona": "a@b.e"}, "email_persona_min_size_ko"],
            ["persona", "email_persona", 74, 208, "EDIT", {"email_persona": ""}, "email_persona_min_size_ko"],

            ["persona", "email_persona", 75, 209, "EDIT", {"email_persona": "a".repeat(37) + "@mail.com"}, "email_persona_max_size_ko"],

            ["persona", "email_persona", 76, 210, "EDIT", {"email_persona": "juanmail.com"}, "email_persona_format_ko"],

            ["persona", "email_persona", 77, 211, "EDIT", {"email_persona": "a".repeat(36) + "@mail.com"}, true],
            ["persona", "email_persona", 77, 212, "EDIT", {"email_persona": "juan.perez@mail.com"}, true],
            ["persona", "email_persona", 77, 213, "EDIT", {"email_persona": "a@b.es"}, true],

        //Acción: SEARCH

            ["persona", "email_persona", 78, 214, "SEARCH", {"email_persona": "a".repeat(37) + "@mail.com"}, "email_persona_max_size_ko"],

            ["persona", "email_persona", 79, 215, "SEARCH", {"email_persona": "juan#mail.com"}, "email_persona_format_ko"],

            ["persona", "email_persona", 80, 216, "SEARCH", {"email_persona": "a".repeat(36) + "@mail.com"}, true],
            ["persona", "email_persona", 80, 217, "SEARCH", {"email_persona": "juan@mail"}, true],
            ["persona", "email_persona", 80, 218, "SEARCH", {"email_persona": "juan.perez@mail.com"}, true],
            ["persona", "email_persona", 80, 219, "SEARCH", {"email_persona": ""}, true],

    //Campo: foto_persona

        //Acción: SEARCH

            ["persona", "foto_persona", 81, 220, "SEARCH", {"foto_persona": "a".repeat(12) + ".jpg"}, "foto_persona_max_size_ko"],

            ["persona", "foto_persona", 82, 221, "SEARCH", {"foto_persona": "mi foto.jpg"}, "foto_persona_format_ko"],

            ["persona", "foto_persona", 83, 222, "SEARCH", {"foto_persona": "foto.jpg"}, true],
            ["persona", "foto_persona", 83, 223, "SEARCH", {"foto_persona": "foto"}, true],
            ["persona", "foto_persona", 83, 224, "SEARCH", {"foto_persona": ""}, true],
            ["persona", "foto_persona", 83, 225, "SEARCH", {"foto_persona": "a".repeat(11) + ".jpg"}, true],

    //Campo: nuevo_foto_persona

        //Acción: ADD

            ["persona", "nuevo_foto_persona", 84, 226, "ADD", {}, "nuevo_foto_persona_exist_file_ko"],

            ["persona", "nuevo_foto_persona", 85, 227, "ADD", {"nuevo_foto_persona": {"format_name_file": "", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],
            ["persona", "nuevo_foto_persona", 85, 228, "ADD", {"nuevo_foto_persona": {"format_name_file": "abcd", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],

            ["persona", "nuevo_foto_persona", 85, 229, "ADD", {"nuevo_foto_persona": {"format_name_file": "a".repeat(12) + ".jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],

            ["persona", "nuevo_foto_persona", 85, 230, "ADD", {"nuevo_foto_persona": {"format_name_file": "mi foto.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],
            ["persona", "nuevo_foto_persona", 85, 231, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto1.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],

            ["persona", "nuevo_foto_persona", 86, 232, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.png", "type_file": "image/png", "max_size_file": 100000}}, "nuevo_foto_persona_type_file_ko"],
            ["persona", "nuevo_foto_persona", 86, 233, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.pdf", "type_file": "application/pdf", "max_size_file": 100000}}, "nuevo_foto_persona_type_file_ko"],

            ["persona", "nuevo_foto_persona", 87, 234, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 2097153}}, "nuevo_foto_persona_max_size_file_ko"],
            ["persona", "nuevo_foto_persona", 87, 235, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 3000000}}, "nuevo_foto_persona_max_size_file_ko"],

            ["persona", "nuevo_foto_persona", 88, 236, "ADD", {"nuevo_foto_persona": {"format_name_file": "a.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 88, 237, "ADD", {"nuevo_foto_persona": {"format_name_file": "a".repeat(11) + ".jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 88, 238, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 88, 239, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.jpeg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 88, 240, "ADD", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 2097152}}, true],
            ["persona", "nuevo_foto_persona", 88, 241, "ADD", {"nuevo_foto_persona": {"format_name_file": "fotoperfil.jpeg", "type_file": "image/jpeg", "max_size_file": 500000}}, true],

        //Acción: EDIT

            ["persona", "nuevo_foto_persona", 89, 242, "EDIT", {}, true],

            ["persona", "nuevo_foto_persona", 90, 243, "EDIT", {"nuevo_foto_persona": {"format_name_file": "", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],
            ["persona", "nuevo_foto_persona", 90, 244, "EDIT", {"nuevo_foto_persona": {"format_name_file": "abcd", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],

            ["persona", "nuevo_foto_persona", 90, 245, "EDIT", {"nuevo_foto_persona": {"format_name_file":"a".repeat(12) + ".jpg", "type_file": "image/jpeg","max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],

            ["persona", "nuevo_foto_persona", 90, 246, "EDIT", {"nuevo_foto_persona": {"format_name_file": "mi foto.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, "nuevo_foto_persona_format_name_file_ko"],

            ["persona", "nuevo_foto_persona", 91, 247, "EDIT", {"nuevo_foto_persona": {"format_name_file": "foto.png", "type_file": "image/png", "max_size_file": 100000}}, "nuevo_foto_persona_type_file_ko"],

            ["persona", "nuevo_foto_persona", 92, 248, "EDIT", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 2097153}}, "nuevo_foto_persona_max_size_file_ko"],

            ["persona", "nuevo_foto_persona", 93, 249, "EDIT", {"nuevo_foto_persona": {"format_name_file": "a.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 93, 250, "EDIT", {"nuevo_foto_persona": {"format_name_file": "a".repeat(11) + ".jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 93, 251, "EDIT", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 93, 252, "EDIT", {"nuevo_foto_persona": {"format_name_file": "foto.jpeg", "type_file": "image/jpeg", "max_size_file": 100000}}, true],
            ["persona", "nuevo_foto_persona", 93, 253, "EDIT", {"nuevo_foto_persona": {"format_name_file": "foto.jpg", "type_file": "image/jpeg", "max_size_file": 2097152}}, true],
            ["persona", "nuevo_foto_persona", 93, 254, "EDIT", {}, true],

];