import { Column, Entity, Unique } from 'typeorm';
import { BaseDbEntity } from '../../../general/base.db-entity';
import { HttpMethodEnum } from '../../../general/http-method.enum';
import { TableNameEnum } from '../../../general/table-name.enum';
import { IInspectedServiceEntity } from './inspected-service.entity.interface';

@Entity(TableNameEnum.INSPECTED_SERVICES)
@Unique('NO_DUPLICATE_CHECKS', ['checkUrl', 'method'])
export class InspectedServiceDbEntity extends BaseDbEntity implements IInspectedServiceEntity {
  @Column({
      type: 'varchar',
      length: 500,
      nullable: false,
  })
  checkUrl: string;

  @Column({
      type: 'varchar',
      length: 20,
      enum: HttpMethodEnum,
      default: HttpMethodEnum.GET,
  })
  method: HttpMethodEnum;

  @Column({
      type: 'varchar',
      length: 50,
      nullable: false,
  })
  name: string;
}
