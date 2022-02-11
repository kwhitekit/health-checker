import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class ConsoleSubscriberDto extends RegisterSubscriberDto {
  @ApiProperty({
      type: SubscriberTypeEnum.CONSOLE,
  })
  @Matches(new RegExp(SubscriberTypeEnum.CONSOLE))
  type: SubscriberTypeEnum.CONSOLE;
}
