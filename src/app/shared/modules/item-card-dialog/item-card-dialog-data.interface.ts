export interface ItemCardDialogDataInterface {
  id: string;
  name: string;
  description: string;
  category?: string;
  effect?: string;
  types?: PokemonTypeColor[];
  imageUrl: string;
  cries?: string;
}

export interface PokemonTypeColor {
  type: string;
  color: string;
}
