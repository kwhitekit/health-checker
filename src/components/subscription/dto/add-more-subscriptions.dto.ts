import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class AddMoreSubscriptionsDto {
  @ApiProperty({
      type: String,
  })
  @IsUUID('all')
  subscriberId: string;

  @ApiProperty({
      type: [String],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  servicesIds: [string];
}
