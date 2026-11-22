/**
 * @file Refactorización de `Validations`: validación del tamaño de los campos de formulario.
 */

/**
 * clase para refactorizar los metodos existentes en Validations. NO se pueden crear metodos nuevos.
 *
 * Se refactorizan min_size() y max_size() (misma definicion) para que, ademas de los input de texto,
 * comprueben el tamano del valor de los campos del formulario de las entidades que son de tipo
 * password (usuario.contrasena), textarea (direcciones y descripciones) o select (claves foraneas).
 * Para un input file no se comprueba nada (devuelven undefined, igual que en Validations).
 *
 * @extends Validations
 */
class entity_validations extends Validations{
    /**
     * Crea el objeto de validaciones llamando al constructor de la clase base.
     */
    constructor(){
        super();
    }

    /**
     * Refactorización de `min_size()` con la misma definición: comprueba que el valor del campo tiene al menos `minsize` caracteres. Además de los input de texto (`number`, `email`, `text` y `password`) admite `textarea` y `select`. Con un input de tipo `file` no comprueba nada.
     *
     * @override
     * @param {string} id id del objeto del DOM
     * @param {number} minsize tamaño mínimo a validar
     * @returns {(boolean|undefined)} `true` si el valor alcanza el tamaño mínimo, `false` si no; `undefined` si el elemento no es de un tipo que se compruebe
     */
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

    /**
     * Refactorización de `max_size()` con la misma definición: comprueba que el valor del campo no supera `maxsize` caracteres. Además de los input de texto (`number`, `email`, `text` y `password`) admite `textarea` y `select`. Con un input de tipo `file` no comprueba nada.
     *
     * @override
     * @param {string} id id del objeto del DOM
     * @param {number} maxsize tamaño máximo a validar
     * @returns {(boolean|undefined)} `true` si el valor no supera el tamaño máximo, `false` si lo supera; `undefined` si el elemento no es de un tipo que se compruebe
     */
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
