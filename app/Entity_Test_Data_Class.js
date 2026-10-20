/**
 * clase para poder refactorizar los metodos que se considere adecuados manteniendo la definicion de los mismos y para inclusion de nuevos metodos
 *
 * Se invoca desde el icono TEST: new entity_Test_Data(eval(entidad.nombreentidad))
 * El resultado de las pruebas se presenta en una ventana nueva (no en el div IU_Test_result_nofile de index.html).
 */
class entity_Test_Data extends Data_Test{

    constructor(entidad){
        // Las pruebas crean sus propios campos con los mismos ids que el formulario de la entidad (dni, nombre_persona...).
        // Se vacia el contenedor del formulario antes de ejecutarlas para que el formulario real no interfiera con los campos de prueba.
        document.getElementById('contenedor_IU_form').innerHTML = '';
        super(entidad);
    }

    /**
     * Refactorizacion de data_test_class(): ejecuta las pruebas y presenta el resultado en una ventana nueva.
     * Al terminar se restaura el formulario vacio de la entidad en el que se apoyan las peticiones al back (SEARCH...).
     *
     * @returns {bool}
     */
    data_test_class(){

        // dom con la creacion de elementos de prueba select y textarea
        this.dom = new entity_dom_fields();

        var salidapruebas = this.data_test_data();

        // restaurar el formulario de la entidad
        document.getElementById('contenedor_IU_form').innerHTML = this.entidad.manual_form_creation();

        this.mostrar_resultado_ventana(salidapruebas);

        return true;
    }

    /**
     * Presenta en una ventana nueva la tabla con el resultado de las pruebas (INCORRECTO en rojo) y un resumen.
     *
     * @param {Array} salidapruebas resultado de data_test_data()
     */
    mostrar_resultado_ventana(salidapruebas){

        var textos = (getCookie('lang') == 'EN') ? textos_EN : textos_ES;
        var ventana = window.open('', '_blank');

        // el navegador ha bloqueado la ventana emergente
        if (ventana == null){
            this.dom.abrirModalError('test_ventana_bloqueada_ko');
            return;
        }

        const escapar = (valor) => String(valor)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        var incorrectas = salidapruebas.filter(prueba => prueba.pruebastatus == 'INCORRECTO').length;
        var titulo = textos['text_test_titulo'] + ' ' + this.entidad.nombreentidad;

        var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + escapar(titulo) + '</title>';
        html += '<style>body{font-family:sans-serif} table{border-collapse:collapse} th,td{border:1px solid black;padding:2px 6px;vertical-align:top}';
        html += ' .INCORRECTO{background-color:red} .CORRECTO{background-color:#c8f7c8}</style></head><body>';
        html += '<h2>' + escapar(titulo) + '</h2>';
        html += '<p>' + escapar(textos['text_test_total']) + ': ' + salidapruebas.length + ' &nbsp; ';
        html += escapar(textos['text_test_correctas']) + ': ' + (salidapruebas.length - incorrectas) + ' &nbsp; ';
        html += escapar(textos['text_test_incorrectas']) + ': ' + incorrectas + '</p>';
        html += '<table><thead><tr>';

        var columnas = (salidapruebas.length > 0) ? Object.keys(salidapruebas[0]) : [];
        for (var c of columnas){ html += '<th>' + escapar(c) + '</th>'; }
        html += '</tr></thead><tbody>';

        for (var prueba of salidapruebas){
            html += '<tr>';
            for (var c of columnas){
                // valorprueba ya viene con <br> para separar los valores de la prueba
                var contenido = (c == 'valorprueba') ? prueba[c] : escapar(prueba[c]);
                var clase = (c == 'pruebastatus') ? ' class="' + prueba[c] + '"' : '';
                html += '<td' + clase + '>' + contenido + '</td>';
            }
            html += '</tr>';
        }
        html += '</tbody></table></body></html>';

        ventana.document.open();
        ventana.document.write(html);
        ventana.document.close();
    }

}
