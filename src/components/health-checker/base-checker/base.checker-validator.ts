import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { HealthCheckerTypeEnum } from '../common/health-checker.type.enum';

export class BaseCheckerValidator {
  @ApiProperty({
      enum: HealthCheckerTypeEnum,
  })
  @IsEnum(HealthCheckerTypeEnum)
  type: HealthCheckerTypeEnum;
}
