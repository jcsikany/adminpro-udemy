import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


import { SettingsService, 
         SidebarService, 
         SharedService,
         UsuarioService,
         HospitalService,
         MedicoService,
         SubirArchivoService,
         LoginGuardGuard,
         AdminGuard,
         VerificaTokenGuard,
         } from "./service.index";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService, 
    SidebarService, 
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    VerificaTokenGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
