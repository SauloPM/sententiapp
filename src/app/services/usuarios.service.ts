import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Almacenamiento local
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private angularFirestore: AngularFirestore, private storage: Storage ) {}

  // ───────────────────── //
  //     LOCAL STORAGE     //
  // ───────────────────── //

  async getUsuarioID() {

    const usuarioID = await this.storage.get( 'usuarioID' );

    return usuarioID ? usuarioID : '-1';
  }

  guardarUsuarioEnLocalStorage( usuarioID: string ) {

    this.storage.set( 'usuarioID', usuarioID );
  }

  async checkAceptacionDeCondiciones() {

    const aceptarCondiciones = await this.storage.get( 'aceptarCondiciones' );

    return aceptarCondiciones ? true : false;
  }

  guardarAceptacionDeCondicionesEnLocalStorage() {

    this.storage.set( 'aceptarCondiciones', 'true' );
  }

  // ───────────────── //
  //     FIRESTORE     //
  // ───────────────── //

  async crearUsuario() {

    let fecha = new Date();

    // Creamos un nuevo documento en la colección de usuarios de Firestore y luego almacenamos el ID del usuario en el local storage
    await this.angularFirestore.collection( 'usuarios' ).add({ fecha: fecha.getFullYear() }).then( documento => this.guardarUsuarioEnLocalStorage( documento.id ));
  }

  actualizarUsuario( usuarioID: string, fecha: Date ) {
    this.angularFirestore.collection( 'usuarios' ).doc( usuarioID ).update({
      fecha: fecha.getFullYear()
    });
  }

  eliminarUsuario( usuarioID: string ) {
    this.angularFirestore.collection( 'usuarios' ).doc( usuarioID ).delete();
  }
}
