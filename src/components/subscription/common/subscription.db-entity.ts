import {
    Column, Entity, JoinTable, ManyToMany,
} from 'typeorm';
import { BaseDbEntity } from '../../../general/base.db-entity';
import { TableNameEnum } from '../../../general/table-name.enum';
import { InspectedServiceDbEntity } from '../../inspected-service/common/inspected-service.db-entity';
import { SubscriberTypeEnum } from '../subscriber-declaration/subscriber-type.enum';
import { ISubscriptionEntity } from './subscription.entity.interface';

@Entity(TableNameEnum.SUBSCRIPTIONS)
export class SubscriptionDbEntity extends BaseDbEntity implements ISubscriptionEntity {
    @ManyToMany(() => InspectedServiceDbEntity)
    @JoinTable({
        name: TableNameEnum.SUBSCRIPTIONS_SERVICES,
        joinColumn: {
            name: 'subscription_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'service_id',
            referencedColumnName: 'id',
        },
    })
    services: InspectedServiceDbEntity[] | string[];

    @Column({
        nullable: false,
        enum: SubscriberTypeEnum,
    })
    type: SubscriberTypeEnum;
}
