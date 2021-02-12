export default function validarCrearCuenta(valores) {
    let errores = {};

    //validar el nombre de usuario
    if(!valores.nombre) {
        errores.nombre = 'Name is required';
    } 

    //validar el email
    if(!valores.email) {
        errores.email = 'Email is required';
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
        errores.email = 'Invalid email';
    }

    //validar el password
    if(!valores.password) {
        errores.password = 'Password is required';
    } else if( valores.password.length < 6 ) {
        errores.password = 'Password must be at least 6 characters';
    }

    return errores;
}