import { BaseSubscriber } from './base-subscriber';
import { SubscriberTypeEnum } from './subscriber-type.enum';

export type AllSubscribersMap<
  T extends SubscriberTypeEnum,
  U extends { type: T },
  > = Record<T, {
    dtoValidator: (dto: U) => boolean,
    subscriber: BaseSubscriber<T>
}>
