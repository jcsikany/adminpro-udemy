import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  //El viewchild recibe de forma obligatoria una referencia del html (txtProgress) en el html se escribe
  //con # adelante.
  //De esta manera ya tenemos una referencia sin importar en q componente estes.
  @ViewChild('txtProgress') txtProgress: ElementRef;

  //@Input porq esas dos variables vienen d afuera.
  // si lo escribimos asi @Input('nombreLeyenda') por ejemplo
  //entonces donde usemos este input ya no escribimos el nombre de la variable, sino 'nombreLeyenda'
  //Con @Output lo mismo, podemos ponerle otro nombre
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

// Esta es la sintaxis para poder emitir un numero como un evento, es el valor de lo q se va a pasar a otro componente.
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
   // console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
  }

  onChange( newValue: number ){

    

    //let elemHTML = document.getElementsByName('progreso')[0];

    if ( newValue >= 100){
      this.progreso = 100;
    }
    else if ( newValue <= 0 ){
      this.progreso = 0;
    }
    else{
       this.progreso = newValue;
    }

    //elemHTML.value = this.progreso;

    // en vez de usar las dos lineas comentadas lo hacemos con esta sola a traves del @viewchild con la variable txtProgreso
    this.txtProgress.nativeElement.value = this.progreso;
   

    this.cambioValor.emit( this.progreso );

    // Esto es para establecer el foco en ese input-
    //this.txtProgress.nativeElement.focus();

  }

  cambiarValor( valor: number ){
    
    if( this.progreso >= 100 && valor > 0 ){
      this.progreso = 100;  
    }

    if( this.progreso <= 0 && valor < 0 ){
      this.progreso = 0;  
    }
    
    this.progreso = this.progreso + valor;

    //aca le asigno el valor al eventEmitter (cambioValor) que va a emitir.
    this.cambioValor.emit( this.progreso );
  }

}
