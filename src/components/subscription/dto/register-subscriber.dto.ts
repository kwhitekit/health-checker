import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { TSubscriberDto } from '../subscriber-declaration/all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-declaration/subscriber-type.enum';

export class RegisterSubscriberDto implements TSubscriberDto<SubscriberTypeEnum> {
    @ApiProperty({
        enum: SubscriberTypeEnum,
    })
    @IsEnum(SubscriberTypeEnum)
    type: SubscriberTypeEnum;

    @ApiProperty({
        type: [String],
    })
    @IsUUID('all', { each: true })
    @IsArray()
    servicesIds: [string];
}
