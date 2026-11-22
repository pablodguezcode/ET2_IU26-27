/**
 * @file Refactorización de los métodos de `dom_fields` que se consideran necesarios y métodos nuevos de acceso al DOM.
 */

/**
 * clase para refactorizar los metodos de dom_fields que se consideren necesarios sin modificar su definicion y para inclusion de nuevos metodos
 *
 * @extends dom_fields
 * @property {boolean} sin_boton_add `true` en las entidades sin icono ADD (las matrices): hace que `actualizar_boton_add()` lo oculte
 */
class entity_dom_fields extends dom_fields{
    /**
     * Crea el objeto y deja `sin_boton_add` a `false`, de modo que el icono ADD de index.html se muestra salvo que una entidad indique lo contrario.
     */
    constructor(){
        super();
        // true en las entidades que no tienen ADD (funcionalidad_accion): su icono ADD de index.html debe quedar oculto
        this.sin_boton_add = false;
    }

    /**
     * Refactorización de hide_element(): mantiene la definicion. Cuando se oculta el div del formulario (fin de un SEARCH, cancelar con BACK...)
     * deja el icono ADD de index.html como corresponde a la entidad: oculto en las que no tienen ADD (sin_boton_add) y visible en las demas.
     * Asi el icono ADD que oculta funcionalidad_accion se vuelve a mostrar al cambiar a otra entidad, sin tocar el codigo de cada entidad.
     *
     * @override
     * @param {string} id id del elemento a ocultar
     */
    hide_element(id){
        super.hide_element(id);
        if (id == 'Div_IU_form'){
            this.actualizar_boton_add();
        }
    }

    /**
     * Muestra u oculta el icono ADD de index.html segun sin_boton_add.
     */
    actualizar_boton_add(){
        var boton = document.getElementById('botonADD');
        if (boton != null){
            boton.style.display = this.sin_boton_add ? 'none' : '';
        }
    }

    /**
     * Refactorización de crearElementoHtml(): mantiene la definicion y el comportamiento de dom_fields y anade la creacion de los
     * elementos de prueba de tipo select y textarea, que usan los campos de las entidades que no son input (id_rol, descrip_accion...).
     *
     * @override
     * @param {string} contenedor id del componente donde se coloca el elemento
     * @param {string} tag html a crear
     * @param {string} nombrecampo name e id del tag html a crear
     * @param {Object} valores objeto con los valores a colocar en el tag
     * @param {Object} [extra=null] objeto opcional
     */
    crearElementoHtml(contenedor, tag, nombrecampo, valores, extra=null){

        var element;

        switch (tag){
            case 'select':
                // un select por cada valor de prueba, con una unica opcion (el valor de prueba) que queda seleccionada
                for (var clave in valores){
                    element = document.createElement('select');
                    element.id = clave;
                    element.name = clave;
                    var opcion = document.createElement('option');
                    opcion.value = valores[clave];
                    opcion.text = valores[clave];
                    element.append(opcion);
                    this.colocarelemento(element, contenedor);
                }
                break;
            case 'textarea':
                // un textarea por cada valor de prueba (el value de un textarea no es un atributo html, se asigna con .value)
                for (var clave in valores){
                    element = document.createElement('textarea');
                    element.id = clave;
                    element.name = clave;
                    element.value = valores[clave];
                    this.colocarelemento(element, contenedor);
                }
                break;
            default:
                super.crearElementoHtml(contenedor, tag, nombrecampo, valores, extra);
                break;
        }

    }

    /**
     * Refactorización de mostrar_error_campo(): mantiene la definicion. La definicion original solo AÑADE el codigo de error como class
     * del mensaje y nunca quita el anterior, y setLang() traduce todas las clases que encuentra (gana la ultima en el orden de Textos),
     * de modo que si un campo cambiaba de un error a otro (p.e. de dni_min_size_ko a dni_format_ko) seguia mostrando el primer mensaje.
     * Antes de mostrar el nuevo error se quitan los codigos de error anteriores del mensaje.
     *
     * @override
     * @param {string} id id del campo del formulario al que se muestra el error
     * @param {string} codigoerror codigo del error a mostrar para ese campo
     */
    mostrar_error_campo(id, codigoerror){
        var mensaje = document.getElementById('error_'+id);
        if (mensaje != null){
            mensaje.removeAttribute('class');
        }
        super.mostrar_error_campo(id, codigoerror);
    }

    /**
     * Refactorización de abrirModalError(): mantiene la definicion. Coloca el codigo de error como class del mensaje
     * para que setLang() lo sustituya por su texto traducido. Si el codigo no tiene traduccion en el idioma activo no se
     * muestra solo el codigo en crudo: se muestra un texto generico traducido (text_error_back_generico) seguido del codigo
     * entre parentesis, para que el usuario entienda que ha fallado y se pueda identificar el error.
     *
     * @override
     * @param {string} errorMsg codigo de error devuelto por el back
     */
    abrirModalError(errorMsg){
        document.getElementById('error_action_modal').style.display = 'block';
        document.getElementById('modal_action_overlay').style.display = 'block';
        var mensaje = document.getElementById('error_action_msg');
        var textos = window.traduccion;
        var traducido = (typeof textos === 'object' && textos !== null && Object.prototype.hasOwnProperty.call(textos, errorMsg));
        if (traducido || typeof textos !== 'object' || textos === null){
            mensaje.className = errorMsg;
            mensaje.innerHTML = errorMsg;
        }
        else{
            mensaje.removeAttribute('class');
            mensaje.innerHTML = '';
            var generico = document.createElement('span');
            generico.className = 'text_error_back_generico';
            mensaje.append(generico);
            if (errorMsg){
                var codigo = document.createElement('span');
                codigo.textContent = ' (' + errorMsg + ')';
                mensaje.append(codigo);
            }
        }
        setLang();
    }
    /**
     * Refactorización de showData(): mantiene la definicion y el comportamiento de dom_table y antes de dibujar la tabla quita del
     * contenedor la clase RECORDSET_VACIO. AbstractEntidad.SEARCH() la pone cuando una busqueda no devuelve datos y nunca la quita:
     * en la siguiente busqueda con resultados, setLang() (que sustituye el contenido de todo elemento cuya clase sea una clave de
     * traduccion) borraba la tabla recien dibujada y mostrarocultarcolumnas() fallaba al no encontrar sus columnas.
     *
     * @override
     * @param {string} idcomponente id del componente donde se coloca la tabla
     * @param {Object} test_result objeto iterable con los datos de cada fila
     * @param {Object} [marked=null] objeto opcional con la informacion para cambiar el aspecto de una columna
     */
    showData(idcomponente, test_result, marked=null){
        document.getElementById(idcomponente).classList.remove('RECORDSET_VACIO');
        if (test_result !== null && typeof test_result === 'object'){
            Object.values(test_result).forEach(fila => this.sanear_iconos_accion(fila));
        }
        super.showData(idcomponente, test_result, marked);
    }

    /**
     * AbstractEntidad.crearTablaDatos() (codigo oficial, no modificable) construye cada icono EDIT, DELETE y SHOWCURRENT como
     * <img ... onclick='entidad.createForm_ACCION({datos de la fila en JSON});'>, con el atributo entre comillas simples y los datos
     * de la fila sin escapar. Si algun valor de la fila lleva un apostrofo (p. ej. una descripcion "rol d'un gestor", que tambien
     * llega dentro de las claves foraneas, como id_rol en usuario), el apostrofo cierra el atributo antes de tiempo y el onclick
     * queda como codigo JavaScript roto ("Invalid or unexpected token"): los tres iconos de esa fila dejan de responder.
     * Este metodo reescribe el HTML de un icono con el atributo entre comillas dobles y los datos escapados (& y "), que el
     * navegador vuelve a convertir en los datos originales al ejecutar el onclick. Solo se reescribe un icono cuando sus datos llevan
     * un apostrofo (lo que rompe el onclick) o un & (que el navegador convertiria en otro caracter, p. ej. &amp; en &): cualquier otro
     * icono, es decir, la inmensa mayoria, queda byte a byte como lo genero AbstractEntidad, asi que ninguna entidad cambia su
     * comportamiento salvo en las filas que antes dejaban de responder.
     *
     * @param {Object} fila datos de una fila de la tabla, con las columnas EDIT, DELETE y SHOWCURRENT ya incluidas
     */
    sanear_iconos_accion(fila){
        if (fila === null || typeof fila !== 'object'){ return; }

        ['EDIT', 'DELETE', 'SHOWCURRENT'].forEach(accion => {
            var html = fila[accion];
            if (typeof html !== 'string'){ return; }

            var inicio = "onclick='entidad.createForm_" + accion + "(";
            var fin = ");'>";
            var desde = html.indexOf(inicio);
            var hasta = html.lastIndexOf(fin);
            // solo se toca el icono con la forma exacta que genera AbstractEntidad
            if (desde < 0 || hasta < desde + inicio.length || hasta + fin.length != html.length){ return; }

            var datos = html.substring(desde + inicio.length, hasta);
            if (datos.indexOf("'") < 0 && datos.indexOf('&') < 0){ return; }
            var escapado = datos.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            fila[accion] = html.substring(0, desde) + 'onclick="entidad.createForm_' + accion + '(' + escapado + ');">';
        });
    }

    /**
     * Refactorización de `crearSeleccionablecolumnas()`: vuelve a mostrar la etiqueta y el selector de columnas visibles (las entidades de tipo matriz los ocultan en su constructor) y después delega en la definición original.
     *
     * @override
     * @param {string[]} columnasamostrar columnas que se muestran en la tabla
     * @param {string[]} atributos nombres de los atributos de los datos recibidos del back
     */
    crearSeleccionablecolumnas(columnasamostrar, atributos){
        document.getElementById('label_seleccioncolumnas').style.display = '';
        document.getElementById('seleccioncolumnas').style.display = '';
        super.crearSeleccionablecolumnas(columnasamostrar, atributos);
    }
}
