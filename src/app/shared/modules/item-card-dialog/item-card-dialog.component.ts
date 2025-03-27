import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemCardDialogDataInterface, PokemonTypeColor} from './item-card-dialog-data.interface';
import {PokemonTypeEnum} from '../../enum/pokemon-type.enum';

@Component({
  selector: 'app-item-card-dialog',
  templateUrl: './item-card-dialog.component.html',
  styleUrls: ['./item-card-dialog.component.scss'],
})
export class ItemCardDialogComponent {
  readonly PokemonTypeEnum = PokemonTypeEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ItemCardDialogDataInterface,
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
