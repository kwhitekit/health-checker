import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { ISubscriptionEntity } from './subscription.entity.interface';

export class SubscriptionApiEntity implements ISubscriptionEntity {
  @ApiProperty({
      type: [String],
      default: [],
  })
  @IsUUID('all', { each: true })
  serviceIds: string[] = [];

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
