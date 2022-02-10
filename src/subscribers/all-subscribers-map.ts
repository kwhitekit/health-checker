/* eslint-disable max-classes-per-file */
import { BaseSubscriber } from '../components/subscription/subscriber-declaration/base-subscriber';
import { BaseSubscriberWithServiceIdsDto } from '../components/subscription/subscriber-declaration/base-subscriber-with-service-ids.dto';
import { IOnMessage } from '../components/subscription/subscriber-declaration/onmessage.interface';
import { CONSOLE_SUBSCRIBER_CONTRACT } from './console/console-subscriber.contract';
import { EMAIL_SUBSCRIBER_CONTRACT } from './email/email-subscriber.contract';
import { SmsSubscriber } from './sms-subscriber/sms.subscriber';
import { SubscriberTypeEnum } from './subscriber-type.enum';

export type TSubscriberContract<T extends SubscriberTypeEnum> = {
  type: T,

  resolveSubscriber: (dto: BaseSubscriberWithServiceIdsDto<T>) => Promise<BaseSubscriber<T> & IOnMessage>,
};

export const ALL_SUBSCRIBERS_MAP: Record<SubscriberTypeEnum, TSubscriberContract<SubscriberTypeEnum>> = {
    console: CONSOLE_SUBSCRIBER_CONTRACT,
    email: EMAIL_SUBSCRIBER_CONTRACT,
    sms: {
        type: SubscriberTypeEnum.SMS,
        resolveSubscriber: SmsSubscriber.get,
    },
};
