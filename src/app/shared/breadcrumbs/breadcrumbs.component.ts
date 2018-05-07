import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';//Importamos Title para poder cambiarle el nombre q dice la pestaña.
//Y el Meta para modificar los meta del head de nuestra pagina principal.

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = '';

  constructor( private router: Router, public title: Title, public meta: Meta) { 

  this.getDataRoute()
        .subscribe( data => {

          console.log( data );

          this.label = data.titulo;
          this.title.setTitle(this.label); // Aqui seteamos el titulo de la pestaña.


          //Aca creamos los metatags q vamos a agregar y con updateTag se los pasamos.
          let metaTag: MetaDefinition = {
            name: 'description',
            content: this.label
          }

          this.meta.updateTag(metaTag);

        } )
  }

  getDataRoute() {

    // utilizando las rutas(router) vamos a suscribirnos al observable 'events' y traernos toda la info q 
    // nos da ese evento, luego la vamos a filtar para poder acceder a la data q le pasamos en pages.router.ts
    // en filter filtramos si evento es del tipo ActivationEnd q es uno de los objetos q nos devuelve el observable event.
    // luego hacemos otro filtro porq el primero nos devuelve dos ActivationEnd, el de la pagina q estamos y el general,
    // el q necesitamos es el de la pagina por lo tanto el firstChild = null entonces lo filtramos d esa manera.
    return this.router.events
                  .filter( evento => evento instanceof ActivationEnd)
                  .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
                  .map((evento:ActivationEnd) => evento.snapshot.data );

  }

  ngOnInit() {
  }

}
