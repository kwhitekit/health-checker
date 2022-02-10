/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsEnum, IsNotEmpty, IsUUID,
} from 'class-validator';
import { BaseSubscriber } from '../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../components/subscription/subscriber-declaration/onmessage.interface';
import { CONSOLE_SUBSCRIBER_CONTRACT } from './console/console-subscriber.contract';
import { EMAIL_SUBSCRIBER_CONTRACT } from './email/email-subscriber.contract';
import { SubscriberTypeEnum } from './subscriber-type.enum';

export class BaseSubscriberDto<T extends SubscriberTypeEnum> {
  @ApiProperty({
      enum: SubscriberTypeEnum,
  })
  @IsEnum(SubscriberTypeEnum)
  type: T;
}

export class BaseSubscriberWithServiceIdsDto<T extends SubscriberTypeEnum> extends BaseSubscriberDto<T> {
  @ApiProperty({
      type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  serviceIds: [string];
}

export type TSubscriberContract<T extends SubscriberTypeEnum> = {
  type: T,
  dtoValidator: (data: any) => void | never,
  resolveSubscriber: (dto: BaseSubscriberDto<T>) => Promise<BaseSubscriber<T> & IOnMessage>,
};

export const ALL_SUBSCRIBERS_MAP: Record<SubscriberTypeEnum, TSubscriberContract<SubscriberTypeEnum>> = {
    console: CONSOLE_SUBSCRIBER_CONTRACT,
    email: EMAIL_SUBSCRIBER_CONTRACT,
};
