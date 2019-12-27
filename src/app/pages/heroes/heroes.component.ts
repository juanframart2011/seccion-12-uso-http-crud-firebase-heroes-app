import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../service/heroe.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  
  constructor(private heroesService: HeroeService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe( resp =>{
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe( heroe:HeroeModel, i:number ){

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( result => {

      if( result.value ){
        this.heroesService.borrarHeroe( heroe.id ).subscribe( result => {

          this.heroes.slice( i, 1 );
          return this.heroes;
        });
      }
    });

    
  }

}
