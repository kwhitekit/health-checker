import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { SubscriberTypeEnum } from '../subscriber-declaration/subscriber-type.enum';
import { ISubscriptionEntity } from './subscription.entity.interface';

export class SubscriptionApiEntity implements ISubscriptionEntity {
  @ApiProperty({
      type: String,
  })
  @IsUUID('all')
  service_id: string;

  @ApiProperty({
      enum: SubscriberTypeEnum,
  })
  @IsEnum(SubscriberTypeEnum)
  type: SubscriberTypeEnum;

  @ApiProperty({
      type: String,
  })
  @IsUUID('all')
  id: string;
}
