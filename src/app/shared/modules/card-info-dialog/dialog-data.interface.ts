export interface DialogDataInterface {
  id: string;
  name: string;
  description: string;
  effect?: string;
  types?: PokemonTypeColor[];
  imageUrl: string;
  cries?: string;
}

export interface PokemonTypeColor {
  type: string;
  color: string;
}
