import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export class BaseSubscriberDto<T extends SubscriberTypeEnum> {
  @ApiProperty({
      enum: SubscriberTypeEnum,
  })
  @IsEnum(SubscriberTypeEnum)
  type: T;
}
