import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum, IsString, IsUrl, IsUUID, Length,
} from 'class-validator';
import { HttpMethodEnum } from '../../../general/http-method.enum';
import { IInspectedServiceEntity } from './inspected-service.entity.interface';

export class InspectedServiceApiEntity implements IInspectedServiceEntity {
  @ApiProperty({
      type: String,
  })
  @IsUUID('all')
  id: string;

  @ApiProperty({
      type: String,
  })
  @IsUrl({
      require_protocol: true,
  })
  checkUrl: string;

  @ApiProperty({
      enum: HttpMethodEnum,
  })
  @IsEnum(HttpMethodEnum)
  method: HttpMethodEnum;

  @ApiProperty({
      type: String,
  })
  @IsString()
  @Length(1, 50)
  name: string;
}
