import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CardInfoDialogDataInterface, PokemonTypeColor} from './card-info-dialog-data.interface';
import {PokemonTypeEnum} from '../../enum/pokemon-type.enum';

@Component({
  selector: 'app-card-info-dialog',
  templateUrl: './card-info-dialog.component.html',
  styleUrls: ['./card-info-dialog.component.scss'],
})
export class CardInfoDialogComponent {
  readonly PokemonTypeEnum = PokemonTypeEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CardInfoDialogDataInterface,
  ) {
  }

  playAudio(): void {
    const playCry = new Audio(this.data.cries);
    if (playCry) {
      playCry.play().then();
    }
  }


  trackType(index: number, pokemon: PokemonTypeColor): string {
    return pokemon.type;
  }

}
