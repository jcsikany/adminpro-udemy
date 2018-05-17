import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){}

  canActivate(): Promise<boolean> | boolean {

    console.log( 'Token guard' );

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] )); //a funcion 'atob' decodifica una cadena de datos que ha sido codificada utilizando la codificacion en base-64
                                                            // y le pedimos q decodifique el token, lo cortamos por los puntos y la posicion 1.


    let expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva( payload.exp );


    //console.log( payload );


     
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 *1000 ) );

      //console.log( tokenExp );
      //console.log( ahora );

      if( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      }else {

        this._usuarioService.renuevaToken()
                .subscribe( () => {
                  resolve(true);
                }, ()=>{
                  this.router.navigate(['/login']);
                   reject(false);
                })
      }
      
        

    });

  }



  expirado( fechaExp: number ) {

    let ahora  = new Date().getTime() / 1000; // obtengo la fecha actual y la divido entre 1000 asi tengo segundos porq por defecto viene en miliseg
                                              // de esta manera la 'fechaExp' y 'ahora' quedan en segundos.

    // Si regresa true quiere decir q expiro.
    if ( fechaExp < ahora ){
      return true;
    }else {
      return false;
    }               


  }

}
