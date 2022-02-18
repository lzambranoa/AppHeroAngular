import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // Obetengo los parametros de la URL
    this.activatedRouter.params.subscribe(({id}) => console.log(id));
  }

}
