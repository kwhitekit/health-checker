import { CONSOLE_SUBSCRIBER_CONTRACT } from '../../../subscribers/console.subscriber';
import { BaseSubscriber } from './base-subscriber';
import { SubscriberTypeEnum } from './subscriber-type.enum';

export type TSubscriberContract<T extends SubscriberTypeEnum> = {
  type: T,
  dtoValidator: (data: any) => boolean,
  subscriberConstructor: (dto: { type: T } & object) => BaseSubscriber<T>,
};

export const ALL_SUBSCRIBERS_MAP: Record<SubscriberTypeEnum, TSubscriberContract<SubscriberTypeEnum>> = {
    console: CONSOLE_SUBSCRIBER_CONTRACT,
};
