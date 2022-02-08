import { SubscriberTypeEnum } from '../subscriber-declaration/subscriber-type.enum';

export interface ISubscriptionEntity {
  id: string;
  type: SubscriberTypeEnum
}
