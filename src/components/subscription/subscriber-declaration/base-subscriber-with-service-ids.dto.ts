import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { BaseSubscriberDto } from './base-subscriber.dto';

export class BaseSubscriberWithServiceIdsDto<T extends SubscriberTypeEnum> extends BaseSubscriberDto<T> {
  @ApiProperty({
      type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  serviceIds: [string];
}
