import { BaseDbEntity } from '../../../general/base.db-entity';
import { HttpMethodEnum } from '../../../general/http-method.enum';
import { IInspectedServiceEntity } from './inspected-service.entity.interface';

export class InspectedServiceDbEntity extends BaseDbEntity implements IInspectedServiceEntity {
    checkUrl: string;

    method: HttpMethodEnum;

    name: string;
}
