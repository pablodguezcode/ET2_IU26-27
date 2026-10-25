/**
 * clase para refactorizar los metodos de dom_fields que se consideren necesarios sin modificar su definicion y para inclusion de nuevos metodos
 */
class entity_dom_fields extends dom_fields{
    constructor(){
        super();
    }

    /**
     * Refactorizacion de crearElementoHtml(): mantiene la definicion y el comportamiento de dom_fields y anade la creacion de los
     * elementos de prueba de tipo select y textarea, que usan los campos de las entidades que no son input (id_rol, descrip_accion...).
     *
     * @param {string} contenedor id del componente donde se coloca el elemento
     * @param {string} tag html a crear
     * @param {string} nombrecampo name e id del tag html a crear
     * @param {object} valores objeto con los valores a colocar en el tag
     * @param {object} extra objeto opcional
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
     * Refactorizacion de abrirModalError(): mantiene la definicion. Coloca el codigo de error como class del mensaje
     * para que setLang() lo sustituya por su texto traducido. Si el codigo no tiene traduccion en el idioma activo no se
     * muestra solo el codigo en crudo: se muestra un texto generico traducido (text_error_back_generico) seguido del codigo
     * entre parentesis, para que el usuario entienda que ha fallado y se pueda identificar el error.
     *
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
     * Refactorizacion de showData(): mantiene la definicion y el comportamiento de dom_table y antes de dibujar la tabla quita del
     * contenedor la clase RECORDSET_VACIO. AbstractEntidad.SEARCH() la pone cuando una busqueda no devuelve datos y nunca la quita:
     * en la siguiente busqueda con resultados, setLang() (que sustituye el contenido de todo elemento cuya clase sea una clave de
     * traduccion) borraba la tabla recien dibujada y mostrarocultarcolumnas() fallaba al no encontrar sus columnas.
     *
     * @param {string} idcomponente id del componente donde se coloca la tabla
     * @param {object} test_result objeto iterable con los datos de cada fila
     * @param {object} marked objeto opcional con la informacion para cambiar el aspecto de una columna
     */
    showData(idcomponente, test_result, marked=null){
        document.getElementById(idcomponente).classList.remove('RECORDSET_VACIO');
        super.showData(idcomponente, test_result, marked);
    }

    crearSeleccionablecolumnas(columnasamostrar, atributos){
        document.getElementById('label_seleccioncolumnas').style.display = '';
        document.getElementById('seleccioncolumnas').style.display = '';
        super.crearSeleccionablecolumnas(columnasamostrar, atributos);
    }
}
