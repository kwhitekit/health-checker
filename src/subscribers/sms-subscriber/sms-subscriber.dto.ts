import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, Matches } from 'class-validator';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class SmsSubscriberDto extends RegisterSubscriberDto {
  @ApiProperty({
      type: SubscriberTypeEnum.SMS,
  })
  @Matches(new RegExp(SubscriberTypeEnum.SMS))
  type: SubscriberTypeEnum.SMS;

  @ApiProperty({
      type: String,
  })
  @IsPhoneNumber('UA')
  to: string;
}
