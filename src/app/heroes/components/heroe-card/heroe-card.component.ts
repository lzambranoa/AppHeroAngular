import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styles: [
    `
    mat-card {
      margin-top: 20px
    }
  `
  ]
})
export class HeroeCardComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
