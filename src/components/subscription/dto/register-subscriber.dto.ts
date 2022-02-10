import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { BaseSubscriberDto } from '../subscriber-declaration/base-subscriber.dto';

export class RegisterSubscriberDto implements BaseSubscriberDto<SubscriberTypeEnum> {
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
