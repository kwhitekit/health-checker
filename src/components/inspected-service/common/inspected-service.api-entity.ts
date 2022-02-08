import { HttpMethodEnum } from '../../../general/http-method.enum';
import { IInspectedServiceEntity } from './inspected-service.entity.interface';

export class InspectedServiceApiEntity implements IInspectedServiceEntity {
    id: string;

    checkUrl: string;

    method: HttpMethodEnum;

    name: string;
}
