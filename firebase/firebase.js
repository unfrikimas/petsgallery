import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
    }
    //Registra un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    //verificar usuario por correo
    async verificar(usuario) {
        this.auth.useDeviceLanguage()
        // const user = this.auth.currentUser 
        await usuario.sendEmailVerification()
            .then(function() {
                // Email sent.
            }).catch(function(error) {
                // An error happened.
                console.log(error)
            });
    }

    //Inicia sesion del usuario
    async login(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    //Inicia sesion con Google
    async loginGoogle() {
        var google = new app.auth.GoogleAuthProvider()
        return await this.auth.signInWithPopup(google);
    }

    //Inicia sesion con Facebook
    async loginFacebook() {
        var facebook = new app.auth.FacebookAuthProvider()
        return await this.auth.signInWithPopup(facebook);
    }

    //Cierra la sesion
    async cerrarSesion() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.log(error)
        }
    }

}

const firebase = new Firebase();
export default firebase;