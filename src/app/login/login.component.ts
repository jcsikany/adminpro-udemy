import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins(); //Esta funcion existe en custom.js
//como yo se q existe se puede declarar de esta manera y la usamos en el ngOnInit  
//Con el declare se puede llamar a cualquier script q se encuentre fuera de angular
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame:boolean = false;

  auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    // cargamos el mail con el valor q esta en el localStorage, si no hay nada que ponga '', usamos el o(||) de javascript para indicarle q si lo q devuelve es undefined use ''.
    this.email = localStorage.getItem('email') || ''; 
    if( this.email.length > 1 ) {
      this.recuerdame = true;
    } 
  }

  // Aca va toda la inicializacion de plugin
  googleInit(){
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id:'850150703806-ljojd8p8ffe5nfo8ehem09i9d6cjne6c.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    })
    
  }

  // recibe un elemento html al q le vamos a adjuntar todo eso.
  // El googleUser es lo q recibimos d la funcion
  // Lo que queremos obtener es el token.
  attachSignin( element ){

    this.auth2.attachClickHandler( element, {}, (googleUser) =>{

      //let profile = googleUser.getBasicProfile();
      
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard'); // La mejor manera hubiera sido usar "this.router.navigate(['/dashboard'])" pero por un problema en la carga d los plugin lo hacemos con la forma nativa d javascript.
      

    });

  }

  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password)

    this._usuarioService.login( usuario, forma.value.recuerdame )
            .subscribe( correcto => this.router.navigate(['/dashboard']) );

    // console.log(forma.valid);
    // console.log(forma.value);
    
    //this.router.navigate(['dashboard']);

  }

}
