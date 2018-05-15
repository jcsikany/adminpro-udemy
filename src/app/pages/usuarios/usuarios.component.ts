import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any; // esto es para q no salten los errores de swal (sweetalert)

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde:number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    //Aca nos vamos a suscribir a cualquier emision que haga 'notificacion'
    this._modalUploadService.notificacion
          .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
              .subscribe((resp:any) => {
                //console.log(resp);
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;

              })

  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
    console.log(desde);

    if( desde >= this.totalRegistros){
      return;
    }

    if ( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino:string ){

    if( termino.length <= 0){
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
              .subscribe( (usuarios: Usuario[]) => {

                this.usuarios = usuarios;
                this.cargando = false;

              });
    
  }

  borrarUsuario( usuario:Usuario ){

    //this._usuarioService.usuario._id este es el id del usuario q esta logueado actualmente.
    //No me puedo borrar a mi mismo.
    if ( usuario._id === this._usuarioService.usuario._id ){
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log(borrar);

      if (borrar) {  
        
        this._usuarioService.borrarUsuario( usuario._id)
                  .subscribe( borrado => {
                    console.log( borrado );
                    this.cargarUsuarios();// para q vuelva a cargar los usuarios sin el eliminado
                  } )        
        };

      })
       
    };

    
    guardarUsuario( usuario:Usuario ){

      this._usuarioService.actualizarUsuario( usuario )
                .subscribe();


    }
    
  

}
