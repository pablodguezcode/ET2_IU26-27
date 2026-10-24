# Interfaces de Usuario · ET2

Gestión de entidades en el FRONT (tablas de tuplas, formularios modales, validaciones de campo y de submit, y pruebas automáticas de datos) para la asignatura **Interfaces de Usuario**, curso 2026-2027. Grupo **IU262703**.

El código desarrollado por el grupo está **únicamente en `app/`**. El resto de la arquitectura (`Core`, `Base`, `locale`, `css`, `iconos`, `index.html`) es la oficial del profesorado y no se modifica (ver [Qué se puede y qué no se puede modificar](#qué-se-puede-y-qué-no-se-puede-modificar)).

---

## Índice

1. [Estado de las entidades](#estado-de-las-entidades)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Qué se puede y qué no se puede modificar](#qué-se-puede-y-qué-no-se-puede-modificar)
4. [Cómo ejecutar](#cómo-ejecutar)
5. [Cómo funciona una entidad](#cómo-funciona-una-entidad)
6. [Convenciones de nombres](#convenciones-de-nombres)
7. [Restricciones y validaciones por entidad](#restricciones-y-validaciones-por-entidad)
8. [Campos de fichero](#campos-de-fichero)
9. [Tests y pruebas](#tests-y-pruebas)
10. [Multi-idioma](#multi-idioma)
11. [Clases genéricas de `app/`](#clases-genéricas-de-app)
12. [Limitaciones conocidas](#limitaciones-conocidas)
13. [Entrega](#entrega)

---

## Estado de las entidades

| Entidad                  | Clase                      | Formulario ADD | EDIT / DELETE / SHOWCURRENT / SEARCH | Tests ET1 (`_tests.js`) |
|--------------------------|----------------------------|----------------|--------------------------------------|--------------------------|
| `persona`                | Hecha                      | Hecho          | Pendiente (stub con `alert`)         | 107 tests · 240 pruebas  |
| `usuario`                | Hecha                      | Hecho          | Hecho                                | 43 tests · 50 pruebas    |
| `rol`                    | Hecha                      | Hecho          | Hecho salvo DELETE (stub con `alert`) | 33 tests · 82 pruebas    |
| `accion`                 | Hecha                      | Hecho          | Hecho salvo DELETE (stub con `alert`) | 33 tests · 79 pruebas    |
| `funcionalidad_accion`   | Hecha                      | Hecho          | Hecho                                | 22 tests · 22 pruebas    |
| `funcionalidad`          | Pendiente                  | Pendiente      | Pendiente                            | 33 tests · 60 pruebas    |
| `rolaccionfuncionalidad` | Pendiente                  | Pendiente      | Pendiente                            | 33 tests · 42 pruebas    |

Las validaciones `ADD_`, `EDIT_` y `SEARCH_` y sus submits **sí están implementadas en las cinco entidades hechas**. `usuario` y `funcionalidad_accion` están completas (todos los formularios: ADD, EDIT, DELETE, SHOWCURRENT y SEARCH). En `rol` y `accion` están hechos EDIT, SHOWCURRENT y SEARCH y solo falta `createForm_DELETE`; en `persona` lo pendiente son los `createForm_EDIT/DELETE/SHOWCURRENT/SEARCH`.

`index.html` (oficial) ya enlaza `funcionalidad_Class.js` y `rolaccionfuncionalidad_Class.js`. Mientras esos ficheros no existan, el navegador mostrará un 404 en consola y sus opciones de menú no funcionarán.

---

## Estructura del proyecto

```
ET2_IU262703/
├── index.html                       OFICIAL · menú, tabla, div modal del formulario, modal de error
├── Base/
│   ├── AbstractEntidad_Class.js     OFICIAL · ADD(), SEARCH(), EDIT(), DELETE(), crearTablaDatos()...
│   └── css/IU.css                   OFICIAL
├── Core/                            OFICIAL · Validations, Dom, Dom_form, Dom_fields, Dom_table,
│                                              ExternalAccess, Data_Test
├── locale/idioma.js                 OFICIAL · setLang()
├── iconos/                          OFICIAL
│
└── app/                             ← CÓDIGO DEL GRUPO (lo único que se entrega)
    ├── ET2_IU262703.js              Datos de entrega (alumnos, entrega, horas)
    ├── Textos_ES.js                 Variable textos_ES
    ├── Textos_EN.js                 Variable textos_EN
    ├── Entity_Dom_fields_Class.js   entity_dom_fields    (extiende dom_fields)
    ├── Entity_Validations_Class.js  entity_validations   (extiende Validations)
    ├── Entity_Test_Data_Class.js    entity_Test_Data     (extiende Data_Test)
    ├── persona/                     persona_Class.js · persona_tests.js
    ├── usuario/                     usuario_Class.js · usuario_tests.js
    ├── rol/                         rol_Class.js · rol_tests.js
    ├── accion/                      accion_Class.js · accion_tests.js
    ├── funcionalidad_accion/        funcionalidad_accion_Class.js · funcionalidad_accion_tests.js
    ├── funcionalidad/               funcionalidad_tests.js            (sin clase todavía)
    └── rolaccionfuncionalidad/      rolaccionfuncionalidad_tests.js   (sin clase todavía)
```

> Si se detecta un error en los ficheros oficiales, se comunica al profesorado; no se corrige en local. La evaluación se realiza con la arquitectura oficial más el directorio `app` del grupo.

---

## Qué se puede y qué no se puede modificar

Regla general: **todo lo que está en `index.html`, `Core/`, `Base/`, `locale/`, `css/` e `iconos/` es oficial y se usa sin modificaciones.** Solo se escribe código en `app/`. Si se detecta un error en un fichero oficial, se comunica al profesorado; no se corrige en local.

### Clases y ficheros oficiales (NO se modifican)

| Fichero / clase | Contenido | Cómo se adapta sin tocarlo |
|---|---|---|
| `index.html` | Menú de entidades, tabla, div modal del formulario (`form_iu`), modal de error. | Las entidades rellenan esos divs; no se añaden ni cambian ids ni scripts. |
| `Base/AbstractEntidad_Class.js` (`AbstractEntidad`) | Métodos comunes de gestión de entidades: `ADD()`, `SEARCH()`, `EDIT()`, `DELETE()`, `crearTablaDatos()`... Todas las entidades heredan de ella. | Cada `<entidad>_Class.js` hereda y aporta lo propio (`createForm_*`, validaciones, `mostrarcambioatributo()`...). |
| `Core/Validations_Class.js` (`Validations`) | Validaciones estándar: `exist_file()`, `min_size()`, `max_size()`, `format()`, `max_size_file()`, `type_file()`, `format_name_file()`. | Si no bastan, se amplía en `entity_validations` o se crea un `personalize_<atributo>()` en la entidad. |
| `Core/Dom_Class.js`, `Core/Dom_form_Class.js`, `Core/Dom_table_Class.js` | Métodos de manipulación del DOM (general, formularios y tabla). | Se usan tal cual desde las clases de entidad. |
| `Core/ExternalAccess.js` (`ExternalAccess`) | Acceso al back. | Se instancia en cada entidad (`this.access_functions`). |
| `Core/Data_Test` | Clase principal que valida los tests y pruebas definidos y muestra el resultado en una ventana nueva. | Se hereda desde `entity_Test_Data`. |
| `Core/Dom_fields_Class.js` (`dom_fields`) | Gestión de campos DOM del formulario. | Se hereda desde `entity_dom_fields`. **Sus métodos existentes no pueden cambiar de nombre.** |
| `locale/idioma.js` | Soporte multi-idioma: `setLang()`. | Se alimenta con `Textos_ES.js` y `Textos_EN.js`. |
| `css/` e `iconos/` | Estilos de los elementos modales e iconos de las acciones. | Solo se referencian; no se añaden iconos propios ni se editan estilos. |

### Clases y ficheros del grupo (SÍ se modifican, dentro de `app/`)

| Fichero / clase | Qué se puede hacer | Qué no se puede hacer |
|---|---|---|
| `app/<entidad>/<entidad>_Class.js` | Implementar `columnasamostrar`, `mostrarespecial`, `manual_form_creation()`, `createForm_*`, `ACCION_campo_validation()`, `ACCION_submit_ENTIDAD()`, `mostrarcambioatributo()` y `personalize_<atributo>()`. | Cambiar el nombre de la clase (debe coincidir con la entidad) ni los nombres de método fijados por el enunciado. No redefinir `ADD()`, `SEARCH()`, `EDIT()`, `DELETE()` salvo necesidad real. |
| `app/<entidad>/<entidad>_tests.js` | Definir `<entidad>_def_tests` y `<entidad>_pruebas` con el formato de la ET1. | Cambiar el nombre del fichero ni de las variables. |
| `app/Entity_Dom_fields_Class.js` (`entity_dom_fields`) | Sobrescribir métodos de `dom_fields` y añadir otros nuevos. | Renombrar métodos existentes de `dom_fields`. |
| `app/Entity_Validations_Class.js` (`entity_validations`) | Ampliar el comportamiento de las validaciones estándar (`min_size()` y `max_size()` admiten `password`, `textarea` y `select`). | Añadir métodos nuevos ni modificar `Validations`. Las validaciones propias van en la entidad con prefijo `personalize_`. |
| `app/Entity_Test_Data_Class.js` (`entity_Test_Data`) | Refactorizar métodos existentes de `Data_Test` o crear otros nuevos si se necesitan. | Dejar de heredar de `Data_Test` ni cambiar el nombre de la clase (el icono TEST la instancia con ese nombre). |
| `app/Textos_ES.js` y `app/Textos_EN.js` | Añadir claves (siempre en **los dos** ficheros). | Cambiar los nombres de las variables `textos_ES` y `textos_EN`. |
| `app/ET2_IU262703.js` | Completar los datos de entrega (alumno, entrega, horas). | Cambiar el formato `datosgenerales = { Lider: [...], ParticipanteN: [...] }`. |

Ante la duda: si el fichero está en `Core/`, `Base/`, `locale/`, `css/`, `iconos/` o es `index.html`, **no se toca**; si está en `app/`, se puede, respetando los nombres del enunciado.

---

## Cómo ejecutar

1. Colocar el directorio `app/` dentro de la arquitectura oficial (junto a `Core`, `Base`, `index.html`...).
2. Abrir `index.html` en el navegador y elegir la entidad en el menú.
3. Los iconos de la cabecera de la entidad son: **ADD**, **SEARCH** y **TEST**; a su derecha, el select múltiple de columnas visibles.
4. **TEST** ejecuta todas las pruebas de la entidad seleccionada y muestra el resultado en una **ventana nueva** (permitir ventanas emergentes para la página). Cada fila indica `CORRECTO` o `INCORRECTO` (en rojo).
5. El cambio de idioma se hace con las banderas de la cabecera (`ES` / `EN`).

El acceso al back es `http://193.147.87.202/ET2/index.php` (`Core/ExternalAccess_class.js`), por lo que hace falta conexión para listar y dar de alta tuplas. Los tests de datos no usan el back.

---

## Cómo funciona una entidad

Cada `app/<entidad>/<entidad>_Class.js` define una clase con el nombre de la entidad que **hereda de `AbstractEntidad`**:

```js
class persona extends AbstractEntidad {
	constructor(esTest=null){
		super();
		this.columnasamostrar = [...];   // atributos visibles al inicio en la tabla
		this.mostrarespecial  = [...];   // atributos cuyo valor se transforma al mostrarlo
		this.nombreentidad    = 'persona';
		this.dom              = new entity_dom_fields();
		this.validations      = new entity_validations();
		this.access_functions = new ExternalAccess();
		...
	}
}
```

Si `esTest == 'test'` el constructor no toca la página ni el back (así lo instancia `Data_Test`).

### Qué aporta cada parte

| Elemento | Descripción |
|---|---|
| `manual_form_creation()` | HTML del formulario (`form_iu`). Un campo por atributo con `id` y `name` igual al atributo, su `label_<campo>` y los elementos `span_error_<campo>` / `error_<campo>` para el mensaje de error. |
| `ACCION_<campo>_validation()` | Validación de un campo. Devuelve `true` o el **código de error** (`<campo>_<validacion>_ko`) y marca el campo (borde rojo/verde y mensaje). |
| `ACCION_submit_<entidad>()` | Ejecuta todas las validaciones del formulario. Devuelve `true` o un objeto `{campo: true \| codigo}`. Se enlaza con `dom.validarsubmit()` en el `onsubmit`. |
| `createForm_ACCION()` | Prepara el formulario en el div modal: título, `onsubmit`, `action`, validaciones por campo, campos visibles/ocultos y botón de submit con icono. |
| `ACCION()` | Petición al back (`ADD()`, `SEARCH()`, `EDIT()`, `DELETE()`). La proporciona `AbstractEntidad`. |
| `mostrarcambioatributo(atributo, valorentrada)` | Formato especial en la tabla para los atributos de `mostrarespecial`. |
| `personalize_<atributo>()` | Validación propia cuando no basta con `Validations`. |

### Flujo de un ADD

1. Clic en el icono ADD → `createForm_ADD()` rellena el modal y lo muestra.
2. Al salir de cada campo (`onblur`; `onchange` en `select` y `file`) se ejecuta su `ADD_<campo>_validation()`.
3. Al enviar, `ADD_submit_<entidad>()` valida **todos** los campos. Si alguno falla, no se envía nada y se ven todos los errores a la vez.
4. Si todo es correcto, `ADD()` envía el formulario al back:
   - **Correcto:** desaparece el formulario y se actualiza la tabla (`SEARCH()`).
   - **Error del back:** modal de error que el usuario debe cerrar. Después el formulario continúa como estaba, con sus valores, para corregir.
5. El icono BACK del modal cancela la acción.

### Atributos con formato especial en la tabla (`mostrarespecial`)

| Entidad | Atributo | Se muestra como |
|---|---|---|
| `persona` | `foto_persona` | Enlace al fichero en `http://193.147.87.202/ET2/filesuploaded/files_foto_persona/<fichero>` |
| `funcionalidad_accion` | `id_funcionalidad`, `id_accion` | `nombre_funcionalidad` y `nombre_accion` |

`AbstractEntidad.crearTablaDatos()` llama a `cambiarmostrarespecial(columna, valor)`; en cada entidad ese método delega en `mostrarcambioatributo()`.

### Campos `select` que se rellenan desde el back

- `usuario.id_rol` → `cargar_roles()`.
- `funcionalidad_accion.id_funcionalidad` e `id_accion` → `cargar_opciones()` / `cargar_select()`.

La primera opción de cada `select` es vacía: así `min_size` falla si no se elige nada (y en SEARCH equivale a "sin filtro"). Se cargan en `createForm_ADD()`.

---

## Convenciones de nombres

| Qué | Nombre |
|---|---|
| Directorio de entidad | `app/<entidad>/` |
| Fichero de clase | `<entidad>_Class.js` (la clase se llama como la entidad) |
| Fichero de tests | `<entidad>_tests.js` (el que carga `index.html`) |
| Variables de test | `<entidad>_def_tests` y `<entidad>_pruebas` |
| Preparar formulario | `createForm_ACCION` |
| Validar campo | `ACCION_campo_validation()` → `true` o código de error |
| Validar submit | `ACCION_submit_ENTIDAD()` → `true` u objeto con los resultados |
| Acción contra el back | `ACCION()` |
| Validación propia | `personalize_<atributo>()` |
| Código de error | `<campo>_<validacion>_ko` (p. ej. `nombre_accion_min_size_ko`) |
| Label | `label_<campo>` (id y/o class) |
| Mensaje de error | `span_error_<campo>` y `error_<campo>` |
| Clave de idioma | Se usa como `class` del elemento HTML donde se muestra el texto |

El texto que devuelve una validación es **exactamente** el código esperado en `<entidad>_def_tests` y `<entidad>_pruebas`.

**Codificación:** todos los ficheros de `app/` están en UTF-8 y los acentos y la ñ se escriben tal cual, sin escapes `\uXXXX`. `index.html` (oficial) no declara charset, así que en un servidor que no sirva UTF-8 los acentos pueden verse mal en pantalla. Las pruebas no se ven afectadas porque las expresiones regulares y los valores de prueba se leen igual. Al escribir expresiones regulares o valores de prueba con acentos, mantener el criterio de escribirlos en bruto en ambos sitios.

---

## Restricciones y validaciones por entidad

Las expresiones regulares van siempre ancladas (`^...$`). En SEARCH no hay tamaño mínimo (vacío = sin filtro) pero sí máximo y formato.

### persona

| Campo | Tamaño | Formato / comprobación |
|---|---|---|
| `dni` | 9 | 8 dígitos + letra mayúscula; la letra debe cumplir el cálculo (número mod 23). En SEARCH: dígitos y letras |
| `nombre_persona` | 2–45 | Letras (con ñ y acentos), `.`, `-` y espacios |
| `apellidos_persona` | 3–100 | Igual que el nombre |
| `fechaNacimiento_persona` | 8–10 | `dd/mm/aaaa` o `d/m/aaaa`; debe existir en el calendario y no ser posterior a hoy |
| `direccion_persona` (textarea) | 10–200 | Letras (con ñ y acentos), números, `.`, `-`, `;`, `/` y espacios |
| `telefono_persona` | 9 | 9 dígitos; el primero 6, 7, 8 o 9 |
| `email_persona` | 6–45 | `usuario@dominio.ext` |
| `foto_persona` | 5–15 | Letras y punto; extensión `.jpg` o `.jpeg` |

### usuario

| Campo | Tamaño | Formato / comprobación |
|---|---|---|
| `dni` | 9 | Igual que en persona |
| `usuario` | 5–45 | Solo letras A-Z a-z |
| `contrasena` (password) | 8–45 | Solo letras A-Z a-z. No se usa en SEARCH |
| `id_rol` (select) | 1–11 | Dígitos |

### rol · accion

| Entidad | Campo | Tamaño | Formato |
|---|---|---|---|
| `rol` | `id_rol` | 1–11 | Dígitos |
| `rol` | `rol_name` | 5–48 | Letras (con ñ y acentos), sin espacios |
| `rol` | `rol_description` (textarea) | 5–200 | Letras, espacios y puntuación; sin números |
| `accion` | `id_accion` | 1–11 | Dígitos |
| `accion` | `nombre_accion` | 5–48 | Letras (con ñ y acentos), sin espacios |
| `accion` | `descrip_accion` (textarea) | 5–200 | Letras, espacios y puntuación; sin números |

`id_rol` e `id_accion` son autoincrementales: el usuario no los introduce ni los conoce, así que **no aparecen en los formularios ADD, EDIT ni SEARCH** (ni se validan en sus submits). En EDIT el id va oculto y relleno, porque el back lo usa para identificar la tupla; en SHOWCURRENT sí se muestra, solo lectura. Sus validaciones `ADD_/EDIT_/SEARCH_<id>_validation()` se mantienen porque las pruebas de la ET1 las ejecutan. El SEARCH de `rol` y `accion` es parcial: no hay mínimo, vacío significa «sin filtro» y basta con escribir un trozo del valor.

### funcionalidad_accion

`id_funcionalidad` e `id_accion` son dos `select` (clave primaria compuesta y claves foráneas): 1–11 dígitos, obligatorios en ADD.

---

## Campos de fichero

Aplica a `persona.foto_persona` / `persona.nuevo_foto_persona`.

| Elemento | Tipo | ADD | EDIT | DELETE · SHOWCURRENT | SEARCH |
|---|---|---|---|---|---|
| `foto_persona` y `label_foto_persona` | `input text` | oculto | `readonly` | `readonly` | editable |
| `nuevo_foto_persona` y `label_nuevo_foto_persona` | `input file` | visible | visible | oculto | oculto |
| `link_foto_persona` | `a` con icono de fichero | oculto | visible | visible | oculto |

Restricciones de `nuevo_foto_persona`: debe existir (en ADD; en EDIT puede ir vacío), tipo `image/jpeg`, tamaño máximo **2 MB (2 097 152 bytes)** y nombre `^[a-zA-Z.]{5,15}$`.

---

## Tests y pruebas

Cada `app/<entidad>/<entidad>_tests.js` define dos variables.

**`<entidad>_def_tests`** · definición de los tests:

```
[entidad, campo, elemento, nº test, descripción, validación atómica, acción, resultado esperado, mensaje]
```

**`<entidad>_pruebas`** · valores concretos con los que se ejecuta cada test:

```
[entidad, campo, nº test, nº prueba, acción, {valores}, resultado esperado]
```

Criterios:

- Los números de test y de prueba son secuenciales desde 1.
- Cada prueba apunta a un test de su mismo campo y acción, y su resultado esperado coincide con el del test.
- Para cada restricción hay una prueba que falla justo fuera del límite y otra que pasa justo en el límite.
- El `elemento` indica qué se crea para la prueba: `input`, `file`, `select` o `textarea`.
- Para un campo `file` el objeto de valores es `{nuevo_foto_persona: {format_name_file: 'foto.jpg', type_file: 'image/jpeg', max_size_file: 2097153}}`, donde `max_size_file` es el tamaño en bytes del fichero simulado.

### Cómo se ejecutan

El icono **TEST** hace `new entity_Test_Data(eval(entidad.nombreentidad))`. `Data_Test` (oficial) crea cada elemento de prueba en el formulario, llama a `ACCION_campo_validation()` y compara con el resultado esperado. `entity_Test_Data` vacía antes el formulario real (para que no choquen los `id`), abre los resultados en una ventana nueva y al terminar restaura el formulario.

---

## Multi-idioma

- `app/Textos_ES.js` (`textos_ES`) y `app/Textos_EN.js` (`textos_EN`) son objetos `"clave": "texto"`. Ambos tienen las mismas claves.
- Cada clave se coloca como `class` del elemento HTML donde se usa, y `setLang()` sustituye su contenido por el texto del idioma activo.
- Tipos de clave: títulos generales (`text_titulo_*`), menú (`text_menu_<entidad>`), título de página (`text_titulo_page_<entidad>`), título de formulario (`text_contenido_titulo_form_<entidad>_<ACCION>`), atributos (cabecera de columna), `label_<campo>`, códigos de error de validación (`<campo>_<validacion>_ko`), errores del back (`RECORDSET_VACIO`, `dni_es_nulo_ko`, `dni_EXISTE_en_persona_KO`...) y textos de la ventana de test (`text_test_*`).
- **Un código de error tiene un solo texto**, igual para ADD, EDIT y SEARCH.

Al añadir un campo o entidad nueva hay que añadir sus claves en **los dos** ficheros.

---

## Clases genéricas de `app/`

| Clase | Hereda de | Qué hace | Modificación permitida |
|---|---|---|---|
| `entity_validations` | `Validations` | `min_size()` y `max_size()` admiten además `password`, `textarea` y `select`. No se pueden añadir métodos nuevos. | Solo ampliar el comportamiento de los métodos estándar. `Validations` (oficial) no se toca. |
| `entity_dom_fields` | `dom_fields` | `crearElementoHtml()` crea también `select` y `textarea` de prueba. `abrirModalError()` pone el código como `class` para que `setLang()` lo traduzca. | Sobrescribir y añadir métodos; no renombrar los existentes. `dom_fields` (oficial) no se toca. |
| `entity_Test_Data` | `Data_Test` | Ejecuta las pruebas y las muestra en una ventana nueva; evita que el formulario real interfiera. | Refactorizar métodos existentes o crear nuevos. `Data_Test` (oficial) no se toca. |

---

## Limitaciones conocidas

- En `persona`, EDIT, DELETE, SHOWCURRENT y SEARCH muestran un `alert` hasta que se implementen sus `createForm_*`; en `rol` y `accion` solo DELETE.
- Falta el test (y su prueba) `nuevo_foto_persona_exist_file_ko` en ADD, aunque la validación existe.
- El mensaje del test de `fechaNacimiento_persona_personalized_ko` solo menciona "no existe en el calendario", pero la validación también rechaza fechas futuras.
- `AbstractEntidad` (oficial) escribe el JSON de la fila en el `onclick` de los iconos de la tabla con comillas simples; un dato con `'` rompería ese icono.
- Las popups deben estar permitidas para ver el resultado del TEST; si se bloquean se muestra un mensaje de error.

---

## Entrega

1. Crear el directorio `ET2_IU262703`.
2. Meter dentro **solo** el directorio `app/` con todo el código y los ficheros pedidos.
3. Comprobar `app/ET2_IU262703.js`: para cada participante, nombre (`ApellidosNombre`), entrega y horas dedicadas.
4. Comprimir `ET2_IU262703` como **`ET2_IU262703.rar`**.
5. Subirlo a la tarea **Entrega ET2** de Moovi **antes del viernes 6 de noviembre a las 23:59**.

Requisitos obligatorios (si falta alguno, la nota es 0): ficheros con el nombre, formato y tipo indicados; directorio con el nombre indicado; horas dedicadas indicadas por cada alumno.