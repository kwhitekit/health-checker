import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export interface ISubscriptionEntity {
  id: string;
  type: SubscriberTypeEnum
}
