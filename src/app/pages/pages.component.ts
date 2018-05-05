import { Component, OnInit } from '@angular/core';

declare function init_plugins(); //Esta funcion existe en custom.js
//como yo se q existe se puede declarar de esta manera y la usamos en el ngOnInit 
//Con el declare se puede llamar a cualquier script q se encuentre fuera de angular

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
