import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { BaseSubscriberWithServiceIdsDto } from '../../subscription/subscriber-declaration/base-subscriber-with-service-ids.dto';

export interface ISubMonitoring {
    subscribe: (serviceIds: [string], subscriberId: string, constructorPayload: BaseSubscriberWithServiceIdsDto<SubscriberTypeEnum>) => void,
    unsubscribe: (serviceIds: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
