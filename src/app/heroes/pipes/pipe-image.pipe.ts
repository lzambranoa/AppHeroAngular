import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'pipeImage'
})
export class PipeImagePipe implements PipeTransform {

  transform(heroe: Heroe): string {
    return `assets/heroes/${heroe.id}.jpg`
  }

}
