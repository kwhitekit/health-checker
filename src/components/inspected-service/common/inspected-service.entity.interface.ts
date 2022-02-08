import { HttpMethodEnum } from '../../../general/http-method.enum';

export interface IInspectedServiceEntity {
  id: string,
  checkUrl: string,
  method: HttpMethodEnum,
  name: string,
}
