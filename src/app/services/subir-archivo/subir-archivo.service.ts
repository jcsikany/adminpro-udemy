import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SubirArchivoService {

  constructor(private http: HttpClient) { }

  // El File es un tipo de TypeScript como cualquier otro(int, string, etc)
  // Hacer falta el tipo porq necesitamos saber si es un medico, usuario u hospital para generar la ruta.
  // Lo mismo con el id, necesitamos saber que es.
  subirArchivo( archivo: File, tipo: string, id: string ){

    return new Promise( (resolve, reject )=> {
      
      // Esto es basicamente el payload q quiero subir.
      let formData = new FormData();

      let xhr = new XMLHttpRequest();
  
      formData.append( 'imagen', archivo, archivo.name );
      xhr.onreadystatechange = function(){
  
        if( xhr.readyState === 4 ){
  
          if( xhr.status === 200 ){
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response) );
          }else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }
        }  
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });


  }

  fileUpload(archivo: File, tipo: string, id: string) {

    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    const formData: FormData = new FormData();

    formData.append('imagen', archivo, archivo.name);

    return this.http.put(url, formData, { reportProgress: true });
    }

}
