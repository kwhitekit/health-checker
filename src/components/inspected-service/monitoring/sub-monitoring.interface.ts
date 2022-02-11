import { RegisterSubscriberDto } from '../../subscription/dto/register-subscriber.dto';

export interface ISubMonitoring {
    subscribe: (serviceIds: [string], subscriberId: string, constructorPayload: RegisterSubscriberDto) => void,
    unsubscribe: (serviceIds: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
