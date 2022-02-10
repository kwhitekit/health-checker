import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsEnum, IsNotEmpty, IsUUID,
} from 'class-validator';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export class BaseSubscriberWithServiceIdsDto<T extends SubscriberTypeEnum> {
  @ApiProperty({
      enum: SubscriberTypeEnum,
  })
  @IsEnum(SubscriberTypeEnum)
  type: T;

  @ApiProperty({
      type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  serviceIds: [string];
}
