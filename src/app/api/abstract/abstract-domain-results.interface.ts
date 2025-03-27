import {AbstractDomainInterface} from './abstract-domain.interface';

export interface AbstractDomainResultsInterface extends AbstractDomainInterface {
  count?: number,
  next?: string,
  previous?: string,
  results: DomainResultsInterface[]
}

export interface Item extends AbstractDomainInterface {
  name: string,
  items: DomainResultsInterface[]
}

export interface PokemonEntries extends AbstractDomainInterface {
  pokemon_entries: PokemonSpecies[];
}

export interface PokemonSpecies {
  pokemon_species: DomainResultsInterface;
}

export interface DomainResultsInterface {
  id: number | string;
  name: string,
  url: string,
}
