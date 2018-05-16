import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];    
  
  cargando: boolean = true;

  constructor(public _hospitalService:HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() { 

    this.cargarHospitales();

    this._modalUploadService.notificacion
            .subscribe( () => this.cargarHospitales() );

  }

  buscarHospital( termino:string ){

    if( termino.length <= 0){
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
              .subscribe( (hospitales: any) => {

                this.hospitales = hospitales.hospitales;
                this.cargando = false;                

              });    
  }

  cargarHospitales(){

    this.cargando = true;;

    this._hospitalService.cargarHospitales()
              .subscribe( (hospitales: any)=>{
                
                 this.hospitales = hospitales.hospitales;
                 this.cargando = false;             

              })

  }

  borrarHospital( hospital:Hospital){
     

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      //console.log(borrar);

      if (borrar) {  
        
        this._hospitalService.borrarHospital(hospital._id)
                  .subscribe( borrado => {
                    console.log( borrado );
                    this.cargarHospitales();
                  } )        
        };

      })
       
    };

    guardarHospital( hospital: Hospital){

      this._hospitalService.actualizarHospital( hospital )
                    .subscribe();
      
    }


    crearHospital(){

      swal({

        title: 'Crear hospital',
        text: 'Ingrese el nombre del hospital',
        content: 'input',
        icon: 'info',
        buttons:true,
        dangerMode: true
      }).then( valor => {

        if( !valor || valor.length === 0 ){
          return;
        }

        this._hospitalService.crearHospital( valor )
                        .subscribe( ()=> this.cargarHospitales() )

      })

  }

  actualizarImagen( hospital: Hospital ){    

    this._modalUploadService.mostrarModal( 'hospital', hospital._id)

  }


  

}
