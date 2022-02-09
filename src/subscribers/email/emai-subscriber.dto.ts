import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Length,
} from 'class-validator';
import { TSubscriberDto } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class EmailSubscriberDto implements TSubscriberDto<SubscriberTypeEnum.EMAIL> {
    @ApiProperty({
        enumName: SubscriberTypeEnum.EMAIL,
    })
    @IsIn([SubscriberTypeEnum.EMAIL])
    type: SubscriberTypeEnum.EMAIL;

    @ApiProperty({
        type: String,
    })
    @IsString()
    from: string;

    @ApiProperty({
        type: [String],
    })
    @IsArray()
    @IsNotEmpty()
    @IsEmail({}, { each: true })
    to: [string];

    @ApiProperty({
        type: String,
    })
    @IsEmail()
    user: string;

    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsString()
    @Length(8, 32)
    pass?: string;
}
