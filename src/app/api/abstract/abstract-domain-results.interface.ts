import {AbstractDomainEnum} from './abstract-domain.enum';

export interface AbstractDomainResultsInterface {
  domain: AbstractDomainEnum;
  count?: number,
  next?: string,
  previous?: string,
  results: DomainResultsInterface[]
}

export interface DomainResultsInterface {
  id?: number | string;
  name: string,
  url: string,
}
