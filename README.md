# Interfaces de Usuario · ET2

Gestión de entidades (formularios, validaciones en cliente y pruebas automáticas) para la asignatura **Interfaces de Usuario**, curso 2026-2027.


## Entidades

`accion`, `funcionalidad`, `funcionalidad_accion`, `persona`, `rol`, `rolaccionfuncionalidad`, `usuario`.


## Estructura del proyecto

```
/
├── index.html                      Aplicación principal (menú, tabla, formulario)
│
├── app/
│   ├── <entidad>_Class.js          Clase de cada entidad (formulario + validaciones)
│   └── <entidad>_tests.js          Definición de tests y pruebas de cada entidad
│
├── Base/css/IU.css                 Estilos
│
├── Core/
│   ├── Validations_Class.js        Validaciones atómicas (min_size, max_size, format, ficheros...)
│   ├── Dom_Class.js                Utilidades de DOM (mostrar errores, crear elementos)
│   ├── Dom_table_Class.js          Pintado de tablas de datos
│   └── ExternalAccess_class.js     Peticiones al back (peticionBackGeneral)
│
├── Test/
│   ├── Unit/                       Comprueba que cada clase tiene todos sus métodos de validación
│   └── Data/                       Ejecuta las pruebas definidas en <entidad>_tests.js
│
└── iconos/
```


## Cómo ejecutar

| Qué                                   | Cómo                                              |
|---------------------------------------|---------------------------------------------------|
| Aplicación                            | Abrir `index.html` y elegir la entidad en el menú |
| Test unitario (existen los métodos)   | Abrir `Test/Unit/index.html`                      |
| Test de datos (pruebas de cada campo) | Abrir `Test/Data/index.html` y elegir la entidad  |

En el test de datos cada fila indica `CORRECTO` o `INCORRECTO` (en rojo) según coincida el resultado de la validación con el esperado. En el test unitario `existe = false` indica un método de validación que falta.


## Cómo está construida cada entidad

Cada `app/<entidad>_Class.js` define una clase con:

- `constructor(esTest)`: propiedades `nombreentidad`, `columnasamostrar` y `mostrarespecial`. Si `esTest == 'test'` no se accede al back ni se pinta nada.
- `manual_form_creation()`: formulario con `id` y `name` por campo, y para cada uno los elementos `span_error_<campo>` y `error_<campo>`.
- `ADD_<campo>_validation()`, `EDIT_<campo>_validation()` y `SEARCH_<campo>_validation()` por cada campo.
- `ADD_submit_<entidad>()`, `EDIT_submit_<entidad>()` y `SEARCH_submit_<entidad>()`.
- `createForm_ADD/EDIT/DELETE/SHOWCURRENT/SEARCH` y `SEARCH()` (petición al back).

Cada método de validación sigue el mismo orden: `min_size` → `max_size` → `format` → validación personalizada. Si falla, muestra el error con `mostrar_error_campo` y **devuelve el código de error**. Si todo es correcto, llama a `mostrar_exito_campo` y devuelve `true`.

## Convenciones del grupo

### Nombres

- Fichero de entidad: `app/<entidad>_Class.js`. Fichero de pruebas: `app/<entidad>_tests.js`.
- Variables globales: `<entidad>_def_tests` y `<entidad>_pruebas`.
- `nombreentidad` es el nombre de la tabla, igual que el nombre de la clase y que el prefijo de las variables de test.
- Código de error: `<campo>_<validacion>_ko`, por ejemplo `nombre_accion_min_size_ko`. Resultado correcto: `true`.
- El texto que devuelve la clase es **exactamente** el que aparece como resultado esperado en `_def_tests` y `_pruebas`.

### Estructura de los tests

`<entidad>_def_tests`: `[entidad, campo, elemento, nº test, descripción, validación atómica, acción, resultado esperado, mensaje]`

`<entidad>_pruebas`: `[entidad, campo, nº test, nº prueba, acción, {valores}, resultado esperado]`

- Los números de test y de prueba son secuenciales desde 1.
- Cada prueba apunta a un test de su mismo campo y acción, y su resultado esperado coincide con el del test.
- Para cada restricción: una prueba que falla justo fuera del límite y una que pasa justo en el límite.

### Campos de fichero (`foto_persona`)

- El campo de los tests de fichero es `nuevo_foto_persona` (el `input file`). `foto_persona` es el campo de texto que muestra el fichero actual.
- Objeto de prueba: `{nuevo_foto_persona: {format_name_file: 'foto.jpg', type_file: 'image/jpeg', max_size_file: 2097153}}`. `max_size_file` es el tamaño en bytes del fichero simulado.
- Tamaño máximo: 2 MB = 2097152 bytes.

### Expresiones regulares

Siempre ancladas con `^...$`. Se usa `*` y no `+` para que SEARCH admita el campo vacío; el mínimo lo controla `min_size`.

`L` = `A-Za-zñÑáéíóúÁÉÍÓÚüÜ`

| Campo | ADD / EDIT | SEARCH |
|---|---|---|
| id numérico | `^[0-9]*$` | igual |
| nombre_accion, nombre_funcionalidad, rol_name | `^[L]*$` | igual |
| descripciones | `^[L .,;:¿?¡!()\[\]\-"'…]*$` | igual |
| usuario, contrasena | `^[A-Za-z]*$` | igual |
| dni | `^[0-9]{8}[A-Z]$` | `^[0-9A-Za-z]*$` |
| nombre_persona, apellidos_persona | `^[L.\- ]*$` | igual |
| fechaNacimiento_persona | `^(0[1-9]\|[12][0-9]\|3[01])/(0[1-9]\|1[0-2])/[0-9]{4}$` | `^[0-9/]*$` |
| direccion_persona | `^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚüÜ.\-; /]*$` | igual |
| telefono_persona | `^[0-9]{9}$` | `^[0-9]*$` |
| email_persona | `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$` | `^[A-Za-z0-9@._-]*$` |
| nombre del fichero de foto | `^[a-zA-Z.]*$` | igual |

### Validaciones personalizadas

| Entidad | Campo | Qué comprueba |
|---|---|---|
| persona, usuario | dni | La letra coincide con el cálculo oficial (número mod 23) |
| persona | fechaNacimiento_persona | La fecha existe en el calendario |
| persona | fechaNacimiento_persona | La fecha no es posterior a hoy |
| persona | telefono_persona | Empieza por 6, 7, 8 o 9 |

## Decisiones de diseño

| Tema | Decisión |
|---|---|
| Acentos y ñ en nombres | `indicados en el test de cada clase` |
| Espacios en nombres de acción, funcionalidad y rol | No se admiten. Solo en descripciones. |
| Dígitos en descripciones | No se admiten |
| Formato de fecha | `[dd/mm/aaaa y también d/m/aaaa]` |
| Nombre del fichero de foto | `mínimo 3 y máximo 15 caracteres, sin contar extensión]` |
| EDIT de `dni` en `usuario` | `no editable (PK) ` |

## Estado

| Entidad                   | Clase      | Tests ET1     | Pruebas Test/Data | Unit Test  |
|---------------------------|------------|---------------|-------------------|------------|
| accion                    | En proceso | Realizado     | Realizado         | Realizado  |
| funcionalidad             | Pendiente  | Realizado     | Pendiente         | Pendiente  |
| funcionalidad_accion      | En proceso | Realizado     | Pendiente         | Realizado  |
| persona                   | En proceso | Realizado     | Realizado         | En proceso |
| rol                       | En proceso | Realizado     | Realizado         | Realizado  |
| rolaccionfuncionalidad    | Pendiente  | Realizado     | Realizado         | Pendiente  |
| usuario                   | En proceso | Realizado     | Realizado         | Realizado  |

## Añadir una entidad nueva

1. Crear `app/<entidad>_Class.js` y `app/<entidad>_tests.js`.
2. En `index.html`: incluir el script de la clase y añadir la opción de menú `entidad = new <entidad>();`.
3. En `Test/Unit/index.html`: incluir el script de la clase y añadir la opción de menú.
4. En `Test/Unit/Unit_Test_Class.js`: añadir la entidad y la lista completa de sus atributos al array `clases`, con el nombre exacto de cada campo (respetando mayúsculas, por ejemplo `fechaNacimiento_persona`).
5. En `Test/Data/index.html`: incluir el script de la clase, el de `<entidad>_tests.js` y la opción de menú `new Data_Test(<entidad>)`.

El test unitario busca `ADD_`, `EDIT_` y `SEARCH_` para **todos** los atributos. Si una acción no se usa para un campo, se deja un método que devuelve `true`.

## Cambios respecto a la plantilla de `persona` que se deben hacer de la Semana 4

- `ADD_submit_<entidad>` ejecuta todas las validaciones y comprueba que todas devuelven `true`, para que se muestren todos los errores a la vez.
- Todas las expresiones regulares van ancladas (`^...$`), incluidas las de EDIT.
- El tamaño máximo de foto es 2 MB (2097152 bytes).
- `Validations_Class.js` admite `TEXTAREA` en `min_size` y `max_size`, y además tiene validaciones de longitud del nombre de fichero.
- `Test/Data/Data_Test_Class.js` crea también elementos para `textarea` y `select`.
- `crearTablaDatos` comprueba `mostrarespecial.length > 0`.
