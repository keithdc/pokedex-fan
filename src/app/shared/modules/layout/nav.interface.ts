import {RouteEnum} from '../../enum/route.enum';
import {AbstractDomainEnum} from '../../../api/abstract/abstract-domain.enum';

export interface NavInterface {
  name: string;
  domain: AbstractDomainEnum;
  default?: boolean;
  route?: RouteEnum;
  url?: string;
  subNav?: NavInterface[];
}
