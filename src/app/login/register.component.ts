import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import * as swal from 'sweetalert'; // importamos esto para los popups de alertas.

//Importacion de servicios.
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';



declare function init_plugins(); //Esta funcion existe en custom.js
//como yo se q existe se puede declarar de esta manera y la usamos en el ngOnInit  
//Con el declare se puede llamar a cualquier script q se encuentre fuera de angular

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router:Router) { }

  //Funcion para q los passwords sean iguales.
  sonIguales( campo1: string, campo2: string){

    // tengo q retornar un FormGroup para q sea valida usar en los validators: 'this.sonIguales..'
    return ( group: FormGroup ) => {

      //Obtengo el value de los campos q paso por parametro
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ){
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    init_plugins();

    // Necesito configurar esta forma y los campos o propiedades son los q necesito manejar dsd el html,
    // osea todos los campos q tengo en el html q quiero controlar d esta forma. (nombre, email, password..)
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required),// Primero ponemos el valor q queremos q tenga por defecto, en este caso nada por eso ponemos null, luego las validaciones.
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false ), // el valor por defecto es false es porq las dejo como opcionales,no va a ser requerido porq vamos a hacer q cuando alguien haga un envio de formulario va a aprecer un popup que diga q no se puede continuar si no esta d acuerdo con los terminos.
    }, { validators: this.sonIguales( 'password', 'password2' ) });


    // Datos de prueba para q el form esta precargardo con info.
    this.forma.setValue({
      nombre: 'Juan Pablo',
      email: 'jcsika@asd.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    })

  }

  registrarUsuario(){

    if ( this.forma.invalid ){
      return;
    }

    if( !this.forma.value.condiciones ){
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );


    this._usuarioService.crearUsuario( usuario )
              .subscribe( resp => this.router.navigate(['/login']));// Cuando se registra vamos a la pagina d login.


    
    console.log(this.forma.value);
  }

}
