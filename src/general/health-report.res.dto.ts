import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HealthStatusEnum } from './health-status.enum';

export class HealthReportResDto {
  @ApiProperty({
      type: String,
  })
  name: string;

  @ApiProperty({
      type: String,
  })
  checkedUrl: string;

  @ApiProperty({
      enum: HealthStatusEnum,
  })
  status: HealthStatusEnum;

  @ApiPropertyOptional({
      type: Date,
  })
  unavailableFrom?: Date;

  @ApiPropertyOptional({
      type: Date,
  })
  unavailableTo?: Date;
}
