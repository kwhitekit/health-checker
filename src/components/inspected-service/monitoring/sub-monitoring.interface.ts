import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { BaseSubscriberDto } from '../../subscription/subscriber-declaration/base-subscriber.dto';

export interface ISubMonitoring {
    subscribe: (serviceIds: [string], subscriberId: string, constructorPayload: BaseSubscriberDto<SubscriberTypeEnum>) => void,
    unsubscribe: (serviceIds: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
