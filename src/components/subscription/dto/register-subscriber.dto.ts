import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { BaseSubscriberWithServiceIdsDto } from '../subscriber-declaration/base-subscriber-with-service-ids.dto';

export class RegisterSubscriberDto implements BaseSubscriberWithServiceIdsDto<SubscriberTypeEnum> {
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
    serviceIds: [string];
}
