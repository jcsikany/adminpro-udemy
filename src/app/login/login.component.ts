import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins(); //Esta funcion existe en custom.js
//como yo se q existe se puede declarar de esta manera y la usamos en el ngOnInit  
//Con el declare se puede llamar a cualquier script q se encuentre fuera de angular


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {
    
    this.router.navigate(['dashboard']);

  }

}
