import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'      
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'      
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ){
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId(id))
    )
    .subscribe(heroe => this.heroe = heroe )
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id){
      // actualizar
      this.heroeService.actualizarHeroe(this.heroe).subscribe(
        heroe => this.mostrarSnackbar('Registro actualizado')
      )
    } else {
      //crear
      this.heroeService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('El superhero fue creado')
      })

    }

  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '550px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
            })
        }
      }
    )
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }

}
