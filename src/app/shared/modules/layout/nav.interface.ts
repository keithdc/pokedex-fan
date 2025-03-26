import {RouteEnum} from '../../enum/route.enum';
import {AbstractDomainEnum} from '../../../api/abstract/abstract-domain.enum';

export interface NavInterface {
  name: string;
  domain: AbstractDomainEnum;
  route?: RouteEnum;
  url?: string;
  subNav?: NavInterface[];
}
