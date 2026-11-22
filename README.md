# Interfaces de Usuario · ET2

Gestión de entidades en el **front-end** con JavaScript puro: tablas de tuplas, formularios modales, validación de campos y de envío, soporte multi-idioma (ES/EN) y una batería de pruebas automáticas ejecutable desde la propia interfaz.

Proyecto de grupo (**IU262703**) de la asignatura *Interfaces de Usuario*, curso 2026-2027.

---

## Qué incluye

- **Tabla de tuplas** por entidad, con selector múltiple de columnas visibles y formato especial para ciertos atributos (enlaces a ficheros, nombres en lugar de identificadores…).
- **Formularios modales** para ADD, SEARCH, EDIT, DELETE y SHOWCURRENT, siempre con las opciones de enviar y cancelar. Todas las acciones se representan con iconos.
- **Validación en el momento de la introducción** de cada campo, con indicación visual (correcto/incorrecto) y mensajes de error que no entorpecen la interacción. Al enviar se validan todos los campos a la vez.
- **Gestión de errores del servidor** mediante un modal de confirmación; tras aceptarlo, el formulario sigue como estaba para corregir el dato.
- **Subida de ficheros** con validación de existencia, tipo, tamaño y nombre.
- **Pruebas de datos integradas**: el icono TEST ejecuta los tests de la entidad y muestra el resultado en una ventana nueva.
- **Multi-idioma** español/inglés con cambio en caliente.

---

## Estado del proyecto

| Entidad | Clase | ADD | EDIT / DELETE / SHOWCURRENT / SEARCH | Tests de datos |
| --- | --- | --- | --- | --- |
| `persona` | Hecha | Hecho | Pendiente | 107 tests · 240 pruebas |
| `usuario` | Hecha | Hecho | Hecho | 43 tests · 50 pruebas |
| `rol` | Hecha | Hecho | Hecho salvo DELETE | 33 tests · 82 pruebas |
| `accion` | Hecha | Hecho | Hecho salvo DELETE | 33 tests · 79 pruebas |
| `funcionalidad_accion` | Hecha | Hecho (casilla) | Hecho | 22 tests · 22 pruebas |
| `funcionalidad` | Pendiente | Pendiente | Pendiente | 33 tests · 60 pruebas |
| `rolaccionfuncionalidad` | Pendiente | Pendiente | Pendiente | 33 tests · 42 pruebas |

Las validaciones de campo y de envío (`ADD_`, `EDIT_`, `SEARCH_`) están implementadas en las cinco entidades con clase. `funcionalidad_accion` se presenta como una **matriz** funcionalidades × acciones: marcar una casilla crea la pareja y desmarcarla la elimina.

---

## Cómo ejecutarlo

1. Clonar el repositorio y abrir `index.html` en el navegador (mejor desde un servidor local, por ejemplo `python3 -m http.server`).
2. Elegir la entidad en el menú.
3. En la cabecera de cada entidad están los iconos **ADD**, **SEARCH** y **TEST**, y a la derecha el selector de columnas visibles.
4. **TEST** abre una ventana nueva con el resultado de las pruebas (hay que permitir ventanas emergentes). Cada fila indica `CORRECTO` o `INCORRECTO`.
5. El idioma se cambia con las banderas de la cabecera.

> **Servidor:** listar, crear, editar o borrar tuplas requiere el servidor de la asignatura, configurado en `Core/ExternalAccess_class.js`, y puede no estar disponible fuera de la red de la universidad. **Los tests de datos no usan el servidor** y funcionan siempre.

---

## Estructura

```
├── index.html                       Menú, tabla, div modal del formulario y modal de error
├── Base/
│   ├── AbstractEntidad_Class.js     ADD(), SEARCH(), EDIT(), DELETE(), crearTablaDatos()…
│   └── css/                         Estilos de los elementos modales
├── Core/                            Validations, Dom, Dom_form, Dom_table, Dom_fields,
│                                    ExternalAccess y Data_Test
├── locale/idioma.js                 setLang()
├── iconos/                          Iconos de las acciones
└── app/                             Código desarrollado por el grupo
    ├── ET2_IU262703.js              Datos de la entrega
    ├── Textos_ES.js · Textos_EN.js  Textos multi-idioma
    ├── Entity_Dom_fields_Class.js   Extiende dom_fields
    ├── Entity_Validations_Class.js  Extiende Validations
    ├── Entity_Test_Data_Class.js    Extiende Data_Test
    ├── persona/                     persona_Class.js · persona_tests.js
    ├── usuario/                     usuario_Class.js · usuario_tests.js
    ├── rol/                         rol_Class.js · rol_tests.js
    ├── accion/                      accion_Class.js · accion_tests.js
    ├── funcionalidad_accion/        funcionalidad_accion_Class.js · funcionalidad_accion_tests.js
    ├── funcionalidad/               funcionalidad_tests.js
    └── rolaccionfuncionalidad/      rolaccionfuncionalidad_tests.js
```

**Autoría:** el código del grupo está únicamente en `app/`. `index.html`, `Core/`, `Base/`, `locale/` e `iconos/` forman la arquitectura proporcionada por el profesorado de la asignatura y se utilizan sin modificaciones.

---

## Cómo funciona una entidad

Cada `app/<entidad>/<entidad>_Class.js` define una clase con el nombre de la entidad que hereda de `AbstractEntidad`:

```js
class persona extends AbstractEntidad {
  constructor(esTest = null) {
    super();
    this.columnasamostrar = [...];   // atributos visibles al inicio en la tabla
    this.mostrarespecial  = [...];   // atributos cuyo valor se transforma al mostrarlo
    this.nombreentidad    = 'persona';
    this.dom              = new entity_dom_fields();
    this.validations      = new entity_validations();
    this.access_functions = new ExternalAccess();
  }
}
```

Si `esTest == 'test'`, el constructor no toca la página ni el servidor (así lo instancia `Data_Test`).

| Elemento | Descripción |
| --- | --- |
| `manual_form_creation()` | HTML del formulario: un campo por atributo con su `label`, y los elementos de mensaje de error. |
| `ACCION_<campo>_validation()` | Valida un campo. Devuelve `true` o el **código de error** (`<campo>_<validacion>_ko`) y marca el campo en rojo o verde. |
| `ACCION_submit_<entidad>()` | Ejecuta todas las validaciones del formulario y devuelve `true` o un objeto `{campo: true \| código}`. |
| `createForm_ACCION()` | Prepara el formulario en el modal: título, validaciones, campos visibles u ocultos y botón de envío con icono. |
| `ACCION()` | Petición al servidor (`ADD()`, `SEARCH()`, `EDIT()`, `DELETE()`), proporcionada por `AbstractEntidad`. |
| `mostrarcambioatributo()` | Formato especial en la tabla para los atributos de `mostrarespecial`. |
| `personalize_<atributo>()` | Validación propia cuando las estándar no bastan. |

### Flujo de un ADD

1. El icono ADD llama a `createForm_ADD()`, que rellena y muestra el modal.
2. Al salir de cada campo se ejecuta su validación.
3. Al enviar, `ADD_submit_<entidad>()` valida todos los campos; si alguno falla, no se envía nada y se ven todos los errores a la vez.
4. Si todo es correcto, `ADD()` envía el formulario. Con éxito, el formulario desaparece y la tabla se actualiza. Con error, aparece un modal de confirmación y el formulario se mantiene con sus valores.
5. El icono BACK cancela la acción.

### Selects alimentados desde el servidor

`usuario.id_rol` y los dos campos de `funcionalidad_accion` se cargan desde el servidor. Su primera opción es vacía: en ADD y EDIT hace fallar `min_size` si no se elige nada (campo obligatorio) y en SEARCH significa «sin filtro».

---

## Convenciones

| Qué | Nombre |
| --- | --- |
| Fichero de clase | `<entidad>_Class.js` |
| Fichero de tests | `<entidad>_tests.js` |
| Variables de test | `<entidad>_def_tests` y `<entidad>_pruebas` |
| Preparar formulario | `createForm_ACCION` |
| Validar campo / envío | `ACCION_campo_validation()` · `ACCION_submit_ENTIDAD()` |
| Validación propia | `personalize_<atributo>()` |
| Código de error | `<campo>_<validacion>_ko` |
| Mensaje de error | `span_error_<campo>` y `error_<campo>` |

Todos los ficheros de `app/` están en **UTF-8**.

---

## Validaciones por entidad

Las expresiones regulares están siempre ancladas (`^…$`). En SEARCH no hay tamaño mínimo (vacío significa «sin filtro»), pero sí máximo y formato.

**persona**

| Campo | Tamaño | Formato |
| --- | --- | --- |
| `dni` | 9 | 8 dígitos y letra mayúscula; la letra cumple el cálculo (número mod 23) |
| `nombre_persona` | 2–45 | Letras (con ñ y acentos), `.`, `-` y espacios |
| `apellidos_persona` | 3–100 | Igual que el nombre |
| `fechaNacimiento_persona` | 8–10 | `dd/mm/aaaa`; debe existir y no ser futura |
| `direccion_persona` | 10–200 | Letras, números, `.`, `-`, `;`, `/` y espacios |
| `telefono_persona` | 9 | 9 dígitos; el primero 6, 7, 8 o 9 |
| `email_persona` | 6–45 | `usuario@dominio.ext` |
| `foto_persona` | 5–15 | Letras y punto; extensión `.jpg` o `.jpeg` |

**usuario**

| Campo | Tamaño | Formato |
| --- | --- | --- |
| `dni` | 9 | Igual que en persona |
| `usuario` | 5–45 | Solo letras A-Z a-z |
| `contrasena` | 8–45 | Solo letras A-Z a-z; no aparece en SEARCH, DELETE ni SHOWCURRENT |
| `id_rol` | 1–11 | Dígitos (select) |

**rol y accion**

| Entidad | Campo | Tamaño | Formato |
| --- | --- | --- | --- |
| `rol` | `rol_name` | 5–48 | Letras, sin espacios |
| `rol` | `rol_description` | 5–200 | Letras, espacios y puntuación; sin números |
| `accion` | `nombre_accion` | 5–48 | Letras, sin espacios |
| `accion` | `descrip_accion` | 5–200 | Letras, espacios y puntuación; sin números |

Los identificadores de `rol` y `accion` son autoincrementales: no aparecen en ADD, EDIT ni SEARCH. En EDIT van ocultos, porque el servidor los usa para identificar la tupla.

**funcionalidad_accion:** dos selects (`id_funcionalidad`, `id_accion`) que forman la clave primaria compuesta; 1–11 dígitos.

### Campos de fichero (`persona.foto_persona`)

| Elemento | ADD | EDIT | DELETE · SHOWCURRENT | SEARCH |
| --- | --- | --- | --- | --- |
| `foto_persona` (texto) | oculto | solo lectura | solo lectura | editable |
| `nuevo_foto_persona` (fichero) | visible | visible | oculto | oculto |
| `link_foto_persona` (enlace) | oculto | visible | visible | oculto |

El fichero debe existir (en ADD), ser `image/jpeg`, pesar como máximo 2 MB y tener nombre `^[a-zA-Z.]{5,15}$`.

---

## Tests y pruebas

Cada `app/<entidad>/<entidad>_tests.js` define dos variables:

- **`<entidad>_def_tests`**: definición de cada test: `[entidad, campo, elemento, nº test, descripción, validación, acción, resultado esperado, mensaje]`.
- **`<entidad>_pruebas`**: valores concretos con los que se ejecuta cada test: `[entidad, campo, nº test, nº prueba, acción, {valores}, resultado esperado]`.

Criterios de diseño:

- Para cada restricción hay una prueba que falla justo fuera del límite y otra que pasa justo en él.
- El resultado esperado de cada prueba coincide con el de su test.
- Un test de campo debe ser atómico y determinista, por eso no se prueba la unicidad de `usuario` y `dni`, que depende de los datos del servidor.

El icono **TEST** instancia `entity_Test_Data`, que crea los elementos de prueba, llama a `ACCION_campo_validation()` y compara con lo esperado. Antes vacía el formulario real para que no choquen los `id` y al terminar lo restaura.

---

## Multi-idioma

- `Textos_ES.js` (`textos_ES`) y `Textos_EN.js` (`textos_EN`) contienen pares `"clave": "texto"` con las mismas claves.
- Cada clave se coloca como `class` del elemento donde se muestra el texto, y `setLang()` lo sustituye según el idioma activo.
- Un código de error tiene un único texto, igual para ADD, EDIT y SEARCH.
- Al añadir un campo o entidad hay que añadir sus claves en **los dos** ficheros.

---

## Limitaciones conocidas

- `persona`: EDIT, DELETE, SHOWCURRENT y SEARCH aún no tienen formulario. En `rol` y `accion` falta DELETE. `funcionalidad` y `rolaccionfuncionalidad` solo tienen definidos sus tests.
- Falta el test `nuevo_foto_persona_exist_file_ko` en ADD, aunque la validación existe.
- El mensaje del test `fechaNacimiento_persona_personalized_ko` solo menciona que la fecha no existe, pero la validación también rechaza fechas futuras.
- `index.html` no declara charset: si el servidor no sirve UTF-8, los acentos pueden verse mal.
- `index.html` enlaza `funcionalidad_Class.js` y `rolaccionfuncionalidad_Class.js`; hasta que existan, esas opciones del menú no funcionan.

---

## Autores

- [@Miguel Ángel](https://github.com/miguiquintas2-oss)
- [@Federico](https://github.com/ElElectrico)
- [@Raúl](https://github.com/Raulete769)
- [@Pablo](https://github.com/pablodguezcode)

Grupo **IU262703**, asignatura *Interfaces de Usuario* (Uvigo, curso 2026-2027).

## Aviso

Trabajo académico. Todos los derechos reservados. No se permite su reutilización sin autorización de los autores.

La arquitectura base (`index.html`, `Core/`, `Base/`, `locale/`, `iconos/`) pertenece al profesorado de la asignatura y no está cubierta por este aviso.
