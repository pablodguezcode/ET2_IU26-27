/**
 * clase para refactorizar los metodos existentes en Validations. NO se pueden crear metodos nuevos.
 *
 * Se refactorizan min_size() y max_size() (misma definicion) para que, ademas de los input de texto,
 * comprueben el tamano del valor de los campos del formulario de las entidades que son de tipo
 * password (usuario.contrasena), textarea (direcciones y descripciones) o select (claves foraneas).
 * Para un input file no se comprueba nada (devuelven undefined, igual que en Validations).
 */
class entity_validations extends Validations{
    constructor(){
        super();
    }

    //min_size()
    //@param id Id objeto dom
    //@param minsize tamano minimo a validar
    min_size(id, minsize){
        let elemento = document.getElementById(id);
        switch (elemento.tagName){
            case 'INPUT':
                switch (elemento.type){
                    case 'number':
                    case 'email':
                    case 'text':
                    case 'password':
                        return elemento.value.length >= minsize;
                    case 'file':
                        break;
                    default:
                        break;
                }
                break;
            case 'TEXTAREA':
                return elemento.value.length >= minsize;
            case 'SELECT':
                return elemento.value.length >= minsize;
            default:
                break;
        }
    }

    //max_size()
    //@param id Id objeto dom
    //@param maxsize tamano maximo a validar
    max_size(id, maxsize){
        let elemento = document.getElementById(id);
        switch (elemento.tagName){
            case 'INPUT':
                switch (elemento.type){
                    case 'number':
                    case 'email':
                    case 'text':
                    case 'password':
                        return elemento.value.length <= maxsize;
                    case 'file':
                        break;
                    default:
                        break;
                }
                break;
            case 'TEXTAREA':
                return elemento.value.length <= maxsize;
            case 'SELECT':
                return elemento.value.length <= maxsize;
            default:
                break;
        }
    }
}
