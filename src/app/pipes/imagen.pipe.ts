import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string= 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img){
      return url + '/usuarios/xxx'; // retornamos esto para q nos devuelve la imagen por defecto q pusimos cuando no encuentre un usuario.
    }

    //Si imagen contiene 'https' quiere decir q es una imagen de google
    if (  img.indexOf('https') >= 0 ){
      return img;
    }

    switch( tipo ) {
      case 'usuario':
         url += '/usuarios/' + img;
      break;

      case 'medico':
         url += '/medicos/' + img;
      break;

      case 'hospital':
         url += '/hospitales/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe, usuario, medico, hospitales')
        url += url + '/usuarios/xxx';
    }

    return url;
  }

}
