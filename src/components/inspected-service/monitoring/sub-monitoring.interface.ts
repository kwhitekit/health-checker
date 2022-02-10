import { BaseSubscriberDto } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export interface ISubMonitoring {
    subscribe: (serviceIds: [string], subscriberId: string, constructorPayload: BaseSubscriberDto<SubscriberTypeEnum>) => void,
    unsubscribe: (serviceIds: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
