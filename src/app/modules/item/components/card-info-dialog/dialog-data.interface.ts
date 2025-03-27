export interface DialogDataInterface {
  id?: number;
  name: string;
  description: string;
  types: PokemonTypeColor[];
  imageUrl: string;
  cries: string;
}

export interface PokemonTypeColor {
  type: string;
  color: string;
}
