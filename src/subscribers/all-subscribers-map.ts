import { CONSOLE_SUBSCRIBER_CONTRACT } from './console/console-subscriber.contract';
import { BaseSubscriber } from '../components/subscription/subscriber-declaration/base-subscriber';
import { SubscriberTypeEnum } from './subscriber-type.enum';
import { EMAIL_SUBSCRIBER_CONTRACT } from './email/email-subscriber.contract';

export type TSubscriberDto<T extends SubscriberTypeEnum> = { type: T } & object;

export type TSubscriberContract<T extends SubscriberTypeEnum> = {
  type: T,
  dtoValidator: (data: any) => boolean,
  subscriberConstructor: (dto: TSubscriberDto<T>) => BaseSubscriber<T>,
};

export const ALL_SUBSCRIBERS_MAP: Record<SubscriberTypeEnum, TSubscriberContract<SubscriberTypeEnum>> = {
    console: CONSOLE_SUBSCRIBER_CONTRACT,
    email: EMAIL_SUBSCRIBER_CONTRACT,
};
