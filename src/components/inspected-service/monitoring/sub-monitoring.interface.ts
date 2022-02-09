import { TSubscriberDto } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export interface ISubMonitoring {
    subscribe: (serviceIds: [string], subscriberId: string, constructorPayload: TSubscriberDto<SubscriberTypeEnum>) => void,
    unsubscribe: (serviceIds: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
