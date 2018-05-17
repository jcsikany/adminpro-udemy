import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit , OnDestroy {

  //Hacemos esta variable de tipo Subscription(rxjs), esto nos permite manejar subscripciones a los observables.
  subscription: Subscription;

  constructor() { 

    

    // el obs (observable) emite 3 callbacks, el primero es cuando se llama un next, cuando se recibe algo del observador
    // el siguiente callback es un error.
    // y por ultimo es un callback q no recibe parametros y es cuando termina.
    //retry() es un operador q lo ponemos para q cuando ejecutemos el suscribe y falla no dispare el error inmediantamente, sino q 
    //intente hacerlo otra vez, el parametro q se le pasa es para indicar la cantidad de veces q lo va a intentar,
    //si sigue fallando dsp d 2 intentos(en este caso) lanza el error.
      /*this.regresaObservable().retry(2).subscribe( numero => console.log( 'Subs', numero ),
                                                 error => console.error('Error en el obs', error ),
                                                 () => console.log( 'El observador termino!' )          
  );*/


  this.subscription = this.regresaObservable().subscribe( numero => console.log( 'Subs', numero ),
                                                 error => console.error('Error en el obs', error ),
                                                 () => console.log( 'El observador termino!' )          
  );

  }

  ngOnInit() {
  }

  //Para q la subscripcion no siga corriendo cuando nos movemos a otras paginas, tenemos q hacer
  //unsuscribe en el metodo onDestroy del component q lo estamos llamando.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();     
  }



  regresaObservable(): Observable<any>{

    return new Observable( observer => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador +=1;  
        
        let salida = {
          valor: contador
        };


        observer.next( salida ); //Cada vez q queremos notificar al codigo al q nos vamos a subscribir llamamos al next. // notificamos q llego un 1, un dos en este caso.
        
        /*if(contador === 3){
          clearInterval( intervalo );
          observer.complete(); //usamos complete para notificar al codigo al cual esta suscripto q no quiero mas datos q deje de observar
        }*/

        //hacemos esto para q nos de error cuando el contador llegue a dos
        /*if ( contador === 2 ){          
          observer.error('Auxilio');
        }*/

      },500 )

      // como 'resp' o sea lo q trae el observable son objeto y lo que queremos es un valor de un atributo d ese objeto, hacemos 
      // 'map' para modificar la respuesta
      // Luego hacemos un filter para filtrar esos valor q capturamos con el map. En este caso si queremos q nos devuelva numeros pares. 
    }).map( (resp: any) => {

      return resp.valor;
      
    }).filter( (valor, index) => {
      
      if ( (valor % 2) === 1 ){
        //impar
        return true;
      }else{
        //par
        return false;
      }

    })

  }



}
