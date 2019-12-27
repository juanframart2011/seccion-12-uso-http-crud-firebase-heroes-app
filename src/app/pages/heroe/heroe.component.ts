import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroeService } from '../../service/heroe.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel;
  constructor(private heroesService: HeroeService, private router:ActivatedRoute) { }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    if( id !== "nuevo "){

      this.heroesService.getHeroe( id ).subscribe( ( result : HeroeModel ) => {
        this.heroe = result;
        this.heroe.id = id;
      });
    }
  }

  guardar( form: NgForm ){
    if( form.invalid ){
      return;
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando información',
      type:'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id ){

      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }
    else{

      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title:this.heroe.nombre,
        text:'Se actualizo correctamente',
        type:'success'
      });
    });
  }
}